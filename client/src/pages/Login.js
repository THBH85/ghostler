import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../context/auth'

export default function Login() {

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errorMessage, setErrorMessage] = useState(undefined);

	const navigate = useNavigate()

	const { storeToken, verifyStoredToken } = useContext(AuthContext)

	const handleSubmit = e => {
		e.preventDefault()
		const requestBody = { email, password }
		axios.post('/api/auth/login', requestBody)
			.then(response => {
				// redirect to projects
				console.log('i have a token mothafukkas')
				const token = response.data.authToken
				// store the token
				storeToken(token)
				verifyStoredToken()
					.then(() => {
						// redirect to projects
						navigate('/')
					})
			})
			.catch(err => {
				const errorDescription = err.response.data.message
				setErrorMessage(errorDescription)
			})
	}

	const handleEmail = e => setEmail(e.target.value)
	const handlePassword = e => setPassword(e.target.value)

	return (
		<div className="container-background">
			<div>
				<form className="login-form" onSubmit={handleSubmit}>

					<label className="login-label" htmlFor="email">Email: </label>
					<input className="login-input" type="text" value={email} onChange={handleEmail} />

					<label className="login-label" htmlFor="password">Password: </label>
					<input className="login-input" type="password" value={password} onChange={handlePassword} />

					<button className="login-button" type="submit">Log In</button>
				</form>

			{errorMessage && <h5>{errorMessage}</h5>}
		</div>
		</div>
	)
}