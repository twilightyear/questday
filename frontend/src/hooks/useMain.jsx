import { useState, useEffect } from 'react';
import { createCalendar, getCalendars } from '../apis/calendarApi';
import { deleteTodo, createTodo, updateTodo } from '../apis/todoApi';
import { deleteCategory, createCategory } from '../apis/categoryApi';
import { createDaily } from '../apis/dailyApi';
import { userLogout, getUserData } from '../apis/userApi'
import { useNavigate } from 'react-router-dom';

//MainPage Hook
export function useMain() {
	//UseState 정의부
    const [calendarData, setCalendarData] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
	const [currentXp, setCurrentXp] = useState(0);
	const [currentPoint, setCurrentPoint] = useState(0);
	const [currentLevel, setCurrentLevel] = useState(0);
	const [currentPercentage, setCurrentPercentage] = useState(0);
	const [currentEmail, setCurrentEmail] = useState("");
	const [currentCreatedAt, setCurrentCreatedAt] = useState(null);

	//Navigate 객체
    const navigate = useNavigate();

    //Calendar 데이터 최신화 로직
    const fetchCalendarData = async () => {
      	try {
			const response = await getCalendars();

			//Calendar 정보 useState 를 통한 최신화
			setCalendarData(response);
      	} catch (err) {
        	console.error("[ fetchCalendarData Exception ] : ", err);
      	}
    };

	//페이지 로딩시 호출부 (useEffect)
    useEffect(() => {
        fetchCalendarData(); //Calendar 정보 최신화
		handleGetUserData(); //User 정보 최신화
	},[]);

	//User Data 조회 Handler
	const handleGetUserData = async () => {
		try {
			const response = await getUserData();

			//User 정보 useState 를 통한 최신화
			setCurrentPoint(response.point);
			setCurrentXp(response.xp);
			setCurrentEmail(response.email);
			setCurrentCreatedAt(response.created_at);

			//User xp 를 통한 Level 및 Percentage 연산
			setCurrentPercentage(response.xp % 100);
			setCurrentLevel(Math.floor(response.xp / 100));
		} catch (err) {
			console.log("[ handleGetUserData Exception ] : ", err);
		}
	}

	//Todo 생성 Handler
	const handleCreateTodo = async (year, month, day, categoryId, body) => {
        try {
            await createTodo(year, month, day, categoryId, body);

			//Calendar 정보 최신화
            fetchCalendarData();
        } catch (err){
            console.log("[ handleCreateTodo Exception ] : ", err);
        }
	};

	//Todo 삭제 Handler
    const handleDeleteTodo = async (year, month, day, categoryId, todoId) => {
		try {
			await deleteTodo(year, month, day, categoryId, todoId);

			//Calendar 정보 최신화
			fetchCalendarData();
		} catch (err){
			console.log("[ handleDeleteTodo Exception ] : ", err);
		}
    };

	//Category 삭제 Handler
    const handleDeleteCategory = async (year, month, day, categoryId) => {
		try {
			await deleteCategory(year, month, day, categoryId);

			//Calendar 정보 최신화
			fetchCalendarData();
		} catch (err){
			console.log("[ handleDeleteCategory Exception ] : ", err);
		}
    };

	//Category 생성 Handler
    const handleCreateCategory = async (year, month, day, body) => {
      	try {

			//calendarData 를 통한 Target Year 데이터 추출
			const targetYearData = calendarData.find((item) => item.year === year);

			//Target Year 가 없는 경우 해당 Year 생성
			if(!targetYearData){
				const yearData = {
					year: year
				}

				try {
					await createCalendar(yearData);
				} catch(err){
					console.log("[ handleCreateCategory createCalendar Exception ] : ", err);
				}
			}

			//calendarData 의 targetYearData 를 통한 Target Daily 데이터 추출
			const targetDailyData = targetYearData?.dailies.find((d) => d.month === month && d.day === day);

			//Target Daily 가 없는 경우 해당 Daily 생성
			if(!targetDailyData){
				try {
					const dailyData = {
						month: Number(month),
						day: Number(day)
					};

					await createDaily(year, dailyData);
				} catch(err){
					console.log("[ handleCreateCategory createDaily Exception ] : ", err);
				}
			}

			//Category 생성
			await createCategory(year, month, day, body);

			//Calendar 정보 최신화
			fetchCalendarData();
		} catch (err){
			console.log("[ handleCreateCategory Exception ] : ", err);
		}
	};

	//
	const handleToggleTodoIsDone = async (year, month, day, categoryId, todoId) => {
		try{
			//Todo Data Toggle 을 위한 targetTodo 값 조회
			const targetYear = calendarData.find((item) => item.year === year);
			const targetDaily = targetYear?.dailies.find((d) => d.month === month && d.day === day);
			const targetCategory = targetDaily?.categories.find((c) => c.category_id === categoryId);
			const targetTodo = targetCategory?.todos.find((t) => t.todo_id === todoId)

			//todoData 값 초기화
			const todoData = {
				title : targetTodo.title,
				content : targetTodo.content,
				is_done : null
			}

			//Todo is_done 토글 로직
			targetTodo.is_done ? todoData.is_done = false : todoData.is_done = true;

			//todoData 를 바탕으로 Todo 업데이트
			await updateTodo(year, month, day, categoryId, todoId, todoData);

			//Calendar 정보 최신화
			fetchCalendarData();
			
			//User 정보 최신화
			handleGetUserData();
		} catch (err){
			console.log("[ handleToggleTodoIsDone Exception ] : ", err);
		}
    };

	//User 로그아웃 Handler
    const handleUserLogout = async () => {
		try {
			await userLogout();

			//LoginPage 로 이동
			navigate("/")
		} catch (err){
			console.log("[ handleUserLogout Exception ] : ", err);
		}
    }

	//구조 분해 할당 반환부
    return {
		calendarData,
		setCalendarData,
    	selectedDate,
		setSelectedDate,
		currentXp,
		setCurrentXp,
		currentPoint,
		setCurrentPoint,
		currentLevel,
		setCurrentLevel,
		currentPercentage,
		setCurrentPercentage,
		currentEmail,
		setCurrentEmail,
		currentCreatedAt,
		setCurrentCreatedAt,
		handleUserLogout,
		handleDeleteTodo,
		handleCreateTodo,
		handleDeleteCategory,
		handleCreateCategory,
		handleToggleTodoIsDone
    };
}