import React, { useState } from 'react';
import { Input } from 'rsuite';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import '../styles/LoginPage.css';

const LoginPage = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isValidEmail, setIsValidEmail] = useState(true);
	const [showPassword, setShowPassword] = useState(false);

	const handleEmailChange = (event) => {
		const value = event.target;
		setEmail(value);
	};

	const handlePasswordChange = (event) => {
		const value = event.target;
		setPassword(value);
	};

	const handleShowPasswordChange = () => {
		setShowPassword(!showPassword);
	};

	const handleLogin = (event) => {
		event.preventDefault();
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Email validation regex pattern
		if (!emailRegex.test(email)) {
			setIsValidEmail(false);
			return;
		}
		console.log('Logged in successfully!'); // Perform login logic here
	};

	return (
		<div className="login-container">
			<h1 className="login-heading">Login</h1>
			<form onSubmit={handleLogin}>
				<div className="form-group email">
					<label htmlFor="email">Email:</label>
					<Input
						type="text"
						id="email"
						value={email}
						onChange={handleEmailChange}
						className={`form-control ${!isValidEmail && 'error'}`}
						style={{width: 240}}
					/>
					{!isValidEmail && <p className="error-message">Please enter a valid email</p>}
				</div>
				<div className="form-group password">
					<label htmlFor="password">Password:</label>
					<div className="password-input-container">
						<Input
							type={showPassword ? 'text' : 'password'}
							id="password"
							value={password}
							onChange={handlePasswordChange}
							className="form-control"
							style={{width: 200}}
						/>
						<div className="password-visibility-icon">
							{showPassword ?
								<VisibilityIcon
								onClick={handleShowPasswordChange}
								onChange={showPassword}/> :
								<VisibilityOffIcon
								onClick={handleShowPasswordChange}
								onChange={showPassword}/>}
						</div>
					</div>
				</div>
				<button type="submit" className="btn-login">Login</button>
			</form>
		</div>
	);
};

export default LoginPage;
