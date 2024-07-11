import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './Components/AuthContext'
import LoginWindow from './Components/LoginWindow'
import RegistrationWindow from './Components/RegistrationWindow'
import Dashboard from './Components/Dashboard'
import './App.css'
import './Components/LoginWindow'

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
