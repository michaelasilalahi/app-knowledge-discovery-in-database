import { AppRegistry } from 'react-native';
import { ALLOWED_FINANCE_APPS } from '@/features/notification-listener/utils/allowedFinanceApps.helpers';
import { notificationDataExtract } from '@/features/notification-listener/utils/notificationDataExtract.helpers';
import { NotificationPayload } from '@/features/notification-listener/types/notificationPayload.interface';

// fungsi yang akan dipanggil oleh Android setiap kali ada notifikasi masuk
const notificationListenerTask = async (notification: NotificationPayload) => {
  // cek apakah notifikasi berasal dari aplikasi keuangan yg telah diizinkan
  if (!ALLOWED_FINANCE_APPS.includes(notification.app)) {
    return;
  }

  const dataExpenditure = notificationDataExtract(
    notification.app,
    notification.title,
    notification.text,
  );

  // vpakah benar ada uang yang keluar ?
  if (!dataExpenditure.amount) {
    console.log(
      'Diabaikan: Notifikasi keuangan masuk, tapi tidak ada nominal pengeluaran.',
    );
    return;
  }

  // DEBUG
  console.log('PENGELUARAN BERHASIL DITANGKAP!');
  console.log('-----------------------------------');
  console.log('Awal (Raw)  :', notification.text);
  console.log('Aplikasi    :', notification.app);
  console.log('Nama/Tujuan :', dataExpenditure.expenseName);
  console.log('Nominal     : Rp', dataExpenditure.amount);
  console.log('Tanggal     :', dataExpenditure.date);
  console.log('-----------------------------------');
};

export const registerNotificationTask = () => {
  AppRegistry.registerHeadlessTask(
    'RNAndroidNotificationListenerHeadlessJs',
    () => notificationListenerTask,
  );
};
