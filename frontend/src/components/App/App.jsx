import { useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "../Dashboard/Dashboard";
import Register from "../Auth/Register";
import Login from "../Auth/Login";
import Logout from "../Auth/Logout";
import './App.css'

const App = () => {
  const [token, setToken] = useState()

  return (
    <>
      <div className="wrapper">
        <BrowserRouter>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
