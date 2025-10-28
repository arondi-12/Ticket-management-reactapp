import { Routes, Route, Navigate } from 'react-router-dom'
import LandingPage from './Components/LandingPage'
import Login from './Components/Login'
import Signup from './Components/SignUp'
import Dashboard from './Components/Dashboard'
import Tickets from './Components/Tickets'
import TicketForm from './Components/TicketsForm'
import ProtectedRoute from './Components/ProtectedRoute'
import ToastContainer, { useToast } from './Components/Toast'
import { isAuthenticated } from './Services/authServices'

function App() {
  const { toasts, removeToast, showSuccess, showError, showWarning, showInfo } = useToast();

  const showToast = (message, type = 'success') => {
    switch (type) {
      case 'success':
        showSuccess(message);
        break;
      case 'error':
        showError(message);
        break;
      case 'warning':
        showWarning(message);
        break;
      case 'info':
        showInfo(message);
        break;
      default:
        showSuccess(message);
    }
  };

  return (
      <div className="app-container">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route 
            path="/login" 
            element={
              isAuthenticated() ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Login showToast={showToast} />
              )
            } 
          />
          <Route 
            path="/signup" 
            element={
              isAuthenticated() ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Signup showToast={showToast} />
              )
            } 
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard showToast={showToast} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tickets"
            element={
              <ProtectedRoute>
                <Tickets showToast={showToast} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tickets/new"
            element={
              <ProtectedRoute>
                <TicketForm showToast={showToast} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tickets/edit/:id"
            element={
              <ProtectedRoute>
                <TicketForm showToast={showToast} />
              </ProtectedRoute>
            }
          />
          {/* Redirect /register to /signup for consistency */}
          <Route path="/register" element={<Navigate to="/signup" replace />} />
          {/* 404 redirect to landing page */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <ToastContainer toasts={toasts} removeToast={removeToast} />
      </div>
  )
}

export default App