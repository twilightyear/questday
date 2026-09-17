import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userLogin } from '../apis/userApi';
import { getCurrentYear } from '../utils/util_functions';
import { getCalendar, createCalendar  } from '../apis/calendarApi';

//LoginPage Hook
export function useLogin() {
    //UseState 정의부
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [currentYear, setCurrentYear] = useState(null);

    //페이지 로딩시 호출부 (useEffect)
    useEffect(() => {
        //현재 연도 useState 사용하여 저장
        setCurrentYear(getCurrentYear());
    });

    //Navigate 객체
    const navigate = useNavigate();

    //Email 칸과 Password 칸이 비어있지 않은지 확인
    const isFormValid = email.trim() !== '' && password.trim() !== '';

    //Calendar 존재 확인 Handler
    const handleCheckCalendarExist = async () => {
        try {
            await getCalendar(currentYear);
            return;
        } catch (err) {
            //만약 Calendar 가 존재하지 않는다면 생성
            if (err.response && err.response.status === 404){
                await handleCreateCalendar();
            } else {
                console.error("[ handleCheckCalendarExist Exception ] : ", err);
            }
        }
    };

    //Calendar 생성 Handler
    const handleCreateCalendar = async () => {
        try {
            const yearData = {
                    year : currentYear
            }
            
            await createCalendar(yearData);
        } catch (err) {
            console.error("[ handleCreateCalendar Exception ] : ", err);
        }
    }


    //로그인 Handler
    const handleLogin = async (e) => {

        //새로고침 방지
        e.preventDefault();

        //Email 칸과 Password 칸에 전부 값이 채워져있지 않다면 복귀
        if (!isFormValid) return;

        try {
            const userData = {
                email : email,
                password : password
            }

            const response = await userLogin(userData);

            //MainPage 로 이동 전, Calendar 존재여부 확인
            await handleCheckCalendarExist();

            //MainPage 이동
            navigate("/main");
        
        } catch (err) {
            console.error("[ fetchCalendarData Exception ] : ", error);
            alert("로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.");
        }
    };

	//구조 분해 할당 반환부
    return {
        email,
        password,
        isFormValid,
        setEmail,
        setPassword,
        handleLogin
    };
}