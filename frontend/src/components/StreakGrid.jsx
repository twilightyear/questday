import React from 'react';
import { getCurrentYear, getDaysInYear } from '../utils/util_functions';

export default function StreakGrid({ calendarData = [] }) {
  const currentYear = getCurrentYear();
  const daysInYear = getDaysInYear(currentYear);

  const targetYearData = calendarData.find((item => item.year == currentYear));
  const dailies = targetYearData ? targetYearData.dailies : [];

  //StreakGrid 생성을 위한 Streak Map 생성 로직
  const streakMap = dailies.reduce((acc, daily) => {
    const allTodos = daily.categories.flatMap((category) => category.todos);
    const hasTodos = allTodos.length > 0;

    //모든 todo.is_done 이 True 여야만 값 반영 로작
    const isAllDone = hasTodos && allTodos.every((todo) => todo.is_done);
    const totalTodoCount = isAllDone ? allTodos.length : 0;
    
    //M-D 형식으로 acc 에 저장하는 로직
    const key = `${daily.month}-${daily.day}`;
    acc[key] = totalTodoCount;

    return acc
  }, {});

  //할일 개수에 따른 색상 강도 조절하는 로직
  const getStreakColor = (count) => {
    if (!count || count == 0){
      return 'bg-gray-500';
    }else if(count <= 1){
      return 'bg-green-200';
    }else if(count <= 3){
      return 'bg-green-300';
    }else if(count <= 5){
      return 'bg-green-400';
    }else if(count <= 7){
      return 'bg-green-500';
    }else{
      return 'bg-green-700';
    }
  }

  return (
    <div className="w-1/1 h-1/1 py-2 bg-slate-950 px-3 rounded-xl shadow-sm">
      {/* 컴포넌트 상단 */}
      <div className="text-lg text-center text-white mb-2 font-semibold">{currentYear} 기록</div>
      {/* Streak Grid */}
      <div className="grid grid-rows-7 grid-flow-col gap-0.5">
        {Array.from({ length: daysInYear }).map((_, index) => {
          const currentDate = new Date(currentYear, 0, 1 + index);
          const month = currentDate.getMonth() + 1;
          const day = currentDate.getDate();

          const dateKey = `${month}-${day}`;
          const count = streakMap[dateKey] || 0;

          const dateString = `${currentYear}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

          //각 Daily 박스 생성 로직
          return (
            
            <div 
              key={dateString} 
              className={`w-2 h-2 rounded-md ${getStreakColor(count)}`}
              title={`${dateString}: Todo Count : ${count}`}
            />
          );
        })}
      </div>
    </div>
  );
}