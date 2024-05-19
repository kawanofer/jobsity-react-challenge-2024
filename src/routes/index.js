import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import App from 'pages/App'
import Calendar from 'pages/Calendar'

export default function AppRouters() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<App />} />
        <Route exact path='/calendar' element={<Calendar />} />
      </Routes>
    </BrowserRouter>
  )
}
