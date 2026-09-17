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
        handleLogin
    } = useLogin();

    //Navigate 객체
    const navigate = useNavigate();

    //Signup 페이지 이동
    const handleSignup = async (e) => {
        //추가적인 새로고침 방지
        e.preventDefault();

        //Signup 페이지로 이동
        navigate("/signup");
    }

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6">

            {/* 전체 컨테이너 */}
            <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-lg flex flex-col gap-6">

                {/* 대문 타이틀 컨테이너 */}
                <span className="text-4xl bg-slate-800 border border-slate-700 rounded-2xl p-6 text-slate-100 font-bold text-center">QuestDay</span>

                {/* 로그인 Form 컨테이너 */}
                <form onSubmit={handleLogin} className="flex flex-col gap-4">

                    {/* 이메일 입력 컨테이너 */}
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

                    {/* 비밀번호 입력 컨테이너 */}
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

                    {/* 로그인 버튼 컨테이너 */}
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

                {/* 회원가입 페이지 이동 버튼 컨테이너 */}
                <form onSubmit={handleSignup} className="flex flex-col">
                    <button
                        type="submit"
                        className={'text-slate-300 py-3 rounded-xl text-sm font-semibold mt-2 cursor-pointer border border-slate-800 bg-slate-600 hover:bg-emerald-500 transition-colors'}
                    >
                    회원가입
                    </button>
                </form>
            </div>
        </div>
    );
}