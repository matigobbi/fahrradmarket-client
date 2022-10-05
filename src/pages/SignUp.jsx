import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
const API_URL = "http://localhost:5005";

export default function Signup() {

	const [name, setName] = useState('');
	const [birth, setBirth] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [country, setCountry] = useState('');
	const [errorMessage, setErrorMessage] = useState(undefined);

	const navigate = useNavigate()
	const handleSubmit = e => {
		e.preventDefault()
		const requestBody = { email, password, name, birth, country }
		axios.post(`${API_URL}/auth/signup`, requestBody)
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
	const handleBirth = e => setBirth(e.target.value)
	const handleCountry = e => setCountry(e.target.value)


	return (
		<>
			<form className="form" onSubmit={handleSubmit}>

				<label htmlFor="email">Email: </label>
				<input type="text" value={email} onChange={handleEmail} />

				<label htmlFor="password">Password: </label>
				<input type="password" value={password} onChange={handlePassword} />

				<label htmlFor="name">Name: </label>
				<input type="text" value={name} onChange={handleName} />

				<label htmlFor="birth">Date of birthday: </label>
				<input type="date" value={birth} onChange={handleBirth} />

				<label htmlFor="country">Country: </label>
				<input type="text" value={country} onChange={handleCountry} />

				<button type="submit">Sign Up</button>
			

			{errorMessage && <h5>{errorMessage}</h5>}

			<h3>Already have an account?</h3>
			<Link to='/login'><button>Login</button></Link>
			</form>
		</>
	)
}