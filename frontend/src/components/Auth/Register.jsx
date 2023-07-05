import React, { useState, useEffect } from "react";
import axios from "axios";
import Navigation from "../Navigation/Navigation"
import GetToken from "../utils/GetToken"
import "./Auth.css";

const Register = () => {
	const [username, setUsername] = useState("")
	const [email, setEmail] = useState("")
	const [firstname, setFirstname] = useState("")
	const [lastname, setLastname] = useState("")
	const [password, setPassword] = useState("")
	const [passwordConfirm, setPasswordConfirm] = useState("")
	const [error, setError] = useState({})
	let arr = []
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
		if (password != passwordConfirm) setError({error: "password does not match"})
		axios.post("http://localhost:8000/api/authentication/register", {
			username: username,
			email: email,
			first_name: firstname,
			last_name: lastname,
			password: password

		})
		.then(res => {document.cookie = "token="+res.data["token"]})
		.catch(err => setError(err.response.data))

		setUsername("")
		setEmail("")
		setFirstname("")
		setLastname("")
		setPassword("")
		setPasswordConfirm("")
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
					<input type="text" value={username} placeholder="username" onChange={handleUsernameChange} required />
					<input type="email" value={email} placeholder="email" onChange={handleEmailChange} required />
					<input type="text" value={firstname} placeholder="first name" onChange={handleFirstnameChange} required />
					<input type="text" value={lastname} placeholder="last name" onChange={handleLastnameChange} required />
					<input type="password" value={password} placeholder="password" onChange={handlePasswordChange} required />
					<input type="password" value={passwordConfirm} placeholder="confirm password" onChange={handlePasswordConfirmChange} required />
					<button type="submit">
						Register
					</button>
				</form>
			</div>
		</>
	)
}

export default Register