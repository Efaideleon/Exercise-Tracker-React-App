import { FormEvent, useState } from "react"
import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../AuthContext";
import "./LoginWindowStyles.css"

function LoginWindow() {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const navigate = useNavigate();
    const authCtx = useContext(AuthContext)

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        setErrorMessage('');

        const loggedInUser = { username, password }

        if (await authCtx.login(loggedInUser)) {
            navigate('/dashboard')
        } else {
            setErrorMessage("Login Failed");
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    >
                    </input>
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    >
                    </input>
                </div>
                <button type="submit">Login</button>
            </form>
            <Link to="/register">Create Account</Link>
        </div>
    )
}

export default LoginWindow;