import { useNavigate } from 'react-router-dom';
import { useSignup } from '../hooks/useSignup';

export default function SignupPage() {
    //Signup 페이지 Hook
    const {
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
    } = useSignup();

    //Navigate 객체
    const navigate = useNavigate();

    //Login 페이지 이동
    const RouteLoginPage = async (e) => {
        //추가적인 새로고침 방지
        e.preventDefault();

        //LoginPage 로 이동
        navigate("/");
    }

    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center">

            {/* 전체 컨테이너 */}
            <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-lg gap 6">

                {/* 회원가입 Form 컨테이너 */}
                <form onSubmit={handleSignup} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">

                        {/* 이메일 입력 컨테이너 */}
                        <label className="text-sm text-slate-400 font-medium">이메일</label>
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="이메일을 입력하세요"
                            className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-emerald-500 text-sm"
                        >
                        </input>

                        {/* 비밀번호 입력 컨테이너 */}
                        <label className="text-sm text-slate-400 font-medium">비밀번호</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="비밀번호를 입력하세요"
                            className={`bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 ${
                                isFormValid
                                ? 'focus:outline-none focus:border-emerald-500 text-sm'
                                : 'focus:outline-none focus:border-rose-500 text-sm'
                            }`}
                        >
                        </input>

                        {/* 비밀번호 재확인 컨테이너 */}
                        <label className="text-sm text-slate-400 font-medium">비밀번호 재확인</label>
                        <input
                            type="password"
                            value={checkPassword}
                            onChange={(e) => {
                                setCheckPassword(e.target.value) 
                            }}
                            onBlur={(e) => {
                                validatePassword(e.target.value)
                            }}
                            placeholder="비밀번호를 다시 입력하세요"
                            className={`bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 ${
                                isFormValid
                                ? 'focus:outline-none focus:border-emerald-500 text-sm'
                                : 'focus:outline-none focus:border-rose-500 text-sm'
                            }`}
                        >
                        </input>

                        {/* 회원가입 버튼 컨테이너 */}
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

                {/* 로그인 페이지 이동 버튼 컨테이너 */}
                <form onSubmit={RouteLoginPage} className="flex flex-col">
                    <button
                        type="submit"
                        className={'text-slate-300 py-3 rounded-xl text-sm font-semibold mt-2 cursor-pointer border border-slate-800 bg-slate-800 hover:bg-emerald-500 transition-colors'}
                    >
                    로그인 페이지로 돌아가기
                    </button>
                </form>
            </div>
        </div>
    )
}