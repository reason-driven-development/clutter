import { DateDifferenceInput } from '@/types/dateInterfaces';
import { useState } from 'react';

const calculateDateDifferencePure = ({
  baseDate: base,
  targetDate: target,
}: DateDifferenceInput) => {
  const baseDate = new Date(base.year, base.month, base.day);
  const targetDate = new Date(target.year, target.month - 1, target.day);
  return Math.floor((targetDate.getTime() - baseDate.getTime()) / (1000 * 60 * 60 * 24));
};

const useDateDifference = () => {
  const [difference, setDifference] = useState<number | null>(null);

  const calculateDateDifference = ({ baseDate, targetDate }: DateDifferenceInput) => {
    const diff = calculateDateDifferencePure({ baseDate, targetDate });
    setDifference(diff);
  };

  return { difference, calculateDateDifference };
};

export default useDateDifference;
