# Notifications System

## Overview

Push notifications implemented using `expo-notifications` with Expo Push Token system.

**Location:** `src/hooks/useNotifications.ts`

## Current Architecture

### Flow

```
App Start → useNotifications hook
         ↓
    Check if physical device
         ↓
    Request permissions (if needed)
         ↓
    Get Expo Push Token
         ↓
    Setup Android channel (if Android)
         ↓
    Register listeners
```

### Components

#### Notification Handler (Global)

```typescript
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true, // ✅ Sound enabled
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});
```

#### Permission Flow

1. Check existing permission status
2. Request if not granted
3. Silently fail if denied (no error thrown)

#### Android Channel

```typescript
{
  name: "default",
  importance: AndroidImportance.MAX,
  vibrationPattern: [0, 250, 250, 250],
  lightColor: "#FF231F7C"
}
```

#### Listeners

| Listener                       | Purpose                  | Status        |
| ------------------------------ | ------------------------ | ------------- |
| `notificationReceived`         | Foreground notifications | Updates state |
| `notificationResponseReceived` | User taps notification   | Empty handler |

### Hook Return Value

```typescript
{
  notification: Notifications.Notification | null;
}
```

## Configuration

### EAS Project ID

Token generation requires project ID from `app.config.js`:

```javascript
extra: {
  eas: {
    projectId: "4d267a78-bac2-4dce-b589-5ab2f3046d09";
  }
}
```

### Required Setup (already done)

- `expo-notifications` package installed
- `expo-device` for device detection
- `expo-constants` for config access

## Status

| Feature                    | Status     |
| -------------------------- | ---------- |
| Sound enabled              | ✅ Done    |
| Local streak notifications | ✅ Done    |
| Token stored in Supabase   | ⏳ Pending |
| Backend push notifications | ⏳ Pending |
| Deep linking on tap        | ⏳ Pending |
| Badge count                | ⏳ Pending |
| Streak store integration   | ⏳ Pending |

**Note:** Simulator not supported - only works on physical devices.

## Testing

### Local Testing (Expo Push Tool)

