import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userSignup } from '../apis/userApi';
import { createCalendar } from '../apis/calendarApi';
import { getCurrentYear } from '../utils/util_functions';

export default function SignupPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [checkPassword, setCheckPassword] = useState('');

    const navigate = useNavigate();

    const isFormValid = email.trim() !== '' && password.trim() !== '' && checkPassword.trim() !== '';
    const isPasswordValid = checkPassword === password;
    const checkPasswordHandler = async() => {
        if(checkPassword === password){
            return true;
        } else {
            setPassword('');
            setCheckPassword('');
        }
    }

    const handleCreateCalendar = async () => {
        try {
            const yearData = {
                year : getCurrentYear()
            }
            await createCalendar(yearData);
            } catch (err){
                console.log(err);
            }
        };

    const handleSignup = async (e) => {
        e.preventDefault();
        if (!isFormValid || !isPasswordValid) return;

        try {
            const userData = {
            email : email,
            password : password
        }

        const response = await userSignup(userData);

        console.log("회원가입 성공:", response.data);
        navigate("/");
      
        } catch (error) {
            console.error("회원가입 실패:", error);
            alert("회원가입에 실패했습니다. 아이디와 비밀번호를 확인해주세요.");
        }
    };

    const RouteLoginPage = async (e) => {
        e.preventDefault();
        navigate("/");
    }

    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center">
            <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-lg gap 6">
                <form onSubmit={handleSignup} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm text-slate-400 font-medium">이메일</label>
                        <input
                            type = "text"
                            value = {email}
                            onChange = {(e) => setEmail(e.target.value)}
                            placeholder = "이메일을 입력하세요"
                            className = "bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-emerald-500 text-sm"
                        >
                        </input>
                        <label className="text-sm text-slate-400 font-medium">비밀번호</label>
                        <input
                            type = "password"
                            value = {password}
                            onChange = {(e) => setPassword(e.target.value)}
                            placeholder = "비밀번호를 입력하세요"
                            className = {`bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 ${
                                isFormValid
                                ? 'focus:outline-none focus:border-emerald-500 text-sm'
                                : 'focus:outline-none focus:border-rose-500 text-sm'
                            }`}
                        >
                        </input>
                        <label className="text-sm text-slate-400 font-medium">비밀번호 재확인</label>
                        <input
                            type = "password"
                            value = {checkPassword}
                            onChange = {(e) => {
                                setCheckPassword(e.target.value)
                            }}
                            onBlur = {(e) => {
                                checkPasswordHandler(e.target.value)
                            }}
                            placeholder = "비밀번호를 다시 입력하세요"
                            className = {`bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 ${
                                isFormValid
                                ? 'focus:outline-none focus:border-emerald-500 text-sm'
                                : 'focus:outline-none focus:border-rose-500 text-sm'
                            }`}
                        >
                        </input>
                        <button
                            type="submit"
                            disabled={!isFormValid}
                            className={`w-full py-3 rounded-xl text-sm font-semibold transition-colors mt-2 ${
                                isFormValid && isPasswordValid
                                ? 'bg-emerald-500 hover:bg-emerald-600 text-white cursor-pointer'
                                : 'bg-slate-800/50 border border-slate-800 text-slate-500 cursor-not-allowed'
                            }`}
                        >
                        회원가입
                        </button>
                    </div>
                </form>
            <form onSubmit={RouteLoginPage} className="flex flex-col">
            <button
                type="submit"
                className={'text-slate-300 py-3 rounded-xl text-sm font-semibold mt-2 cursor-pointer border border-slate-800 bg-slate-800 hover:bg-emerald-500 transition-colors'}
            >로그인 페이지로 돌아가기</button>
            </form>
            </div>
        </div>
    )
}