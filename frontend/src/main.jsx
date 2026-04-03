import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import UrbanContextProvider from './context/urbanContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <UrbanContextProvider>
      <App />
    </UrbanContextProvider>
  </BrowserRouter>,
)