1. Get token from console log (add `console.log(token)` temporarily)
2. Use [Expo Push Notification Tool](https://expo.dev/notifications)
3. Paste token and send test notification

### Limitations

- Cannot test on iOS Simulator
- Cannot test on Android Emulator (unless configured)

---

## Proposed Upgrades

### Priority Matrix

| Priority | Upgrade                            | Effort | Status     |
| -------- | ---------------------------------- | ------ | ---------- |
| High     | Store push token in Supabase       | Low    | ⏳ Pending |
| High     | Implement response handler         | Medium | ⏳ Pending |
| Medium   | Supabase Edge Function for sending | Medium | ⏳ Pending |
| Medium   | Notification preferences           | Low    | ⏳ Pending |
| Low      | Local notification scheduling      | Low    | ✅ Done    |
| Low      | Notification history               | Medium | ⏳ Pending |

### Implementation Details

#### 1. Store Push Token (High Priority)

**Status:** ⏳ Pending - to be created via Supabase MCP

**Database migration:**

```sql
create table push_tokens (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  token text not null,
  platform text not null, -- 'ios' or 'android'
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(user_id, token)
);

alter table push_tokens enable row level security;
create policy "Users can manage own tokens"
  on push_tokens for all using (auth.uid() = user_id);
```

**Hook changes:**

```typescript
const token = await Notifications.getExpoPushTokenAsync({...});
if (token && userId) {
  await supabase.from('push_tokens').upsert({
    user_id: userId,
    token: token.data,
    platform: Platform.OS,
    updated_at: new Date().toISOString()
  });
}
```

#### 2. Response Handler with Deep Linking

```typescript
responseListener.current =
  Notifications.addNotificationResponseReceivedListener((response) => {
    const data = response.notification.request.content.data;

    if (data.screen) {
      // Navigate using expo-router
      router.push(data.screen);
    }
  });
```

#### 3. Supabase Edge Function

```typescript
// supabase/functions/send-notification/index.ts
import { Expo } from "expo-server-sdk";

Deno.serve(async (req) => {
  const { user_id, title, body, data } = await req.json();

  // Fetch user's push tokens
  const { data: tokens } = await supabase
    .from("push_tokens")
    .select("token")
    .eq("user_id", user_id);

  const expo = new Expo();
  const messages = tokens.map((t) => ({
    to: t.token,
    title,
    body,
    data,
  }));

  await expo.sendPushNotificationsAsync(messages);
});
```

#### 4. Notification Preferences

Add to user profile/settings:

```typescript
interface NotificationPreferences {
  daily_reminder: boolean;
  new_dictation: boolean;
  achievement: boolean;
  marketing: boolean;
}
```

### Recommended Implementation Order

1. **Phase 1:** Token storage + basic response handler
2. **Phase 2:** Edge Function + one notification type (e.g., achievements)
3. **Phase 3:** Preferences + additional notification types
4. **Phase 4:** Local scheduling for reminders

---

## Local Notifications (Streak Reminders) ✅

Local notifications for streak system - no server required.

**Status:** ✅ Functions implemented | ⏳ Integration pending (needs streak store)

### Configuration Changes ✅

Sound enabled in notification handler:

```typescript
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true, // Enable sound
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});
```

### Scheduled Notifications

| Notification        | Time        | Condition                  |
| ------------------- | ----------- | -------------------------- |
| Streak reminder     | 19:00-21:00 | Daily, if dictée not done  |
| Streak lost warning | 09:00       | Next day, if streak broken |

### Implemented Functions ✅

**Location:** `src/hooks/useNotifications.ts`

#### `scheduleStreakReminder(currentStreak: number)`

Schedule daily reminder at random time between 19h-21h.

```typescript
export async function scheduleStreakReminder(
  currentStreak: number,
): Promise<void> {
  await Notifications.cancelAllScheduledNotificationsAsync();

  const { hour, minute } = getRandomReminderTime();

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "N'oublie pas ta dictée !",
      body: `Tu as une série de ${currentStreak} jours. Continue !`,
      data: { type: "streak_reminder" },
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour,
      minute,
    },
  });
}
```

#### `scheduleStreakLostNotification()`

Schedule notification for 9h next day when streak is lost.

```typescript
export async function scheduleStreakLostNotification(): Promise<void> {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(9, 0, 0, 0);

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Ta série est terminée",
      body: "Recommence une nouvelle série aujourd'hui !",
      data: { type: "streak_lost" },
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DATE,
      date: tomorrow,
    },
  });
}
```

#### `onDicteeCompleted(currentStreak: number)`

Reschedule reminder for tomorrow with incremented streak.

```typescript
export async function onDicteeCompleted(currentStreak: number): Promise<void> {
  await scheduleStreakReminder(currentStreak + 1);
}
```

### Trigger Logic ⏳

**Status:** Not yet integrated - needs streak store implementation

```
App open:
  1. Check if streak lost → show streak lost screen
  2. Reschedule 19h-21h reminder notification

Dictée completed:
  1. Cancel today's scheduled notification
  2. Reschedule reminder for tomorrow (19h-21h)

Midnight check (via app open next day):
  1. If lastCompletedDate != yesterday → streak = 0
  2. Schedule "streak lost" notification for 9h (if not already shown)
```

### Integration Points ⏳

| Event              | Action                                  | Status     |
| ------------------ | --------------------------------------- | ---------- |
| App startup        | `scheduleStreakReminder(currentStreak)` | ⏳ Pending |
| Dictée completed   | `onDicteeCompleted(currentStreak)`      | ⏳ Pending |
| Streak lost detect | `scheduleStreakLostNotification()`      | ⏳ Pending |

### Notes

- ✅ All local, no backend required
- ✅ Uses expo-notifications scheduling API
- ✅ Timezone handled automatically by device
- ✅ Notifications cleared on app uninstall
- ⏳ Needs streak store to track `currentStreak` and `lastCompletedDate`
