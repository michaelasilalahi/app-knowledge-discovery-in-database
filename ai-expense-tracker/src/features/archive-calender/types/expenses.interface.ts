export type ExpensesProps = {
  periodTitle: string;
};

export interface ExpenseItem {
  id: number;
  user_id: string;
  type_of_expenditure: string;
  label: string;
  category: string;
  amount: number;
  date: string;
}

export interface ExpenseListPersistState {
  expenses: ExpenseItem[];
  isLoading: boolean;
  hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
  fetchExpenses: (userId: string) => Promise<void>;
}
