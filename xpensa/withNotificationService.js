const { withAndroidManifest } = require('@expo/config-plugins');

const withNotificationService = (config) => {
  return withAndroidManifest(config, async (manifestConfig) => {
    const androidManifest = manifestConfig.modResults;
    const mainApplication = androidManifest.manifest.application?.[0];

    if (!mainApplication) return manifestConfig;

    if (!androidManifest.manifest.$) androidManifest.manifest.$ = {};
    androidManifest.manifest.$['xmlns:tools'] = 'http://schemas.android.com/tools';

    mainApplication.$['android:allowBackup'] = 'false';

    if (mainApplication.$['tools:replace']) {
      if (!mainApplication.$['tools:replace'].includes('android:allowBackup')) {
        mainApplication.$['tools:replace'] += ',android:allowBackup';
      }
    } else {
      mainApplication.$['tools:replace'] = 'android:allowBackup';
    }

    const serviceName = 'rn.bridge.rnandroidnotificationlistener.RNAndroidNotificationListener';
    const hasService = mainApplication.service?.some(s => s.$['android:name'] === serviceName);

    if (!hasService) {
      if (!mainApplication.service) mainApplication.service = [];
      mainApplication.service.push({
        $: {
          'android:name': serviceName,
          'android:label': 'RNAndroidNotificationListener',
          'android:permission': 'android.permission.BIND_NOTIFICATION_LISTENER_SERVICE',
          'android:exported': 'true',
        },
        'intent-filter': [{
          action: [{ $: { 'android:name': 'android.service.notification.NotificationListenerService' } }]
        }],
      });
    }

    return manifestConfig;
  });
};

module.exports = withNotificationService;