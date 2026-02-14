import { useState } from 'react';
import { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { useExpenseStore } from '../store/expenseStore';
import { UseExpenseDateInputReturn } from '../types/saveExpense.interface';

export const useExpenseDate = (): UseExpenseDateInputReturn => {
  const date = useExpenseStore((state) => state.date);
  const setGlobalDate = useExpenseStore((state) => state.setDate);

  const [showPicker, setShowPicker] = useState<boolean>(false);

  const openDatePicker = () => {
    setShowPicker(true);
  };

  const handleDateChange = (
    event: DateTimePickerEvent,
    selectedDate?: Date,
  ) => {
    setShowPicker(false);
    if (selectedDate) {
      setGlobalDate(selectedDate);
    }
  };

  const clearDate = () => {
    setGlobalDate(null);
  };

  const formattedDate = date
    ? format(date, 'dd MMMM yyyy', { locale: id })
    : '';

  return {
    date,
    showPicker,
    formattedDate,
    openDatePicker,
    handleDateChange,
    clearDate,
  };
};
