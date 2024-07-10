import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import './Components/LoginWindow'
import LoginWindow from './Components/LoginWindow'
import RegistrationWindow from './Components/RegistrationWindow'
import Dashboard from './Components/Dashboard'
import { useState } from 'react'

function App() {
  const [loggedInUsername, setLoggedInUsername] = useState<string>('')

  const handleLoginSuccess = (username: string) => {
    setLoggedInUsername(username);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginWindow onLoginSuccess={handleLoginSuccess}/>} />
        <Route path='/register' element={<RegistrationWindow />} />
        <Route path='/dashboard' element={<Dashboard username={loggedInUsername}/>} />
        <Route path='*' element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
