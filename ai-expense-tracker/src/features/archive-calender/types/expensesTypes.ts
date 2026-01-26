// tipe untuk props components
export type ExpensesProps = {
  periodTitle: string; // Menerima judul bulan
};

// tipe untuk item pengeluaran (sesuai dengan API/Store)
export interface ExpenseItem {
  id: number;
  user_id: string;
  type_of_expenditure: string;
  label: string;
  category: string;
  amount: number;
  date: string;
}
