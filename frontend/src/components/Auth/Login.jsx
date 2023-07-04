import { useState, useEffect } from "react";
import axios from "axios";
import "./Auth.css";

const Login = () => {
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")

	useEffect(() => {
		let token;
		let cookies = document.cookie.split(" ")
		for(let cookie of cookies) {
			if (cookie.split("=")[0] == "token")
				token = cookie.split("=")[1]
		}

		axios.post("http://localhost:8000/api/authentication/validate_token", {token: token})
		.then(res => {
			if (res.data["validated"]) window.location.replace("/dashboard")
		})
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
		.then(res => {document.cookie = "token="+res.data["token"]})
		.catch(err => console.log(err))

		setUsername("")
		setPassword("")
	}

	return (
		<>
			<div className="login-wrapper">
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