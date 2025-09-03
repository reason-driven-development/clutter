'use client';

import { useState } from 'react';
import { Calendar, Calculator, Clock, CalendarDays } from 'lucide-react';
import useDateDifference from '@/hooks/useDateDifference';
import useDateInputs from '@/hooks/useDateInputs';
import { DateYearMonthDay } from '@/types/dateInterfaces';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Dday = () => {
  const { year, setYear, month, setMonth, day, setDay } = useDateInputs({
    year: new Date().getFullYear() + 1,
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),
  });
  const { difference, calculateDateDifference } = useDateDifference();
  const [isCalculated, setIsCalculated] = useState(false);

  // 입력 필드의 표시 값을 별도로 관리
  const [yearInput, setYearInput] = useState(String(year));
  const [monthInput, setMonthInput] = useState(String(month));
  const [dayInput, setDayInput] = useState(String(day));

  // 계산된 목표 날짜를 별도로 저장
  const [calculatedTargetDate, setCalculatedTargetDate] = useState<{
    year: number;
    month: number;
    day: number;
  } | null>(null);

  const base = new Date();
  const baseDate: DateYearMonthDay = {
    year: base.getFullYear(),
    month: base.getMonth() + 1,
    day: base.getDate(),
  };

  const handleCalculate = () => {
    const targetYear = typeof year === 'number' ? year : 0;
    const targetMonth = typeof month === 'number' ? month : 1;
    const targetDay = typeof day === 'number' ? day : 1;

    // 유효한 날짜인지 검증
    if (!isValidDate(targetYear, targetMonth, targetDay)) {
      alert('유효하지 않은 날짜입니다. 다시 입력해주세요.');
      return;
    }

    // 계산된 목표 날짜 저장
    setCalculatedTargetDate({
      year: targetYear,
      month: targetMonth,
      day: targetDay,
    });

    calculateDateDifference({
      baseDate,
      targetDate: { year: targetYear, month: targetMonth, day: targetDay },
    });
    setIsCalculated(true);
  };

  const handleReset = () => {
    const newYear = new Date().getFullYear() + 1;
    const newMonth = new Date().getMonth() + 1;
    const newDay = new Date().getDate();

    setYear(newYear);
    setMonth(newMonth);
    setDay(newDay);
    setYearInput(String(newYear));
    setMonthInput(String(newMonth));
    setDayInput(String(newDay));
    setIsCalculated(false);
    setCalculatedTargetDate(null);
  };

  const formatDate = (year: number, month: number, day: number) => {
    return `${year}년 ${month}월 ${day}일`;
  };

  // 유효한 날짜인지 검증하는 함수
  const isValidDate = (year: number, month: number, day: number): boolean => {
    if (year < 1900 || year > 2100) return false;
    if (month < 1 || month > 12) return false;

    const date = new Date(year, month - 1, day);
    return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
  };

  // 월별 최대 일수 반환
  const getMaxDaysInMonth = (year: number, month: number): number => {
    return new Date(year, month, 0).getDate();
  };

  const getResultMessage = () => {
    if (difference === null) return '';

    const absDifference = Math.abs(difference);
    const isPast = difference < 0;

    if (absDifference === 0) {
      return '오늘입니다!';
    }

    const daysText = absDifference === 1 ? '일' : '일';
    const direction = isPast ? '지났습니다' : '남았습니다';

    return `${absDifference}${daysText} ${direction}`;
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* 헤더 */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Calendar className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">D-Day 계산기</h1>
        </div>
        <p className="text-muted-foreground text-lg">중요한 날짜까지 남은 시간을 계산해보세요</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* 입력 카드 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              날짜 입력
            </CardTitle>
            <CardDescription>계산하고 싶은 날짜를 입력해주세요</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="year">연도</Label>
                <Input
                  id="year"
                  type="text"
                  value={yearInput}
                  onKeyDown={(e) => {
                    // 숫자, 백스페이스, 삭제, 화살표 키만 허용
                    if (
                      !/[\d\b\Delete\ArrowLeft\ArrowRight\ArrowUp\ArrowDown\Tab]/.test(e.key) &&
                      !e.ctrlKey &&
                      !e.metaKey
                    ) {
                      e.preventDefault();
                    }
                  }}
                  onInput={(e) => {
                    const value = e.currentTarget.value;
                    // 숫자만 추출
                    const numericValue = value.replace(/[^\d]/g, '');

                    // 최대 4자리로 제한
                    const limitedValue = numericValue.slice(0, 4);

                    if (limitedValue === '') {
                      setYearInput('');
                      setYear(0);
                    } else {
                      const yearNum = parseInt(limitedValue);
                      if (yearNum < 1900) {
                        setYearInput('1900');
                        setYear(1900);
                      } else if (yearNum > 2100) {
                        setYearInput('2100');
                        setYear(2100);
                      } else {
                        setYearInput(limitedValue);
                        setYear(yearNum);
                      }
                    }
                  }}
                  placeholder="2024"
                />
                <p className="text-xs text-muted-foreground">1900-2100</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="month">월</Label>
                <Input
                  id="month"
                  type="text"
                  value={monthInput}
                  onKeyDown={(e) => {
                    // 숫자, 백스페이스, 삭제, 화살표 키만 허용
                    if (
                      !/[\d\b\Delete\ArrowLeft\ArrowRight\ArrowUp\ArrowDown\Tab]/.test(e.key) &&
                      !e.ctrlKey &&
                      !e.metaKey
                    ) {
                      e.preventDefault();
                    }
                  }}
                  onInput={(e) => {
                    const value = e.currentTarget.value;
                    // 숫자만 추출
                    const numericValue = value.replace(/[^\d]/g, '');

                    // 최대 2자리로 제한
                    const limitedValue = numericValue.slice(0, 2);

                    if (limitedValue === '') {
                      setMonthInput('');
                      setMonth(1);
                    } else {
                      const monthNum = parseInt(limitedValue);
                      if (monthNum < 1) {
                        setMonthInput('1');
                        setMonth(1);
                      } else if (monthNum > 12) {
                        setMonthInput('12');
                        setMonth(12);
                      } else {
                        setMonthInput(limitedValue);
                        setMonth(monthNum);
                        // 월이 변경되면 일도 유효한 범위로 조정
                        const currentDay = day || 1;
                        const maxDays = getMaxDaysInMonth(
                          year || new Date().getFullYear(),
                          monthNum
                        );
                        if (currentDay > maxDays) {
                          setDay(maxDays);
                          setDayInput(String(maxDays));
                        }
                      }
                    }
                  }}
                  placeholder="12"
                />
                <p className="text-xs text-muted-foreground">1-12</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="day">일</Label>
                <Input
                  id="day"
                  type="text"
                  value={dayInput}
                  onKeyDown={(e) => {
                    // 숫자, 백스페이스, 삭제, 화살표 키만 허용
                    if (
                      !/[\d\b\Delete\ArrowLeft\ArrowRight\ArrowUp\ArrowDown\Tab]/.test(e.key) &&
                      !e.ctrlKey &&
                      !e.metaKey
                    ) {
                      e.preventDefault();
                    }
                  }}
                  onInput={(e) => {
                    const value = e.currentTarget.value;
                    // 숫자만 추출
                    const numericValue = value.replace(/[^\d]/g, '');

                    // 최대 2자리로 제한
                    const limitedValue = numericValue.slice(0, 2);

                    if (limitedValue === '') {
                      setDayInput('');
                      setDay(1);
                    } else {
                      const dayNum = parseInt(limitedValue);
                      const currentYear = year || new Date().getFullYear();
                      const currentMonth = month || 1;
                      const maxDays = getMaxDaysInMonth(currentYear, currentMonth);

                      if (dayNum < 1) {
                        setDayInput('1');
                        setDay(1);
                      } else if (dayNum > maxDays) {
                        setDayInput(String(maxDays));
                        setDay(maxDays);
                      } else {
                        setDayInput(limitedValue);
                        setDay(dayNum);
                      }
                    }
                  }}
                  placeholder="31"
                />
                <p className="text-xs text-muted-foreground">
                  {month && year ? `1-${getMaxDaysInMonth(year, month)}` : '1-31'}
                </p>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button onClick={handleCalculate} className="flex-1">
                <Calculator className="h-4 w-4 mr-2" />
                계산하기
              </Button>
              <Button variant="outline" onClick={handleReset}>
                초기화
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 결과 카드 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              계산 결과
            </CardTitle>
            <CardDescription>입력한 날짜와의 차이를 확인하세요</CardDescription>
          </CardHeader>
          <CardContent>
            {isCalculated && difference !== null ? (
              <div className="space-y-4">
                <div className="text-center p-6 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-primary mb-2">{getResultMessage()}</div>
                  <div className="text-sm text-muted-foreground">
                    {formatDate(baseDate.year, baseDate.month, baseDate.day)} →{' '}
                    {calculatedTargetDate
                      ? formatDate(
                          calculatedTargetDate.year,
                          calculatedTargetDate.month,
                          calculatedTargetDate.day
                        )
                      : formatDate(year || 0, month || 1, day || 1)}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-center p-3 bg-background border rounded-lg">
                    <div className="font-semibold">현재 날짜</div>
                    <div className="text-muted-foreground">
                      {formatDate(baseDate.year, baseDate.month, baseDate.day)}
                    </div>
                  </div>
                  <div className="text-center p-3 bg-background border rounded-lg">
                    <div className="font-semibold">목표 날짜</div>
                    <div className="text-muted-foreground">
                      {calculatedTargetDate
                        ? formatDate(
                            calculatedTargetDate.year,
                            calculatedTargetDate.month,
                            calculatedTargetDate.day
                          )
                        : formatDate(year || 0, month || 1, day || 1)}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <CalendarDays className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>날짜를 입력하고 계산하기 버튼을 눌러주세요</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* 추가 정보 */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>사용 팁</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• 과거 날짜를 입력하면 &ldquo;지났습니다&rdquo;로 표시됩니다</li>
            <li>• 미래 날짜를 입력하면 &ldquo;남았습니다&rdquo;로 표시됩니다</li>
            <li>• 오늘 날짜를 입력하면 &ldquo;오늘입니다!&rdquo;로 표시됩니다</li>
            <li>• 초기화 버튼으로 기본값으로 되돌릴 수 있습니다</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dday;
