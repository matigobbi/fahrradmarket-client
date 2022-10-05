import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../context/auth.context'
const API_URL = "http://localhost:5005";

export default function Login() {

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errorMessage, setErrorMessage] = useState(undefined);

	const navigate = useNavigate()

	const { storeToken, verifyStoredToken } = useContext(AuthContext)

	const handleSubmit = e => {
		e.preventDefault()
		const requestBody = { email, password }
		axios.post(`${API_URL}/auth/login`, requestBody)
			.then(response => {
				// redirect to projects
				console.log('you have a token')
				const token = response.data.authToken
				// store the token
				storeToken(token)
				verifyStoredToken()
					.then(() => {
						// redirect to home
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
		<>
			
			<form className="form" onSubmit={handleSubmit}>

				<label htmlFor="email">Email: </label>
				<input className="input text" type="text" value={email} onChange={handleEmail} />

				<label htmlFor="password">Password: </label>
				<input className="input text password" type="password" value={password} onChange={handlePassword} />

				<button className="logInButton1" type="submit">Log In</button>

			{errorMessage && <h5>{errorMessage}</h5>}

			<h3>Don't have an account?</h3>
			<Link  to='/signup'> <button>Signup</button></Link>
			</form>
		</>
	)
}