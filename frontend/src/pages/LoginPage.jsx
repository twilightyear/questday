import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userLogin } from '../apis/userApi';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const isFormValid = email.trim() !== '' && password.trim() !== '';

  const handleSignup = async (e) => {
    e.preventDefault();
    navigate("/signup");
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    try {
      const userData = {
        email : email,
        password : password
      }

      const response = await userLogin(userData);

      console.log("로그인 성공:", response.data);
      navigate("/main");
      
    } catch (error) {
      console.error("로그인 실패:", error);
      alert("로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-lg flex flex-col gap-6">
        <span className="text-4xl bg-slate-800 border border-slate-700 rounded-2xl p-6 text-slate-100 font-bold text-center">QuestDay</span>
        
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-slate-400 font-medium">이메일</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="아이디를 입력하세요"
              className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-emerald-500 text-sm"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-slate-400 font-medium">비밀번호</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력하세요"
              className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-emerald-500 text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={!isFormValid}
            className={`w-full py-3 rounded-xl text-sm font-semibold transition-colors mt-2 ${
              isFormValid
                ? 'bg-emerald-500 hover:bg-emerald-600 text-white cursor-pointer'
                : 'bg-slate-800/50 border border-slate-800 text-slate-500 cursor-not-allowed'
            }`}
          >
            로그인하기
          </button>
        </form>
        <form onSubmit={handleSignup} className="flex flex-col">
          <button
            type="submit"
            className={'text-slate-300 py-3 rounded-xl text-sm font-semibold mt-2 cursor-pointer border border-slate-800 bg-slate-600 hover:bg-emerald-500 transition-colors'}
          >회원가입</button>
        </form>
        
      </div>
    </div>
  );
}