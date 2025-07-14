'use client';

import useDateDifference from '@/hooks/useDateDifference';
import useDateInputs from '@/hooks/useDateInputs';
import { DateYearMonthDay } from '@/types/dateInterfaces';

const Dday = () => {
  const { year, setYear, month, setMonth, day, setDay } = useDateInputs({
    year: 2024,
    month: 7,
    day: 1,
  });
  const { difference, calculateDateDifference } = useDateDifference();

  const base = new Date();
  const baseDate: DateYearMonthDay = {
    year: base.getFullYear(),
    month: base.getMonth(),
    day: base.getDate(),
  };

  const handleCalculate = () => {
    // 타입 안전성을 위해 number로 변환
    const targetYear = typeof year === 'number' ? year : 0;
    const targetMonth = typeof month === 'number' ? month : 1;
    const targetDay = typeof day === 'number' ? day : 1;

    calculateDateDifference({
      baseDate,
      targetDate: { year: targetYear, month: targetMonth, day: targetDay },
    });
  };

  return (
    <div>
      <h2>날짜 차이 계산기</h2>
      <div>
        <label>
          연도:
          <input type="number" value={year} onChange={(e) => setYear(parseInt(e.target.value))} />
        </label>
      </div>
      <div>
        <label>
          월:
          <input type="number" value={month} onChange={(e) => setMonth(parseInt(e.target.value))} />
        </label>
      </div>
      <div>
        <label>
          일:
          <input type="number" value={day} onChange={(e) => setDay(parseInt(e.target.value))} />
        </label>
      </div>
      <button onClick={handleCalculate}>계산</button>
      {difference !== null && (
        <p>
          현재로부터 {year}년 {month}월 {day}일까지 {difference}일 차이납니다.
        </p>
      )}
    </div>
  );
};

export default Dday;
