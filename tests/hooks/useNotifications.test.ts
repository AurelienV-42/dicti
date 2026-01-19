import * as Notifications from "expo-notifications";
import {
  scheduleStreakReminder,
  scheduleStreakLostNotification,
  onDicteeCompleted,
} from "../../src/hooks/useNotifications";

jest.mock("expo-notifications", () => ({
  setNotificationHandler: jest.fn(),
  cancelAllScheduledNotificationsAsync: jest.fn(),
  scheduleNotificationAsync: jest.fn(),
  SchedulableTriggerInputTypes: {
    DAILY: "daily",
    DATE: "date",
  },
}));

describe("streak notifications", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("scheduleStreakReminder", () => {
    it("cancels all scheduled notifications before scheduling", async () => {
      await scheduleStreakReminder(5);
      expect(
        Notifications.cancelAllScheduledNotificationsAsync,
      ).toHaveBeenCalledTimes(1);
    });

    it("schedules notification with correct content", async () => {
      await scheduleStreakReminder(5);
      expect(Notifications.scheduleNotificationAsync).toHaveBeenCalledWith(
        expect.objectContaining({
          content: expect.objectContaining({
            title: "N'oublie pas ta dictée !",
            body: "Tu as une série de 5 jours. Continue !",
            data: { type: "streak_reminder" },
          }),
        }),
      );
    });

    it("schedules notification between 19:00 and 21:00", async () => {
      await scheduleStreakReminder(3);
      const call = (Notifications.scheduleNotificationAsync as jest.Mock).mock
        .calls[0][0];
      const { hour, minute, type } = call.trigger;

      expect(type).toBe("daily");
      expect(hour).toBeGreaterThanOrEqual(19);
      expect(hour).toBeLessThanOrEqual(21);
      expect(minute).toBeGreaterThanOrEqual(0);
      expect(minute).toBeLessThan(60);
    });
  });

  describe("scheduleStreakLostNotification", () => {
    it("schedules notification for 9:00 next day", async () => {
      await scheduleStreakLostNotification();

      expect(Notifications.scheduleNotificationAsync).toHaveBeenCalledWith(
        expect.objectContaining({
          content: expect.objectContaining({
            title: "Ta série est terminée",
            body: "Recommence une nouvelle série aujourd'hui !",
            data: { type: "streak_lost" },
          }),
        }),
      );

      const call = (Notifications.scheduleNotificationAsync as jest.Mock).mock
        .calls[0][0];
      const { type, date } = call.trigger;
      expect(type).toBe("date");
      expect(date.getHours()).toBe(9);
      expect(date.getMinutes()).toBe(0);
    });
  });

  describe("onDicteeCompleted", () => {
    it("cancels all scheduled notifications", async () => {
      await onDicteeCompleted(5);
      expect(
        Notifications.cancelAllScheduledNotificationsAsync,
      ).toHaveBeenCalledTimes(1);
    });

    it("schedules reminder with incremented streak", async () => {
      await onDicteeCompleted(5);
      expect(Notifications.scheduleNotificationAsync).toHaveBeenCalledWith(
        expect.objectContaining({
          content: expect.objectContaining({
            body: "Tu as une série de 6 jours. Continue !",
          }),
        }),
      );
    });
  });
});
