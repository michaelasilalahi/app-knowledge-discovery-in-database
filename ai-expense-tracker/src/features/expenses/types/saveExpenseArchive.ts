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
  // state Data
  name: string;
  amount: number | null;
  date: Date;
  category: string;
  label: string;
  isLoading: boolean;

  // list pengeluaran
  expenses: ExpenseItem[];

  // actions (setter untuk mengubah data)
  setName: (name: string) => void;
  setAmount: (amount: number | null) => void;
  setDate: (date: Date) => void;
  setCategory: (category: string) => void;
  setLabel: (label: string) => void;

  // action utama (simpan ke server)
  submitExpense: () => Promise<void>;
  resetForm: () => void;

  // fetch data
  fetchExpenses: () => Promise<void>;
}
