import React, { useState, useEffect } from "react";
import axios from "axios"
import GetToken from "../utils/GetToken"
import "./Navigation.css"

const Navigation = () => {
	const [logged, setLogged] = useState(false)
	let token = GetToken()

	useEffect(() => {
		axios.post("http://localhost:8000/api/authentication/validate_token", {token: token})
		.then(res => {
			if (res.data["validated"] == true) setLogged(true)
			else setLogged(false)
		})
		.catch(err => {})
	})

	return (
		<>
			{logged ?
				<nav>
					<ul className="nav-items">
						<li className="nav-brand-item"><a href="#" className="nav-brand-link">hysen</a></li>
						<li className="nav-item"><a href="#" className="nav-item-link">dashboard</a></li>
						<li className="nav-item"><a href="#" className="nav-item-link">posts</a></li>
						<li className="nav-item"><a href="#" className="nav-item-link">about</a></li>
						<li className="nav-item"><a href="#" className="nav-item-link">services</a></li>
						<li className="nav-item"><a href="#" className="nav-item-link">contact</a></li>
					</ul>
					<ul className="nav-items">
						<li className="nav-item"><a href="#" className="nav-item-link">account</a></li>
						<li className="nav-item"><a href="/logout" className="nav-item-link">logout</a></li>
					</ul>
				</nav> :
				<nav>
					<ul className="nav-items">
						<li className="nav-brand-item"><a href="#" className="nav-brand-link">hysen</a></li>
					</ul>
					<ul className="nav-items">
						<li className="nav-item"><a href="/login" className="nav-item-link">login</a></li>
						<li className="nav-item"><a href="/register" className="nav-item-link">register</a></li>
					</ul>
				</nav>
				
			}
		</>
	)
}

export default Navigation