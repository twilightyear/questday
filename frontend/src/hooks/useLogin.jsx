import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userLogin } from '../apis/userApi';
import { getCurrentYear } from '../utils/util_functions';
import { getCalendar, createCalendar  } from '../apis/calendarApi';

export function useLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  //Email 칸과 Password 칸이 비어있지 않은지 확인
  const isFormValid = email.trim() !== '' && password.trim() !== '';

  //로그인 이전, Calendar 가 존재하는지 확인 (없다면 생성)
  const checkCalendar = async () => {
    try {
      await getCalendar(getCurrentYear());
      return;
    } catch (err) {
      if (err.response && err.response.status === 404){
        const yearData = {
          year : getCurrentYear()
        }
        await createCalendar(yearData);
        return;
      } else {
        console.log(err);
      }
    }
  };


  //로그인 시도
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    try {
      const userData = {
        email : email,
        password : password
      }

      const response = await userLogin(userData);
      await checkCalendar()
      navigate("/main");
      
    } catch (err) {
      console.error(err);
      alert("로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.");
    }
  };

  return {
    email,
    password,
    isFormValid,
    setEmail,
    setPassword,
    handleLogin
  };
}