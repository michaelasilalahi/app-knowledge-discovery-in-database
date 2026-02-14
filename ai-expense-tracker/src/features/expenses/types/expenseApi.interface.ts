export interface Expense {
  id: number;
  user_id: string;
  date: string;
  type_of_expenditure: string;
  label: string;
  category: string;
  amount: number;
}
