import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const authCtx = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        authCtx.logout();
        navigate('/login');
    }
    
    return (
        <>
            <div>Dashboard</div>
            <div>Welcome {authCtx.user?.username}!</div>
            <button onClick={handleLogout}>Logout</button>
        </>
    )
}

export default Dashboard;