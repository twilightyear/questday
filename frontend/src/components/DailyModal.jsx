import React, { useState, useEffect } from 'react';

export default function DailyModal({ calendarData, selectedDate, onClose , onDeleteTodo, onDeleteCategory, onCreateCategory, onCreateTodo, onUpdateTodoIsDone}) {
    const [ newCategoryTitle, setNewCategoryTitle ] = useState("");

    const [ newTodoTitle, setNewTodoTitle ] = useState("");
    const [ newTodoContent, setNewTodoContent ] = useState("");

    const [ isAddingTodo, setIsAddingTodo ] = useState(null);
    const [ isAddingCategory, setIsAddingCategory ] = useState(false);

    const { year, month, day } = selectedDate;

    const targetYearData = calendarData.find((item) => item.year === year);
    const targetDailyData = targetYearData ? targetYearData.dailies.find((daily) => daily.month === month && daily.day === day) : null;

    //Modal 내부 카테고리 생성 로직
    const handleCategoryCreateSubmit = () => {
        if (!newCategoryTitle.trim()) {
            setIsAddingCategory(false);
            setNewCategoryTitle("");
            return;
        }

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
        if (!newTodoContent.trim()) {
            setIsAddingTodo(null);
            setNewTodoTitle("");
            setNewTodoContent("");
            return;
        }

        const todoBody = {
            title : "Test",
            content : newTodoContent,
            is_done : false
        }
        
        onCreateTodo(year, month, day, categoryId, todoBody);
        setIsAddingTodo(null);
        setNewTodoTitle("");
        setNewTodoContent("");
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-slate-900 border border-slate-800 w-full max-w-3xl rounded-2xl p-6 shadow-2xl flex flex-col max-h-[80vh] max-w-[80vh] overflow-y-auto ">
                <span className="text-slate-300 text-lg font-bold">{year} - {month} - {day}</span>
                <div className="grid grid-cols-2 gap-4 my-4">
                {   
                    targetDailyData?.categories?.map((category, category_idx) => (
                        <div key={category_idx} className="p-3 b-3  bg-slate-800 rounded-2xl flex flex-col gap-1 mb-5 flex">
                            <div className="w-full px-3 py-1 flex justify-between items-center bg-slate-700 rounded-2xl">
                                <span className="bg-slate-700 rounded-2xl">{category.title}</span>
                                <button onClick={() => onDeleteCategory(year, month, day, category.category_id)} className="w-4 h-4 rounded-full bg-rose-400 border border-slate-700 hover:bg-rose-500"></button>
                            </div>

                            {category.todos?.map((todo, todo_idx) => {
                                return (
                                    <div onClick={() => onUpdateTodoIsDone(year, month, day, category.category_id, todo.todo_id)} 
                                    key={todo_idx} 
                                    className={`rounded-2xl border p-2 flex m-2 justify-between items-center items-end cursor-pointer transition-colors flex-col ${todo.is_done ? "bg-emerald-500 border-emerald-400 hover:bg-emerald-700 hover:border-emerald-700" : "bg-slate-800 border-slate-600 hover:bg-slate-700"}`}>
                                        
                                        <button onClick={(e) => {
                                            e.stopPropagation();
                                            onDeleteTodo(year, month, day, category.category_id, todo.todo_id)
                                        }} className="items-start w-4 h-4 rounded-full bg-rose-400 border border-rose-300 hover:bg-rose-500 shrink-0"></button>
                                        <div className="w-1/1 flex flex-col gap-1 mb-4">
                                            <span className={"text-lg text-slate-white font-bold"}>{todo.content}</span>
                                        </div>
                                    </div>
                                )
                            })}

                            {isAddingTodo  === category.category_id ? (
                                <div className="bg-slate-800 border border-dashed border-slate-600 rounded-2xl p-3 flex items-center justify-center">
                                    <input
                                        type="text"
                                        autoFocus
                                        value={newTodoContent}
                                        onChange={(e) => setNewTodoContent(e.target.value)}
                                        onKeyDown={(e) => {
                                            if(e.key === "Enter") handleTodoCreateSubmit(category.category_id);
                                            if(e.key === "Escape") setIsAddingTodo(null);
                                        }}
                                        onBlur={handleTodoCreateSubmit}
                                        placeholder = "할일을 입력하세요."
                                        className="bg-slate-900 text-slate-100 px-3 py-1.5 rounded-xl text-sm border border-slate-700 outline-none w-full text-center"
                                    />
                                </div>
                            ) : (
                                <div onClick={() => {
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
                        <input
                            type="text"
                            autoFocus
                            value={newCategoryTitle}
                            onChange={(e) => setNewCategoryTitle(e.target.value)}
                            onKeyDown={(e) => {
                                if(e.key === "Enter") handleCategoryCreateSubmit();
                                if(e.key === "Escape") setIsAddingCategory(false);
                            }}
                            onBlur={handleCategoryCreateSubmit}
                            placeholder = "카테고리명을 입력하세요."
                            className="bg-slate-900 text-slate-100 px-3 py-1.5 rounded-xl text-sm border border-slate-700 outline-none w-full text-center"
                        />
                    </div>
                ) : (
                    <div onClick={() => setIsAddingCategory(true)} className="bg-slate-800/30 hover:bg-slate-800/60 border border-dashed border-slate-700 hover:border-slate-500 rounded-2xl p-3 flex items-center justify-center cursor-pointer transition-all text-slate-400 text-sm font-medium">
                    새 카테고리 추가
                    </div>
                )}
                </div>
            <button onClick={onClose} className="bg-rose-400 border border-slate-700 hover:bg-rose-500">닫기</button>
            </div>
        </div>
    );
}