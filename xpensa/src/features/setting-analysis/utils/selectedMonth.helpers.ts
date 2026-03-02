import { Month } from '../types/month.enum';

export const monthList = Object.values(Month);

export const selectedMonth = (): Month => {
  const systemIndex = new Date().getMonth();
  return monthList[systemIndex] as Month;
};
