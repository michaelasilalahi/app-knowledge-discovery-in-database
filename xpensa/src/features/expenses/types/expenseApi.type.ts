import { Expense } from './expenseApi.interface';

export type ExpenseCreate = Omit<Expense, 'id'>;
