import { useState } from 'react';
import { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { UseExpenseDateInputReturn } from '../types/saveExpenseType';

export const useExpenseDate = (): UseExpenseDateInputReturn => {
  const [date, setDate] = useState<Date | null>(null);
  const [showPicker, setShowPicker] = useState<boolean>(false);

  // modal react native datetime picker
  const openDatePicker = () => {
    setShowPicker(true);
  };

  const handleDateChange = (
    event: DateTimePickerEvent, // operating system report
    selectedDate?: Date,
  ) => {
    setShowPicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  // fungsi menghapus tanggal
  const clearDate = () => {
    setDate(null);
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
