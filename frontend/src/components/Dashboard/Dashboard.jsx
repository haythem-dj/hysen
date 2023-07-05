import React, { useEffect } from "react"
import axios from "axios"
import Navigation from "../Navigation/Navigation"
import GetToken from "../utils/GetToken"

const Dashboard = () => {
	let token = GetToken()

	useEffect(() => {
		axios.post("http://localhost:8000/api/authentication/validate_token", {token: token})
		.then(res => {
			if (res.data["validated"] == false) window.location.replace("/login")
		})
		.catch(err => {})
	})

	return (
		<>
			<Navigation />
			<h2>Dashboard</h2>
		</>
	)
}

export default Dashboard