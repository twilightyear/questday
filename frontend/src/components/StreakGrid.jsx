import { getCurrentYear, getDaysInYear } from '../utils/util_functions';

//StreakGrid 컴포넌트
export default function StreakGrid({ calendarData = [] }) {
    //연재 연도 조회 함수 호출
    const currentYear = getCurrentYear();

    //현재 연도에 따른 날 개수 조회용 함수 호출
    const daysInYear = getDaysInYear(currentYear);

    //현재 연도에 대한 Daily 전체 조회
    const targetYearData = calendarData.find((item => item.year == currentYear));
    const dailies = targetYearData ? targetYearData.dailies : [];

    //StreakGrid 생성을 위한 Streak Map 생성
    const streakMap = dailies.reduce((acc, daily) => {
        const allTodos = daily.categories.flatMap((category) => category.todos);
        const hasTodos = allTodos.length > 0;

        //모든 todo.is_done 이 True 여야만 값 반영
        const isAllDone = hasTodos && allTodos.every((todo) => todo.is_done);
        const totalTodoCount = isAllDone ? allTodos.length : 0;
        
        //M-D 형식으로 acc 에 저장
        const key = `${daily.month}-${daily.day}`;
        acc[key] = totalTodoCount;

        return acc
    }, {});

    //할일 개수에 따른 색상 강도 조절
    const getStreakColor = (count) => {
        if (!count || count == 0) {
            return 'bg-gray-500';
        } else if(count <= 1) {
            return 'bg-green-200';
        } else if(count <= 3) {
            return 'bg-green-300';
        } else if(count <= 5) {
            return 'bg-green-400';
        } else if(count <= 7) {
            return 'bg-green-500';
        } else {
            return 'bg-green-700';
        }
    }

    return (
        <div className="w-1/1 h-1/1 py-2 bg-slate-950 px-3 rounded-xl shadow-sm">

            {/* 컴포넌트 최상단 영역 */}
            <div className="text-lg text-center text-white mb-2 font-semibold">{currentYear} 기록</div>

                {/* Grid 영역 */}
                <div className="grid grid-rows-7 grid-flow-col gap-0.5">
                {Array.from({ length: daysInYear }).map((_, index) => {

                    //현재 날짜값을 통한 month, day 값 파싱
                    const currentDate = new Date(currentYear, 0, 1 + index);
                    const month = currentDate.getMonth() + 1;
                    const day = currentDate.getDate();

                    //날짜 key 와 개수
                    const dateKey = `${month}-${day}`;
                    const count = streakMap[dateKey] || 0;

                    //YYYY-MM-DD 형태로 파싱
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