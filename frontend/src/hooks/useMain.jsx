import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createCalendar, getCalendars } from '../apis/calendarApi';
import { deleteTodo, createTodo, updateTodo } from '../apis/todoApi';
import { deleteCategory, createCategory } from '../apis/categoryApi';
import { createDaily } from '../apis/dailyApi';
import { getUserPoint, getUserXp } from '../apis/userApi'
import { userLogout } from '../apis/userApi';
import { useNavigate } from 'react-router-dom';

//hook 마저 끝내야함!
export function useMain() {
    const [calendarData, setCalendarData] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
	const [currentXp, setCurrentXp] = useState(0);
	const [currentPoint, setCurrentPoint] = useState(0);
	const [currentLevel, setCurrentLevel] = useState(0);
	const [currentPercentage, setCurrentPercentage] = useState(0);

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
		handleGetPoint();
		handleGetXp();
    }, []);

	const handleGetPoint = async () => {
		try {
			const response = await getUserPoint();
			setCurrentPoint(response.data);
		} catch (err) {
			console.log(err);
		}
	}

	const handleGetXp = async () => {
		try {
			const response = await getUserXp();
			setCurrentXp(response);
			setCurrentLevel(Math.floor(response / 100));
			setCurrentPercentage(response % 100);

		} catch (err) {
			console.log(err);
		}
	}

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
	};

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
			handleGetPoint();
			handleGetXp();
		} catch (err){
			console.log(err);
		}
    };

    return {
		calendarData,
		setCalendarData,
    	selectedDate,
		setSelectedDate,
		fetchCalendarData,
		handleDeleteTodo,
		handleDeleteCategory,
		handleUserLogout,
		handleCreateCategory,
		handleCreateTodo,
		handleUpdateTodoIsDone,
		currentLevel,
		currentPoint,
		currentPercentage
    };
}