import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userSignup } from '../apis/userApi';

//SignupPage Hook
export function useSignup() {
    //UseState 정의부
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [checkPassword, setCheckPassword] = useState('');

    //Navigate 객체
    const navigate = useNavigate();

    //모든 칸이 공백이 아닌지 확인
    const isFormValid = email.trim() !== '' && password.trim() !== '' && checkPassword.trim() !== '';

    //패스워드가 검증 부분과 동일한지 확인
    const isPasswordValid = checkPassword === password;

    //패스워드와 패스워드 확인칸의 값이 같은지 확인 Handler
    const validatePassword = async() => {
        if(checkPassword === password){
            return true;
        } else {
            setPassword('');
            setCheckPassword('');
        }
    }

    //회원가입 Handler
    const handleSignup = async (e) => {


        //모든 칸이 채워져있는지와, 패스워드와 패스워드 확인칸의 값이 같은지 확인
        if (!isFormValid || !isPasswordValid) return;
        
        try {
            const userData = {
            email : email,
            password : password
        }

        const response = await userSignup(userData);

        //추가적인 새로고침 방지
        e.preventDefault();

        //성공시 Login 페이지로 이동
        navigate("/");
      
        } catch (error) {
            alert("회원가입에 실패했습니다. 아이디와 비밀번호를 확인해주세요.");
        }
    };

    //구조 분해 할당 반환부
    return {
        isFormValid,
        isPasswordValid,
        validatePassword,
        handleSignup,
        email,
        setEmail,
        password,
        setPassword,
        checkPassword,
        setCheckPassword
    }
}