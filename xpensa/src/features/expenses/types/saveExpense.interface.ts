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
  isModalVisible: boolean;
  label: string | null;
  labelOptions: string[];
  tempSelected: string;
  openModal: () => void;
  closeModal: () => void;
  clearLabel: () => void;
  handleWheelChange: (value: string) => void;
  confirmSelection: () => void;
}

export interface UseExpenseCategoryReturn {
  isModalVisible: boolean;
  category: string | null;
  tempCategory: string;
  categoryOptions: string[];
  openModal: () => void;
  closeModal: () => void;
  clearCategory: () => void;
  handleSelectTempCategory: (item: string) => void;
  handleSubmitCategory: () => void;
}
