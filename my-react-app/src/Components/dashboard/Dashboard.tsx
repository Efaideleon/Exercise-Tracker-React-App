import { FormEvent, useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import { v4 } from "uuid";
import "./DashboardStyles.css"

type exerciseData = {
    exercise: string
    time: string
}

function Dashboard() {
    const [time, setTime] = useState<string>('');
    const [exercise, setExercise] = useState<string>('');
    const [exercises, setExercises] = useState<exerciseData[]>([]);
    const authCtx = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        authCtx.fetchData();
        fetchExercises();
    }, []);

    const handleLogout = async () => {
        authCtx.logout();
        navigate('/login');
    }

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:5001/api/add-exercise', { exercise, time }, {
                withCredentials: true,
            });

            if (response.status === 201) {
                console.log("Added Successfully");
                setExercise('');
                setTime('');
                fetchExercises();
            } else {
                console.log("Something went wrong while adding exercise");
            }
        } catch (error) {
            console.error("Error adding exerice event: ", error);
        }
    }

    const fetchExercises = async () => {
        try {
            const response = await axios.get('http://localhost:5001/api/exercises', {
                withCredentials: true,
            });

            if (response.status === 200) {
                console.log("exercies reponse data: ", response.data);
                console.log("Fetched exercises successfull");
                setExercises(response.data);
            } else {
                console.error("Failed fetched exercises");
            }
        } catch (error) {
            console.log("Error while fetching exercises", error)
        }
    }

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <div>Dashboard</div>
                <div>Welcome {authCtx.user?.username}!</div>
                <button onClick={handleLogout}>Logout</button>
            </div>
            <form onSubmit={handleSubmit} className="exercise-form">
                <div>
                    <label htmlFor="exercise">Exercise:</label>
                    <input
                        type="text"
                        id="exercise"
                        value={exercise}
                        onChange={(e) => setExercise(e.target.value)}
                    >
                    </input>
                </div>
                <div>
                    <label htmlFor="time">Time:</label>
                    <input
                        type="text"
                        id="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                    >
                    </input>
                </div>
                <button type="submit">Add</button>
            </form>

            <div className="exercise-list">
                <h2>Your Exercises</h2>
                <ul>
                    {exercises.map((exercise) => (
                        <li key={v4()}>
                            {exercise.exercise} - {exercise.time}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Dashboard;