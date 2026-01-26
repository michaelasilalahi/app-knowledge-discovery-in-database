// Tipe data untuk pengeluaran yang sudah tersimpan di Database (ada ID)
export interface Expense {
  id: number;
  user_id: string;
  date: string;
  type_of_expenditure: string;
  label: string;
  category: string;
  amount: number;
}

// Tipe data saat kita mau create baru (belum punya ID)
// Omit mengambil semua properti Expense kecuali 'id'
export type ExpenseCreate = Omit<Expense, 'id'>;
