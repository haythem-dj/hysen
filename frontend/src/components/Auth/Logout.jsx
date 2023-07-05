import React, { useEffect } from 'react'
import "./Auth.css"

const Logout = () => {
	document.cookie = "token=;expires=Thu, 01 Jan 1970 00:00:00 UTC"
	window.location.replace("/login")

	return (
		<>
			<h1>Login out...</h1>
		</>
	)
}

export default Logout