import { FormEvent, useState } from "react"

function LoginWindow() {
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        try {
            console.log("logged in");
        } catch (error) {
            console.log("Error");
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
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
                        type="text"
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

export default LoginWindow