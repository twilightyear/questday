import { useState } from 'react';

//Daily Modal 컴포넌트
export default function DailyModal({ calendarData, selectedDate, onClose, onDeleteTodo, onDeleteCategory, onCreateCategory, onCreateTodo, onToggleTodoIsDone}) {
    //UseState 정의부
    const [ newCategoryTitle, setNewCategoryTitle ] = useState("");
    const [ newTodoContent, setNewTodoContent ] = useState("");
    const [ isAddingTodo, setIsAddingTodo ] = useState(null);
    const [ isAddingCategory, setIsAddingCategory ] = useState(false);

    //현재 조회하는 Modal 의 날짜 데이터 설정
    const { year, month, day } = selectedDate;
    const selectedDateObj = new Date(year, month-1, day);

    //현재 날짜 Datetime
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    //현재 Modal 의 날짜가 미래 Datetime 인지 확인
    const isFuture = selectedDateObj > today;

    //Modal 의 Daily Data 조회
    const targetYearData = calendarData.find((item) => item.year === year);
    const targetDailyData = targetYearData ? targetYearData.dailies.find((daily) => daily.month === month && daily.day === day) : null;

    //Modal 내부 카테고리 생성 로직
    const handleCategoryCreateSubmit = () => {

        //오늘보다 미래의 날짜가 아니라면 생성 중지
        if (!isFuture){
            alert("수정기한이 지났습니다.");
            return;
        }

        //Category 에 입력된 데이터가 없는 상태라면 생성 중지
        if (!newCategoryTitle.trim()) {
            setIsAddingCategory(false);
            setNewCategoryTitle("");
            return;
        }

        //categoryBody 를 바탕으로 카테고리 생성 및 컴포넌트 입력칸 상태 초기화
        const categoryBody = {
            title : newCategoryTitle,
            color : "red"
        }
        onCreateCategory(year, month, day, categoryBody);
        setIsAddingCategory(false);
        setNewCategoryTitle("");
    }

    //Modal Category 내부 Todo 생성 로직
    const handleTodoCreateSubmit = (categoryId) => {

        //오늘보다 미래의 날짜가 아니라면 요청 거부
        if (!isFuture){
            alert("수정기한이 지났습니다.");
            return;
        }

        //Todo 에 입력된 데이터가 없는 상태라면 생성 중지
        if (!newTodoContent.trim()) {
            setIsAddingTodo(null);
            setNewTodoContent("");
            return;
        }

        //todoBody 를 바탕으로 Todo 생성 및 컴포넌트 입력칸 상태 초기화
        const todoBody = {
            title : "Test",
            content : newTodoContent,
            is_done : false
        }
        onCreateTodo(year, month, day, categoryId, todoBody);
        setIsAddingTodo(null);
        setNewTodoContent("");
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

            {/* Modal 컴포넌트 최상위 영역 */}
            <div className="bg-slate-900 border border-slate-800 w-full max-w-3xl rounded-2xl p-6 shadow-2xl flex flex-col max-h-[80vh] max-w-[80vh] overflow-y-auto ">

                {/* Modal 컴포넌트 제목 영역 */}
                <span className="text-slate-300 text-lg font-bold">{year} - {month} - {day}</span>

                {/* Modal 컴포넌트 하단 영역 */}
                <div className="grid grid-cols-2 gap-4 my-4">
                {   
                    targetDailyData?.categories?.map((category, category_idx) => (
                        <div key={category_idx} className="p-3 b-3  bg-slate-800 rounded-2xl flex flex-col gap-1 mb-5 flex">

                            {/* Category 제목 및 삭제 버튼 영역 */}
                            <div className="w-full px-3 py-1 flex justify-between items-center bg-slate-700 rounded-2xl">

                                {/* Category 제목 영역 */}
                                <span className="bg-slate-700 rounded-2xl">{category.title}</span>

                                {/* Category 삭제 버튼 영역 */}
                                <button onClick={() => onDeleteCategory(year, month, day, category.category_id)} className="w-4 h-4 rounded-full bg-rose-400 border border-slate-700 hover:bg-rose-500"></button>
                            </div>
                            {category.todos?.map((todo, todo_idx) => {
                                //Todo 영역 로직
                                return (
                                    <div onClick={() => onToggleTodoIsDone(year, month, day, category.category_id, todo.todo_id)} 
                                    key={todo_idx} 
                                    className={`rounded-2xl border p-2 flex m-2 justify-between items-center items-end cursor-pointer transition-colors flex-col ${todo.is_done ? "bg-emerald-500 border-emerald-400 hover:bg-emerald-700 hover:border-emerald-700" : "bg-slate-800 border-slate-600 hover:bg-slate-700"}`}>
                                        
                                        {/* Todo 삭제 버튼 영역 */}
                                        <button onClick={(e) => {
                                            e.stopPropagation();
                                            onDeleteTodo(year, month, day, category.category_id, todo.todo_id)
                                        }} className="items-start w-4 h-4 rounded-full bg-rose-400 border border-rose-300 hover:bg-rose-500 shrink-0"></button>
                                        
                                        {/* Todo 내용 영역 */}
                                        <div className="w-1/1 flex flex-col gap-1 mb-4">
                                            <span className={"text-lg text-slate-white font-bold"}>{todo.content}</span>
                                        </div>
                                    </div>
                                )
                            })}

                            {isAddingTodo === category.category_id ? (
                                <div className="bg-slate-800 border border-dashed border-slate-600 rounded-2xl p-3 flex items-center justify-center">
                                    
                                    {/* Todo 신규 생성용 컴포넌트 */}
                                    <input
                                        type="text"
                                        autoFocus
                                        value={newTodoContent}
                                        onChange={(e) => setNewTodoContent(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.nativeEvent.isComposing) return;
                                            if(e.key === "Enter") handleTodoCreateSubmit(category.category_id);
                                            if(e.key === "Escape") setIsAddingTodo(null);
                                        }}
                                        placeholder="할일을 입력하세요."
                                        className="bg-slate-900 text-slate-100 px-3 py-1.5 rounded-xl text-sm border border-slate-700 outline-none w-full text-center"
                                    />
                                </div>
                            ) : (
                                <div onClick={() => {
                                    //Todo 신규 생성 컴포넌트 로직
                                    setIsAddingTodo(category.category_id)
                                    }}
                                    className="bg-slate-800/30 hover:bg-slate-800/60 border border-dashed border-slate-700 hover:border-slate-500 rounded-2xl p-3 flex items-center justify-center cursor-pointer transition-all text-slate-400 text0sm font-medium">
                                    새 할일 추가
                                </div>
                            )}
                        </div>
                    ))}
                {isAddingCategory ? (
                    <div className="bg-slate-800 border border-dashed border-slate-600 rounded-2xl p-3 flex items-center justify-center">

                        {/* Category 신규 생성용 컴포넌트 */}
                        <input
                            type="text"
                            autoFocus
                            value={newCategoryTitle}
                            onChange={(e)=>setNewCategoryTitle(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.nativeEvent.isComposing) return;
                                if(e.key === "Enter") handleCategoryCreateSubmit();
                                if(e.key === "Escape") setIsAddingCategory(false);
                            }}
                            placeholder="카테고리명을 입력하세요."
                            className="bg-slate-900 text-slate-100 px-3 py-1.5 rounded-xl text-sm border border-slate-700 outline-none w-full text-center"
                        />
                    </div>
                ) : (
                    //카테고리 신규 생성 컴포넌트 로직
                    <div onClick={() => setIsAddingCategory(true)} className="bg-slate-800/30 hover:bg-slate-800/60 border border-dashed border-slate-700 hover:border-slate-500 rounded-2xl p-3 flex items-center justify-center cursor-pointer transition-all text-slate-400 text-sm font-medium">
                    새 카테고리 추가
                    </div>
                )}
                </div>
            
                {/* Modal 닫기 버튼 영역 */}
                <button onClick={onClose} className="bg-rose-400 border border-slate-700 hover:bg-rose-500">닫기</button>
            </div>
        </div>
    );
}