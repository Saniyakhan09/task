import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Dashbored from '../auth/Dashbored'
import Auth from '../auth/Auth'
import Createtasks from '../tasks/createtask'
import Viewtasks from '../tasks/viewtasks'
const routes = () => {
  return (
    <>
    <Routes>
        <Route path='/' element={<Auth/>} />
        <Route path='/dashboard' element={<Dashbored/>} />
        <Route path='/createtasks' element={<Createtasks/>} />
        <Route path='/viewtasks' element={<Viewtasks/>} />
    </Routes>
      
    </>
  )
}

export default routes
