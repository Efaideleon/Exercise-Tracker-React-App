import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './Components/AuthContext'
import LoginWindow from './Components/login_window/LoginWindow'
import RegistrationWindow from './Components/register_window/RegistrationWindow'
import Dashboard from './Components/dashboard/Dashboard'
import './App.css'
import './Components/login_window/LoginWindow'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<LoginWindow />} />
          <Route path='/register' element={<RegistrationWindow />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='*' element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
