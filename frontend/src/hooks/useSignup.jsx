import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userSignup } from '../apis/userApi';

export function useSignup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [checkPassword, setCheckPassword] = useState('');

    const navigate = useNavigate();

    //모든 칸이 공백이 아닌지 확인
    const isFormValid = email.trim() !== '' && password.trim() !== '' && checkPassword.trim() !== '';

    //패스워드가 검증 부분과 동일한지 확인
    const isPasswordValid = checkPassword === password;

    const checkPasswordHandler = async() => {
        if(checkPassword === password){
            return true;
        } else {
            setPassword('');
            setCheckPassword('');
        }
    }

    //회원가입 로직 (성공 이후 로그인 페이지로 이동)
    const handleSignup = async (e) => {
        e.preventDefault();
        if (!isFormValid || !isPasswordValid) return;

        try {
            const userData = {
            email : email,
            password : password
        }

        const response = await userSignup(userData);

        navigate("/");
      
        } catch (error) {
            alert("회원가입에 실패했습니다. 아이디와 비밀번호를 확인해주세요.");
        }
    };

    return {
        isFormValid,
        isPasswordValid,
        checkPasswordHandler,
        handleSignup,
        email,
        setEmail,
        password,
        setPassword,
        checkPassword,
        setCheckPassword
    }
}