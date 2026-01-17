// Tipe data untuk pengeluaran yang sudah tersimpan di Database (ada ID)
export interface Expense {
  id: number;
  tanggal: string; // Format: "YYYY-MM-DD"
  jenis_pengeluaran: string;
  label: string;
  kategori: string;
  nominal: number;
}

// Tipe data saat kita mau create baru (belum punya ID)
// Omit mengambil semua properti Expense kecuali 'id'
export type ExpenseCreate = Omit<Expense, 'id'>;
