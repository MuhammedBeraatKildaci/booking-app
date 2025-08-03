import { useState, useCallback } from 'react';
import dayjs from 'dayjs';

interface UseDateRangeProps {
  initialStartDate?: string;
  initialEndDate?: string;
}

export const useDateRange = ({ initialStartDate, initialEndDate }: UseDateRangeProps = {}) => {
  const [startDate, setStartDate] = useState(initialStartDate || '');
  const [endDate, setEndDate] = useState(initialEndDate || '');
  const [dateText, setDateText] = useState('');

  const handleDatePress = useCallback((day: { dateString: string }) => {
    const isRangeComplete = startDate && endDate;
    const isFirstSelection = !startDate || isRangeComplete;
    const isSecondDateValid = day.dateString >= startDate;

    if (isFirstSelection) {
      setStartDate(day.dateString);
      setEndDate('');
      setDateText(dayjs(day.dateString).format('DD/MM/YYYY'));
      return;
    }

    if (isSecondDateValid) {
      setEndDate(day.dateString);
      setDateText(`${dayjs(startDate).format('DD/MM/YYYY')} - ${dayjs(day.dateString).format('DD/MM/YYYY')}`);
      return;
    }

    setStartDate(day.dateString);
    setEndDate('');
    setDateText(dayjs(day.dateString).format('DD/MM/YYYY'));
  }, [startDate, endDate]);

  const getMarkedDates = useCallback(() => {
    const marked: Record<string, any> = {};

    if (startDate) {
      marked[startDate] = {
        selected: true,
        startingDay: true,
        color: '#003580',
      };
    }

    if (endDate) {
      marked[endDate] = {
        selected: true,
        endingDay: true,
        color: '#003580',
      };
    }

    if (startDate && endDate) {
      const start = dayjs(startDate);
      const end = dayjs(endDate);
      let current = start.add(1, 'day');

      while (current.isBefore(end)) {
        const dateString = current.format('YYYY-MM-DD');
        marked[dateString] = {
          selected: true,
          color: '#003580',
        };
        current = current.add(1, 'day');
      }
    }

    return marked;
  }, [startDate, endDate]);

  const clearDates = useCallback(() => {
    setStartDate('');
    setEndDate('');
    setDateText('');
  }, []);

  const isDateRangeComplete = startDate && endDate;

  return {
    startDate,
    endDate,
    dateText,
    handleDatePress,
    getMarkedDates,
    clearDates,
    isDateRangeComplete,
  };
}; 