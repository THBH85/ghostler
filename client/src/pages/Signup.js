import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Signup() {

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errorMessage, setErrorMessage] = useState(undefined);

	const navigate = useNavigate()

	const handleSubmit = e => {
		e.preventDefault()
		const requestBody = { email, password, name }
		axios.post('/api/auth/signup', requestBody)
			.then(response => {
				// redirect to login
				navigate('/login')
			})
			.catch(err => {
				const errorDescription = err.response.data.message
				setErrorMessage(errorDescription)
			})
	}

	const handleEmail = e => setEmail(e.target.value)
	const handleName = e => setName(e.target.value)
	const handlePassword = e => setPassword(e.target.value)


	return (
		<div className="container-background">
			<form className="signup-form" onSubmit={handleSubmit}>

				<label className="signup-label" htmlFor="email">Email: </label>
				<input className="signup-input" type="text" value={email} onChange={handleEmail} />

				<label className="signup-label" htmlFor="password">Password: </label>
				<input className="signup-input" type="password" value={password} onChange={handlePassword} />

				<label className="signup-label" htmlFor="name">Name: </label>
				<input className="signup-input" type="text" value={name} onChange={handleName} />

				<button className="signup-button" type="submit">Sign Up</button>
			</form>

			{errorMessage && <h5>{errorMessage}</h5>}

		</div>
		
	)
}