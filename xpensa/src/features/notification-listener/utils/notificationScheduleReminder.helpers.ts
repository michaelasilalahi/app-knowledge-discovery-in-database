import * as Notifications from 'expo-notifications';

const REMINDER_TIMES = [
  { hour: 6, minute: 0 },
  { hour: 13, minute: 0 },
  { hour: 18, minute: 30 },
  { hour: 22, minute: 0 },
];

export const setupDailyReminders = async () => {
  await Notifications.cancelAllScheduledNotificationsAsync();

  for (const time of REMINDER_TIMES) {
    const trigger: Notifications.DailyTriggerInput = {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour: time.hour,
      minute: time.minute,
    };

    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Jangan lupa catat pengeluaranmu!',
        body: `Apakah anda sudah catat pengeluaranmu jam ${time.hour}:${time.minute === 0 ? '00' : time.minute} ini ?`,
        sound: true,
      },
      trigger: trigger,
    });
  }
  console.log('jadwal pengingat harian berhasil dipasang!');
};

export const cancelAllReminders = async () => {
  await Notifications.cancelAllScheduledNotificationsAsync();
  console.log('semua jadwal pengingat telah dibatalkan.');
};
