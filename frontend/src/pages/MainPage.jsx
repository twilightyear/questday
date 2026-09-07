import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import StreakGrid from '../components/StreakGrid';
import { USER_ID } from '../constants/config';
import { getCalendars } from '../apis/calendarApi';
import MonthCalendar from '../components/MonthCalendar';

export default function MainPage() {
    const [calendarData, setCalendarData] = useState([]);

    useEffect(() => {

        //Calendar 데이터 받아오기 시도 로직
        const fetchCalendarData = async () => {
            try {
                const response = await getCalendars(USER_ID);
                setCalendarData(response);
            } catch (error) {
                console.error("[ Calendar API 에러 발생 ] : ", error);
            }
        };

        fetchCalendarData();
    }, []);

return (

    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 flex justify-center">
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
            <MonthCalendar calendarData={calendarData} />
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
                <div className="bg-emerald-500 h-full w-0/4"></div>
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
            <button className="flex-1 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-rose-400/80 hover:text-rose-400 py-2.5 rounded-xl text-xs font-semibold transition-colors">
              로그아웃
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}