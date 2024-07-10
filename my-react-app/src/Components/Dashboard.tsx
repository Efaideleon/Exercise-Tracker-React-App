interface DashboardProps {
    username: string
}

function Dashboard(props: DashboardProps) {
    return (
        <>
            <div>Dashboard</div>
            <div>Welcome {props.username}!</div>
        </>
    )
}

export default Dashboard