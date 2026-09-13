import { useNavigate } from 'react-router-dom';
import { useLogin } from '../hooks/useLogin';

export default function LoginPage() {

  //Login 페이지 Hook
  const {
    email,
    password,
    isFormValid,
    setEmail,
    setPassword,
    handleLogin,
  } = useLogin();

  const navigate = useNavigate();

  //Signup 페이지 이동
  const handleSignup = async (e) => {
    e.preventDefault();
    navigate("/signup");
  }

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