import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import StreakGrid from '../components/StreakGrid';
import { createCalendar, getCalendars } from '../apis/calendarApi';
import { deleteTodo, createTodo, updateTodo } from '../apis/todoApi';
import { deleteCategory, createCategory } from '../apis/categoryApi';
import { createDaily, getDaily } from '../apis/dailyApi';
import MonthCalendar from '../components/MonthCalendar';
import DailyModal from '../components/DailyModal';
import { userLogout } from '../apis/userApi';
import { useNavigate } from 'react-router-dom';

export default function MainPage() {
    const [calendarData, setCalendarData] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);

    const navigate = useNavigate();

    //Calendar 데이터 받아오기 시도 로직
    const fetchCalendarData = async () => {
      try {
        const response = await getCalendars();
        setCalendarData(response);
      } catch (error) {
        console.error("[ Calendar API 에러 발생 ] : ", error);
      }
    };

    useEffect(() => {
        fetchCalendarData();
    }, []);


    const handleDeleteTodo = async (year, month, day, categoryId, todoId) => {
      try {
        await deleteTodo(year, month, day, categoryId, todoId);
        fetchCalendarData();
      } catch (err){
        console.log(err);
      }
    };

    const handleDeleteCategory = async (year, month, day, categoryId) => {
      try {
        await deleteCategory(year, month, day, categoryId);
        fetchCalendarData();
      } catch (err){
        console.log(err);
      }
    };

    const handleUserLogout = async () => {
      try {
        await userLogout();
        navigate("/")
      } catch (err){
        console.log(err);
      }
    }

    const handleCreateCategory = async (year, month, day, body) => {
      try {
        const targetYear = calendarData.find((item) => item.year === year);
        if(!targetYear){
          const yearData = {
            year: year
          }
          try {
            await createCalendar(yearData);
          } catch(err){
            console.log(err);
          }
        }

        const targetDaily = targetYear?.dailies.find((d) => d.month === month && d.day === day);
        if(!targetDaily){
          try {
            const dailyData = {
              month: Number(month),
              day: Number(day)
            };
            await createDaily(year, dailyData);
          } catch(err){
            console.log(err);
          }
        }

        await createCategory(year, month, day, body);
        fetchCalendarData();
      } catch (err){
        console.log(err);
      }
    };

    const handleCreateTodo = async (year, month, day, categoryId, body) => {
      try {
        await createTodo(year, month, day, categoryId, body);
        fetchCalendarData();
      } catch (err){
        console.log(err);
      }
    }

    const handleUpdateTodoIsDone = async (year, month, day, categoryId, todoId) => {
      try{
        const targetYear = calendarData.find((item) => item.year === year);
        const targetDaily = targetYear?.dailies.find((d) => d.month === month && d.day === day);
        const targetCategory = targetDaily?.categories.find((c) => c.category_id === categoryId);
        const targetTodo = targetCategory?.todos.find((t) => t.todo_id === todoId)

        const todoData = {
          title : targetTodo.title,
          content : targetTodo.content,
          is_done : true
        }

        if(targetTodo.is_done){
          todoData.is_done = false;
        } else {
          todoData.is_done = true;
        }

        await updateTodo(year, month, day, categoryId, todoId, todoData);
        fetchCalendarData();
      } catch (err){
        console.log(err);
      }
    }

return (

    <div className="relative min-h-screen bg-slate-950 text-slate-100 p-6 flex justify-center">
      {/* 전체 컨테이너 */}
      <div className="w-full max-w-7xl flex gap-6">
        {/* 좌측 메인 영역 */}
        <div className="flex-1 flex flex-col gap-6">
          {/* 상단 영역 - Streak Grid */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
            <div className="h-32 flex items-center justify-center border border-dashed border-slate-800 rounded-xl">
              <StreakGrid calendarData={calendarData} />
            </div>
          </div>
          {/* 하단 영역 - Calendar */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg flex-1">
            <MonthCalendar 
              calendarData={calendarData}
              onSelectedDate={(year, month, day) => setSelectedDate({year, month, day})}
            />
          </div>
        </div>
        {/* 우측 영역 */}
        <div className="w-80 flex flex-col gap-6">
          
          {/* 사용자 바 */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg flex flex-col items-center gap-4">
            {/* 아바타 박스 */}
            <div className="w-24 h-24 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center text-slate-500 text-xs">
              아바타 사진
            </div>
            {/* 닉네임 */}
            <div className="font-bold text-slate-200 text-lg">
              닉네임
            </div>
            {/* 레벨 바 */}
            <div className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3">
              <div className="flex justify-between text-xs font-mono mb-1.5">
                <span className="text-emerald-400">LV. 0</span>
                <span className="text-slate-400">0%</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full w-0"></div>
              </div>
            </div>
          </div>
          {/* 리더보드 및 퀘스트 상점 */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-lg flex flex-col gap-2.5">
            <button className="w-full bg-slate-950 hover:bg-slate-800/80 border border-slate-800 text-slate-300 py-3 rounded-xl text-sm font-semibold transition-colors">
              리더보드
            </button>
            <button className="w-full bg-slate-950 hover:bg-slate-800/80 border border-slate-800 text-slate-300 py-3 rounded-xl text-sm font-semibold transition-colors">
              퀘스트 상점
            </button>
          </div>
          {/* 설정 및 로그아웃 */}
          <div className="mt-auto flex gap-2">
            <button className="flex-1 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-slate-200 py-2.5 rounded-xl text-xs font-semibold transition-colors">
              설정
            </button>

            <button onClick={handleUserLogout} className="flex-1 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-rose-400/80 hover:text-rose-400 py-2.5 rounded-xl text-xs font-semibold transition-colors">
              로그아웃
            </button>
          </div>
        </div>
          {selectedDate && (
            <DailyModal
              calendarData={calendarData}
              selectedDate={selectedDate}
              onClose={()=>setSelectedDate(null)}
              onDeleteTodo={handleDeleteTodo}
              onCreateTodo={handleCreateTodo}
              onDeleteCategory={handleDeleteCategory}
              onCreateCategory={handleCreateCategory}
              onUpdateTodoIsDone={handleUpdateTodoIsDone}
            />
          )}
      </div>
    </div>
  );
}