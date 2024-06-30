import { useState } from 'react';

const useDateInputs = (initialYear: number, initialMonth: number, initialDay: number) => {
  const [year, setYear] = useState<number>(initialYear);
  const [month, setMonth] = useState<number>(initialMonth);
  const [day, setDay] = useState<number>(initialDay);

  return {
    year,
    setYear,
    month,
    setMonth,
    day,
    setDay,
  };
};

export default useDateInputs;
