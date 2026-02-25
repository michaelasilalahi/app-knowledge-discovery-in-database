export const API_ENDPOINTS = {
  VISUALIZATION_OF_ALL_TIME: {
    LINE_CHART: (userId: string) =>
      `/insight/visualization/line-chart-history/${userId}`,
  },

  TODAY_EXPENSE: {
    GET: (userId: string) => `/expenses/today/${userId}`,
  },

  EXPENSE: {
    GET: (userId: string) => `/expenses/${userId}`,
    CREATE: '/expenses/',
  },

  ARCHIVE_CALENDER: {
    BAR_CHART: (userId: string) => `/insight/visualisasi/bar-chart/${userId}`,
    PIE_CHART: (userId: string) => `/insight/visualisasi/pie-chart/${userId}`,
    PROGRESS_BAR: (userId: string) => `/insight/progress/${userId}`,
    DATA_MINING: {
      EXECUTE: (userId: string) => `/insight/mining/execute/${userId}`,
      RESULT: (userId: string) => `/insight/result/${userId}`,
    },
  },
};
