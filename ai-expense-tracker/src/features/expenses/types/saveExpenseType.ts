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
  // State UI
  isModalVisible: boolean;
  // Data Global
  label: string | null;
  // Data option
  labelOptions: string[];
  // State Sementara untuk Wheel Picker
  tempSelected: string;
  // Action
  openModal: () => void;
  closeModal: () => void;
  clearLabel: () => void;

  // Handlers untuk Wheel Picker
  handleWheelChange: (value: string) => void;
  confirmSelection: () => void;
}

export interface UseExpenseCategoryReturn {
  // State UI
  isModalVisible: boolean;
  // Data Global
  category: string | null;
  tempCategory: string;
  categoryOptions: string[];
  // Action
  openModal: () => void;
  closeModal: () => void;
  clearCategory: () => void;
  // Handler submit value category
  handleSelectTempCategory: (item: string) => void;
  handleSubmitCategory: () => void;
}
