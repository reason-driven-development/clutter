'use client';
import useDateInputs from '../../hooks/useDateInputs';
import useDateDifference from '../../hooks/useDateDifference';

const Dday = () => {
  const { year, setYear, month, setMonth, day, setDay } = useDateInputs(2024, 7, 1);
  const { difference, calculateDateDifference } = useDateDifference();

  const handleCalculate = () => {
    calculateDateDifference(year, month, day);
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
