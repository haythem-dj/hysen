import React, { useState, useEffect } from "react";
import axios from "axios";
import Navigation from "../Navigation/Navigation"
import GetToken from "../utils/GetToken"
import "./Auth.css";

const Login = () => {
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const [error, setError] = useState({})
	let arr = [];
	let token = GetToken()

	useEffect(() => {
		axios.post("http://localhost:8000/api/authentication/validate_token", {token: token})
		.then(res => {
			if (res.data["validated"] == true) window.location.replace("/dashboard")
		})
		.catch(err => {})
	})

	const handleUsernameChange = (e) => {
		setUsername(e.target.value)
	}

	const handlePasswordChange = (e) => {
		setPassword(e.target.value)
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		axios.post("http://localhost:8000/api/authentication/login", {
			username: username,
			password: password
		})
		.then(res => {
			document.cookie = "token="+res.data["token"]+";SameSite=Lax"
			window.location.replace("/dashboard")
		})
		.catch(err => setError(err.response.data))

		setUsername("")
		setPassword("")
	}

	return (
		<>
			<Navigation />
			<div className="login-wrapper">
				{Object.keys(error).forEach(key => {
					arr.push(error[key])
				})}

				{arr.map((data, key) => {
					return <p className="error" key={key}>{data}</p>
				})}
				
				<form onSubmit={handleSubmit}>
					<input type="text" value={username} placeholder="username or email" onChange={handleUsernameChange} required />
					<input type="password" value={password} placeholder="password" onChange={handlePasswordChange} required />
					<button type="submit">
						Login
					</button>
				</form>
			</div>
		</>
	)
}

export default Login