import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Auth.css";

const Register = () => {
	const [username, setUsername] = useState("")
	const [email, setEmail] = useState("")
	const [firstname, setFirstname] = useState("")
	const [lastname, setLastname] = useState("")
	const [password, setPassword] = useState("")
	const [passwordConfirm, setPasswordConfirm] = useState("")

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

	const handleEmailChange = (e) => {
		setEmail(e.target.value)
	}

	const handleFirstnameChange = (e) => {
		setFirstname(e.target.value)
	}

	const handleLastnameChange = (e) => {
		setLastname(e.target.value)
	}

	const handlePasswordChange = (e) => {
		setPassword(e.target.value)
	}

	const handlePasswordConfirmChange = (e) => {
		setPasswordConfirm(e.target.value)
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
					<input type="text" value={username} placeholder="username" onChange={handleUsernameChange} required />
					<input type="email" value={email} placeholder="email" onChange={handleEmailChange} required />
					<input type="text" value={firstname} placeholder="first name" onChange={handleFirstnameChange} required />
					<input type="text" value={lastname} placeholder="last name" onChange={handleLastnameChange} required />
					<input type="password" value={password} placeholder="password" onChange={handlePasswordChange} required />
					<input type="password" value={password} placeholder="confirm password" onChange={handlePasswordConfirmChange} required />
					<button type="submit">
						Register
					</button>
				</form>
			</div>
		</>
	)
}

export default Register