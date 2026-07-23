import { useState } from "react";

type LoginPageProps = {
    onLogin: (userId: string) => void;
};

const LoginPage = ({ onLogin }: LoginPageProps) => {
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!userId.trim() || !password.trim()) {
            setErrorMessage("아이디와 비밀번호를 입력해주세요.");
            return;
        }

        setErrorMessage("");
        onLogin(userId.trim());
    };

    return (
        <main className="login-shell">
            <section className="login-panel">
                <div className="login-hero">
                    <p className="login-eyebrow">창고 운영</p>
                    <h1>메디로지틱스 배달관리 시스템</h1>
                    <p>창고재고관리 시스템에 로그인하세요.</p>
                </div>

                <form className="login-form" onSubmit={handleSubmit}>
                    <label className="login-field">
                        <span>아이디</span>
                        <input
                            type="text"
                            value={userId}
                            onChange={(event) => setUserId(event.target.value)}
                            placeholder="아이디를 입력하세요"
                            autoComplete="username"
                        />
                    </label>

                    <label className="login-field">
                        <span>비밀번호</span>
                        <input
                            type="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            placeholder="비밀번호를 입력하세요"
                            autoComplete="current-password"
                        />
                    </label>

                    {errorMessage ? <p className="login-error">{errorMessage}</p> : null}

                    <button type="submit" className="login-button">
                        로그인
                    </button>
                </form>
            </section>
        </main>
    );
};

export default LoginPage;
