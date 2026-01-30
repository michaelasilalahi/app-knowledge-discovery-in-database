import { ProgressStatus } from '../types/progressBarTypes';

export const getProgressBarColor = (
  isReady: boolean,
  status?: ProgressStatus,
) => {
  if (status === 'ready_to_mine') return '#16DB00';
  return isReady ? '#16DB00' : '#000000';
};
