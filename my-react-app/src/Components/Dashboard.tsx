import { useContext } from "react";
import { AuthContext } from "./AuthContext";

function Dashboard() {
    const authCtx = useContext(AuthContext);

    return (
        <>
            <div>Dashboard</div>
            <div>Welcome {authCtx.user?.username}!</div>
        </>
    )
}

export default Dashboard;