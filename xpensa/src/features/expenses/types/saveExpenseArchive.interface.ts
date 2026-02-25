// tipe data untuk expense item
export interface ExpenseItem {
  id: number;
  user_id: string;
  type_of_expenditure: string;
  amount: number;
  date: string;
  category: string;
  label: string;
}

export interface ExpenseState {
  name: string;
  amount: number | null;
  date: Date | null;
  category: string;
  label: string;
  isLoading: boolean;
  expenses: ExpenseItem[];
  setName: (name: string) => void;
  setAmount: (amount: number | null) => void;
  setDate: (date: Date | null) => void;
  setCategory: (category: string) => void;
  setLabel: (label: string) => void;
  submitExpense: () => Promise<void>;
  resetForm: () => void;
  fetchExpenses: () => Promise<void>;
}
