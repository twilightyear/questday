import { useState } from 'react';
import { getCurrentYear, getCurrentMonth } from '../utils/util_functions';

//Monthly Calendar 컴포넌트
export default function MonthCalendar({calendarData, onSelectedDate, currentCreatedAt}){
    //현재 Monthly Calendar 값 설정용 날짜 설정
    const currentYear = getCurrentYear();
    const currentMonth = getCurrentMonth();

    //UseState 정의부
    const [year, setYear] = useState(currentYear);
    const [month, setMonth] = useState(currentMonth);

    //User 계정 생성 날짜값 호출
    const userCreatedDate = currentCreatedAt ? new Date(currentCreatedAt) : null;
    if (userCreatedDate) {
        userCreatedDate.setHours(0, 0, 0, 0);
    }

    //요일배열 설정 및 현재 날짜 함수 설정
    const daysOfWeek = ['일','월','화','수','목','금','토'];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

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

        //Daily 내의 모든 Todo 가 완료되어야 key 값에 할일 개수 설정
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

    //Click 한 날짜처리
    const handleClickDate = (day) => {
        if (onSelectedDate) {
            onSelectedDate(year, month, day);
        }
    };

    return (
        <div className="h-1/1 w-1/1  bg-slate-950 p-6 rounded-2xl shadow-sm border border-slate-800">

            {/* 컴포넌트 상단 영역 */}
            <div className="flex justify-between items-center mb-6">

                {/* 이전 달 변경 버튼 영역 */}
                <button 
                    onClick={handlePrevMonth}
                    className="px-3 py-1.5 text-sm font-medium bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
                >
                    &lt; 이전
                </button>
                
                {/* Calendar 컴포넌트 제목 영역 */}
                <h2 className="text-lg font-bold !text-slate-100">
                    {year}년 {month}월
                </h2>

                {/* 다음 달 변경 버튼 영역 */}
                <button 
                    onClick={handleNextMonth}
                    className="px-3 py-1.5 text-sm font-medium bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
                >
                    다음 &gt;
                </button>
            </div>

            {/* 요일 헤더 영역 */}
            <div className="grid grid-cols-7 gap-2 text-center font-semibold text-xs text-gray-400 mb-3">
                {daysOfWeek.map((day, index) => (
                    <div key={index}>{day}</div>
                ))}
            </div>

            {/* Daily Grid 영역 */}
            <div className="grid grid-cols-7 gap-2">

                {/* EmptySlots 영역 */}
                {emptySlots.map((_, index) => (
                    <div key={`empty-${index}`} className="h-14"></div>
                ))}

                {/* 실제 날 영역 */}
                {daysArray.map((day) => {
                    const dateKey = `${month}-${day}`;
                    const todoCount = dailyMap[dateKey] || 0;
                    let colorClass = "";

                    //날짜 계산 로직
                    const slotDate = new Date(year, month-1, day);
                    slotDate.setHours(0, 0, 0, 0);
                    const timeDiff = slotDate.getTime();
                    const todayTime = today.getTime();
                    const createdTime = userCreatedDate ? userCreatedDate.getTime() : null;
                    const isBeforeCreation = createdTime != null && timeDiff < createdTime;
                
                    //User 생성일자 이전의 Slot
                    if (isBeforeCreation) {
                        colorClass = 'bg-slate-900/40 border-slate-800/50 text-slate-600';
                    
                    //User 생성일자 이후의 Slot
                    } else {
                         if (timeDiff < todayTime) {
                            //과거 날짜
                            if (todoCount > 0) {
                                colorClass = 'bg-emerald-950/40 border-emerald-800/60 text-emerald-300 hover:bg-emerald-900/50';
                            } else {
                                colorClass = 'bg-rose-950/30 border-rose-900/50 text-rose-400 hover:bg-rose-900/40';
                            }
                        } else if (timeDiff === todayTime) {
                            //오늘 날짜
                            colorClass = 'bg-indigo-950/60 border-indigo-500 text-indigo-200 shadow-sm shadow-indigo-500/10 hover:bg-indigo-900/60';
                        } else {
                            //미래 날짜
                            colorClass = 'bg-slate-900 border-slate-800/80 text-slate-300 hover:border-slate-700 hover:bg-slate-850';
                        }
                    }

                    //각 Daily 박스 생성 로직
                    return (
                        <div 
                            onClick={() => handleClickDate(day)}
                            key={dateKey} 
                            className={`h-14 border rounded-xl flex flex-col justify-between p-2 transition-all cursor-pointer ${colorClass}`}
                        >
                            
                            {/* Todo 완료 개수 표시 영역 */}
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