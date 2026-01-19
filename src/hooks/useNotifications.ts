import Constants from "expo-constants";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { useEffect, useRef, useState } from "react";
import { Platform } from "react-native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

async function registerForPushNotificationsAsync(): Promise<
  Notifications.ExpoPushToken | undefined
> {
  if (!Device.isDevice) {
    return;
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();

    if (status !== "granted") {
      return;
    }
  }

  const token = await Notifications.getExpoPushTokenAsync({
    projectId: Constants?.expoConfig?.extra?.eas.projectId,
  });

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}

interface ReminderTime {
  hour: number;
  minute: number;
}

function getRandomReminderTime(): ReminderTime {
  const minMinutes = 19 * 60; // 19:00
  const maxMinutes = 21 * 60; // 21:00
  const randomMinutes =
    Math.floor(Math.random() * (maxMinutes - minMinutes)) + minMinutes;
  return {
    hour: Math.floor(randomMinutes / 60),
    minute: randomMinutes % 60,
  };
}

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

export async function onDicteeCompleted(currentStreak: number): Promise<void> {
  await scheduleStreakReminder(currentStreak + 1);
}

const useNotifications = () => {
  const [notification, setNotification] =
    useState<Notifications.Notification | null>(null);
  const notificationListener = useRef<Notifications.Subscription | null>(null);
  const responseListener = useRef<Notifications.Subscription | null>(null);

  useEffect(() => {
    registerForPushNotificationsAsync();

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notif) => {
        setNotification(notif);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener(() => {
        // Handle notification response
      });

    return () => {
      notificationListener.current?.remove();
      responseListener.current?.remove();
    };
  }, []);

  return { notification };
};

export default useNotifications;
