import { useState, useCallback } from 'react';
import { DateYearMonthDay } from '@/types/dateInterfaces';

// Helper function to validate and constrain year
const validateYear = (year: number | ''): number => {
  if (year === '' || isNaN(Number(year))) return 0;
  const numYear = Number(year);
  return numYear < 0 ? 0 : numYear > 2999 ? 2999 : numYear;
};

// Helper function to validate and constrain month
const validateMonth = (month: number | ''): number => {
  if (month === '' || isNaN(Number(month))) return 1;
  const numMonth = Number(month);
  return numMonth < 1 ? 1 : numMonth > 12 ? 12 : numMonth;
};

// Helper function to validate and constrain day
const validateDay = (year: number, month: number, day: number | ''): number => {
  if (day === '' || isNaN(Number(day))) return 1;
  const numDay = Number(day);
  const maxDay = new Date(year, month, 0).getDate();
  return numDay < 1 ? 1 : numDay > maxDay ? maxDay : numDay;
};

// Hook
const useDateInputs = ({
  year: initialYear,
  month: initialMonth,
  day: initialDay,
}: DateYearMonthDay) => {
  // States for year, month, day
  const [year, setYear] = useState<number | ''>(initialYear);
  const [month, setMonth] = useState<number | ''>(initialMonth);
  const [day, setDay] = useState<number | ''>(initialDay);

  // State to track if an input field is focused
  const [isFocused, setIsFocused] = useState<{ year: boolean; month: boolean; day: boolean }>({
    year: false,
    month: false,
    day: false,
  });

  // Function to handle focus event
  const handleFocus = (field: 'year' | 'month' | 'day') => {
    console.log('focuesd');
    setIsFocused((prevState) => ({ ...prevState, [field]: true }));
  };

  // Function to handle blur event
  const handleBlur = (field: 'year' | 'month' | 'day') => {
    console.log('blured');
    setIsFocused((prevState) => ({ ...prevState, [field]: false }));
    // Update the value with validated data when blur event occurs
    if (field === 'year') {
      setYear(validateYear(year));
    } else if (field === 'month') {
      setMonth(validateMonth(month));
    } else if (field === 'day') {
      const validatedYear = validateYear(year);
      const validatedMonth = validateMonth(month);
      setDay(validateDay(validatedYear, validatedMonth, day));
    }
  };

  // Function to update the date state with validation
  const updateDate = useCallback(
    (newYear: number | '', newMonth: number | '', newDay: number | '') => {
      if (isFocused.year || isFocused.month || isFocused.day) {
        // If focused, allow empty values
        setYear(newYear);
        setMonth(newMonth);
        setDay(newDay);
      } else {
        // Otherwise, validate and update
        const validatedYear = validateYear(newYear);
        const validatedMonth = validateMonth(newMonth);
        const validatedDay = validateDay(validatedYear, validatedMonth, newDay);

        setYear(validatedYear);
        setMonth(validatedMonth);
        setDay(validatedDay);
      }
    },
    [isFocused]
  );

  // Function to handle year change
  const handleYearChange = (newYear: number | '') => {
    updateDate(newYear, month, day);
  };

  // Function to handle month change
  const handleMonthChange = (newMonth: number | '') => {
    updateDate(year, newMonth, day);
  };

  // Function to handle day change
  const handleDayChange = (newDay: number | '') => {
    updateDate(year, month, newDay);
  };

  return {
    year,
    setYear: (newYear: number | '') => {
      handleFocus('year');
      updateDate(newYear, month, day);
    },
    month,
    setMonth: (newMonth: number | '') => {
      handleFocus('month');
      updateDate(year, newMonth, day);
    },
    day,
    setDay: (newDay: number | '') => {
      handleFocus('day');
      updateDate(year, month, newDay);
    },
    handleBlur: (field: 'year' | 'month' | 'day') => handleBlur(field),
  };
};

export default useDateInputs;
