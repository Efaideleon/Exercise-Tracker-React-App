import { FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom";
import axios from "axios"

interface LoginWindowProps {
    onLoginSuccess: (arg0: string) => void;
}

function LoginWindow(props: LoginWindowProps) {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const navigate = useNavigate();

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        setErrorMessage('');

        try {
            const response = await axios.post('http://localhost:5001/api/login', {
                username,
                password,
            });

            localStorage.setItem('token', response.data.token);
            console.log("logged in", response.data);
            props.onLoginSuccess(username)
            navigate('/dashboard')
        } catch (error) {
            setErrorMessage("Login Failed");
            console.error("Login Error", error)
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
        </div>
    )
}

export default LoginWindow;