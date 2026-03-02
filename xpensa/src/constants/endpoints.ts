export const API_ENDPOINTS = {
  VISUALIZATION_OF_ALL_TIME: {
    LINE_CHART: (userId: string) =>
      `/visualization_off_all_time/line-chart-history/${userId}`,
  },

  TODAY_EXPENSE: {
    GET: (userId: string) => `/calender_cycle_expenditure/today/${userId}`,
  },

  EXPENSE: {
    GET: (userId: string) => `/calender_cycle_expenditure/${userId}`,
    CREATE: '/calender_cycle_expenditure/',
    GET_CUSTOM_CYCLE: (userId: string) => `/custom_cycle_expenditure/${userId}`,
  },

  ARCHIVE_CALENDER: {
    BAR_CHART: (userId: string) => `/visualization/bar-chart/${userId}`,
    PIE_CHART: (userId: string) => `/visualization/pie-chart/${userId}`,
    PROGRESS_BAR: (userId: string) => `/progress_bar/progress/${userId}`,
    DATA_MINING: {
      EXECUTE: (userId: string) =>
        `/data_mining/analysis_calender/execute/${userId}`,
      RESULT: (userId: string) => `/data_mining_analysis_calender/${userId}`,
    },
  },
};
