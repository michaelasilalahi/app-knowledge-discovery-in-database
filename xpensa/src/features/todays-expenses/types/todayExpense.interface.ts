// today expense
export interface Expense {
  id: number;
  user_id: string;
  date: string;
  type_of_expenditure: string;
  label: string;
  category: string;
  amount: number;
}

// data persistence
export interface TodaysExpensesState {
  expenses: Expense[];
  setExpenses: (expenses: Expense[]) => void;
  syncTodayExpense: (userId: string) => Promise<void>;
  clearStorage: () => void;
  hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
}
