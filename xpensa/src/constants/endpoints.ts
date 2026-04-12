export const API_ENDPOINTS = {
  VISUALIZATION_OF_ALL_TIME: {
    LINE_CHART: (userId: string) =>
      `/visualization_off_all_time/line-chart-history/${userId}`,
  },

  TODAY_EXPENSE: {
    GET: (userId: string) => `/todays_expenditure/${userId}`,
  },

  ANALYSIS_SETTING: {
    SAVE: '/analysis_setting/',
    GET_ACTIVE: (userId: string) => `/analysis_setting/${userId}/active`,
  },

  CUSTOM_CYCLE_EXPENDITURE: {
    GET: (userId: string) => `/custom_cycle_expenditure/${userId}`,
  },

  CALENDER_CYCLE_EXPENDITURE: {
    GET: (userId: string) => `/calender_cycle_expenditure/${userId}`,
  },

  EXPENSE: {
    GET_CALENDER_CYCLE: (userId: string) =>
      `/calender_cycle_expenditure/${userId}`,
    CREATE: '/expenditure/',
    GET_CUSTOM_CYCLE: (userId: string) => `/custom_cycle_expenditure/${userId}`,
    DELETE: (expenseId: number) => `/expenditure/${expenseId}`,
  },

  ARCHIVE_CALENDER: {
    BAR_CHART: (userId: string) =>
      `/visualization/bar-chart/calender-cycle/${userId}`,
    PIE_CHART: (userId: string) =>
      `/visualization/pie-chart/calender-cycle/${userId}`,
    PROGRESS_BAR: (userId: string) =>
      `/progress_bar/analysis_calender/${userId}`,
    DATA_MINING: {
      EXECUTE: (userId: string) =>
        `/data_mining/analysis_calender/execute/${userId}`,
      RESULT: (userId: string) => `/data_mining/analysis_calender/${userId}`,
    },
  },

  ARCHIVE_CUSTOM: {
    BAR_CHART: (userId: string) => `/custom_visualization/bar_chart/${userId}`,
    PIE_CHART: (userId: string) => `/custom_visualization/pie_chart/${userId}`,
    PROGRESS_BAR: (userId: string) => `/progress_bar/analysis_custom/${userId}`,
    DATA_MINING: {
      EXECUTE: (userId: string) =>
        `/data_mining/analysis_custom/execute/${userId}`,
      RESULT: (userId: string) => `/data_mining/analysis_custom/${userId}`,
    },
  },
};
