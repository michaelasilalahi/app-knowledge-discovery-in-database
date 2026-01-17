import { DateTimePickerEvent } from '@react-native-community/datetimepicker';
export interface ExpenseInput {
  amount: number | null;
}

export interface ExpenseNameInput {
  expenseName: string;
}

export interface ExpenseDateInput {
  date: Date | null;
}

export interface UseExpenseDateInputReturn {
  date: Date | null;
  showPicker: boolean;
  formattedDate: string;
  openDatePicker: () => void;
  handleDateChange: (event: DateTimePickerEvent, selectedDate?: Date) => void;
  clearDate: () => void;
}

export interface UseExpenseLabelReturn {
  isModalVisible: boolean; // apakah modal label visible / tidak
  label: string | null; // label yang dipilih
  openModal: () => void; // open modal
  closeModal: () => void; // close modal
  clearLabel: () => void; // clear label
  handleSelectLabel: (label: string) => void; // handle pilih label
  labelOptions: string[]; // daftar label
}

export interface UseExpenseCategoryReturn {
  isModalVisible: boolean; // apakah modal kategori visible / tidak
  category: string | null; // kategori yang dipilih
  openModal: () => void; // open modal
  closeModal: () => void; // close modal
  clearCategory: () => void; // clear category
  handleSelectCategory: (category: string) => void; // handle pilih kategori
  categoryOptions: string[]; // daftar kategori
}
