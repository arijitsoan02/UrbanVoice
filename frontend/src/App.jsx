import React from 'react'
import { ToastContainer, toast } from 'react-toastify'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Problems from './pages/Problems'
import Login from './pages/Login'
import Footer from './components/Footer'
import CreateProblem from './pages/CreateProblem'
import ProblemDetails from './pages/ProblemDetails'
import Myproblems from './pages/Myproblems'
import Donation from './pages/Donation'

const App = () => {
  return (
    <>
      <Navbar />
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/problems' element={<Problems />} />
        <Route path='/create' element={<CreateProblem />} />
        <Route path='/problems/:id' element={<ProblemDetails />} />
        <Route path='/myproblem' element={<Myproblems/>} />
        <Route path='/donation' element={<Donation/>} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
