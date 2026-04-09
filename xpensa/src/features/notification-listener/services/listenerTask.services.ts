import { AppRegistry } from 'react-native';
import { NotificationPayload } from '@/features/notification-listener/types/notificationPayload.interface';

// fungsi yang akan dipanggil oleh Android setiap kali ada notifikasi masuk
const notificationListenerTask = async (notification: NotificationPayload) => {
  console.log('🔔 [Headless JS] Notifikasi Masuk!');
  console.log('Dari Aplikasi:', notification.app);
  console.log('Judul:', notification.title);
  console.log('Isi Pesan:', notification.text);
};

export const registerNotificationTask = () => {
  AppRegistry.registerHeadlessTask(
    'RNAndroidNotificationListenerHeadlessJs',
    () => notificationListenerTask,
  );
};
