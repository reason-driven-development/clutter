import { useState } from 'react';

const useDateDifference = () => {
  const [difference, setDifference] = useState<number | null>(null);

  const calculateDateDifference = (year: number, month: number, day: number) => {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    const inputDate = new Date(year, month - 1, day);
    const differenceInDays = Math.floor(
      (inputDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    setDifference(differenceInDays);
  };

  return { difference, calculateDateDifference };
};

export default useDateDifference;
