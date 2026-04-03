import React, { useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Components
import Sidebar from './components/Sidebar'
import AdminNavbar from './components/AdminNavbar'

// Pages
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import AllProblems from './pages/AllProblems'
import ManageUsers from './pages/ManageUsers'
import { AdminContext } from './context/adminContext'
const App = () => {
  const { adminToken } = useContext(AdminContext)

  return (
    <div className="bg-slate-50 min-h-screen text-slate-900">
      <ToastContainer position="bottom-right" />

      {!adminToken ? (
        /* Login flow when not authenticated */
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      ) : (
        /* Protected Layout when authenticated */
        <div className="flex">
          {/* Fixed Sidebar (w-64) */}
          <Sidebar />

          {/* Main Content (Offset by ml-64 to clear the sidebar) */}
          <div className="flex-1 ml-64 min-h-screen">
            <AdminNavbar />
            
            <main className="p-8">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/all-problems" element={<AllProblems />} />
                <Route path="/users" element={<ManageUsers />} />
                
                {/* Fallback to Dashboard */}
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </main>
          </div>
        </div>
      )}
    </div>
  )
}

export default App