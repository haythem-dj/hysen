import { useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "../Dashboard/Dashboard";
import Login from "../RegisterAndLogin/Login";
import './App.css'

const App = () => {
  const [token, setToken] = useState()

  if(!token)
    return (<Login setToken={setToken} />)

  return (
    <>
      <div className="wrapper">
        <h1>Application</h1>
        <BrowserRouter>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />}>
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
