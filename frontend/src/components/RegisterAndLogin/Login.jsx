import "./Login.css";

const Login = () => {
	return (
		<div className="login-wrapper">
			<form>
				<input type="text" placeholder="username" />
				<input type="password" placeholder="password" />
				<button type="submit">
					Login
				</button>
			</form>
		</div>
	)
}

export default Login