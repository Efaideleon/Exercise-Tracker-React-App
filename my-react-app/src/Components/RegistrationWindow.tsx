import { FormEvent, useState } from "react";
import axios from "axios";

function RegistrationWindow() {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        setErrorMessage('');

        try {
            const response = await axios.post('http://localhost:5001/api/register', {
                username,
                password,
            });

            console.log("Registration Successful", response.data);
        } catch (error) {
            setErrorMessage("Registration Failed");
            console.error("Registration Error", error)
        }
    };

    return (
        <div className="registration-container">
            <h2>Register</h2>
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
                <button type="submit">Register</button>
            </form>
        </div>
    )
}

export default RegistrationWindow;