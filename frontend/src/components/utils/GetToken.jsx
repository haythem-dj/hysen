import React, { useEffect } from "react";
import axios from "axios";

const GetToken = () => {
	let token;
	let cookies = document.cookie.split(" ")
	for(let cookie of cookies) {
		if (cookie.split("=")[0] == "token") {
			token = cookie.split("=")[1]
			return token
		}
	}

	return undefined
}

export default GetToken;