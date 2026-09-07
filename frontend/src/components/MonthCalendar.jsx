import React, { useState, useEffect } from 'react';
import { getCurrentYear, getCurrentMonth } from '../utils/util_functions';

export default function MonthCalendar({calendarData}){
    const currentYear = getCurrentYear();
    const currentMonth = getCurrentMonth();

    //useState를 사용한 year, month 값 관리 로직
    const [year, setYear] = useState(currentYear);
    const [month, setMonth] = useState(currentMonth);

    const daysOfWeek = ['일','월','화','수','목','금','토'];

    //이전 달로 달력을 넘기는 버튼 로직
    const handlePrevMonth = () => {
        if (month === 1) {
            setYear(year - 1);
            setMonth(12);
        } else {
            setMonth(month - 1)
        }
    };

    //다음 달로 달력을 넘기는 버튼 로직
    const handleNextMonth = () => {
        if (month === 12) {
            setYear(year + 1);
            setMonth(1);
        } else {
            setMonth(month + 1)
        }
    };

    //Todo 확인 로직
    const targetYearData = calendarData.find((item) => item.year === year);
    const dailies = targetYearData ? targetYearData.dailies : [];

    const dailyMap = {};

    //dailyMap 생성 로직
    dailies.forEach((daily) => {
        const key = `${daily.month}-${daily.day}`;
        const allTodos = daily.categories.flatMap((cat) => cat.todos);
        const hasTodos = allTodos.length > 0;
        const isAllDone = hasTodos && allTodos.every((todo) => todo.is_done);

        if (isAllDone) {
            dailyMap[key] = allTodos.length;
        }
    });

    //1일의 요일 계산 로직
    const firstDayIndex = new Date(year,month-1,1).getDay();

    //총 일수 계산 로직
    const totalDays = new Date(year, month, 0).getDate();

    //Calendar 의 적절한 월별 Grid 구성을 위한 칸 생성 로직
    const emptySlots = Array(firstDayIndex).fill(null);
    const daysArray = Array.from({length : totalDays}, (_, i) => i + 1);

    //전부 완료 달성시에 칸에 채색할 색상 결정 로직
    const getStreakColor = (count) => {
        if (!count || count == 0){
        return 'bg-slate-900 border border-slate-800 text-slate-500 hover:bg-slate-800';
        }else if(count <= 1){
        return 'bg-green-200 border-slate-800 text-slate-950 hover:bg-green-800';
        }else if(count <= 3){
        return 'bg-green-300 border-slate-800 text-slate-950 hover:bg-green-800';
        }else if(count <= 5){
        return 'bg-green-400 border-slate-800 text-slate-950 hover:bg-green-800';
        }else if(count <= 7){
        return 'bg-green-500 border-slate-800 text-slate-950 hover:bg-green-800';
        }else{
        return 'bg-green-700 border-slate-800 text-slate-950 hover:bg-green-800';
        }
    };

    return (
        <div className="h-1/1 w-1/1  bg-slate-950 p-6 rounded-2xl shadow-sm border border-slate-800">
            {/* 컴포넌트 상단 영역 */}
            <div className="flex justify-between items-center mb-6">
                <button 
                    onClick={handlePrevMonth}
                    className="px-3 py-1.5 text-sm font-medium bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
                >
                    &lt; 이전
                </button>
                <h2 className="text-lg font-bold !text-slate-100">
                    {year}년 {month}월
                </h2>
                <button 
                    onClick={handleNextMonth}
                    className="px-3 py-1.5 text-sm font-medium bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
                >
                    다음 &gt;
                </button>
            </div>

            {/* 요일 헤더 */}
            <div className="grid grid-cols-7 gap-2 text-center font-semibold text-xs text-gray-400 mb-3">
                {daysOfWeek.map((day, index) => (
                    <div key={index}>{day}</div>
                ))}
            </div>

            {/* Daily Grid */}
            <div className="grid grid-cols-7 gap-2">
                {/* EmptySlots 채우기 */}
                {emptySlots.map((_, index) => (
                    <div key={`empty-${index}`} className="h-14"></div>
                ))}

                {/* 실제 날 채우기 */}
                {daysArray.map((day) => {
                    const dateKey = `${month}-${day}`;
                    const todoCount = dailyMap[dateKey] || 0;
                    const colorClass = getStreakColor(todoCount);

                    //각 Daily 박스 생성 로직
                    return (
                        <div 
                            key={day} 
                            className={`h-14 border rounded-xl flex flex-col justify-between p-2 transition-all cursor-pointer ${colorClass}`}
                        >
                            <span className="text-xs font-semibold">{day}</span>
                            {todoCount > 0 && (
                                <span className="text-[10px] font-medium text-center opacity-80">
                                    {todoCount} / {todoCount}
                                </span>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}