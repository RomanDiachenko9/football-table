import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Form, ButtonToolbar, Button, Input, Modal } from 'rsuite';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import '../styles/LoginPage.css';
import LoginIcon from "@mui/icons-material/Login";

const Textarea = React.forwardRef((props, ref) => <Input {...props} as="textarea" ref={ref} />);

const LoginPage = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isValidEmail, setIsValidEmail] = useState(true);
	const [showPassword, setShowPassword] = useState(false);
	const [open, setOpen] = React.useState(false);
	const [formValue, setFormValue] = React.useState({
		name: '',
		email: '',
		password: '',
		textarea: ''
	});


	const handleClose = () => {
		setOpen(false);
	};
	const handleOpen = () => {
		setOpen(true);
	};

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
	};

	const enterLogin = () => {
		console.log('Logged in successfully!')
	}

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
				<Button size="lg" appearance="primary" type="submit" className="btn-login" onClick={enterLogin}>Login</Button>
				<hr/>
				<p>Do not have any account:</p>
				<div className="signup-modal">
					<Modal open={open} onClose={handleClose} size="xs">
						<Modal.Header>
							<Modal.Title>Registration</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<Form fluid onChange={setFormValue} formValue={formValue}>
								<Form.Group controlId="name-9">
									<Form.ControlLabel>Username</Form.ControlLabel>
									<Form.Control name="name" />
									<Form.HelpText>Required</Form.HelpText>
								</Form.Group>
								<Form.Group controlId="email-9">
									<Form.ControlLabel>Email</Form.ControlLabel>
									<Form.Control name="email" type="email" />
									<Form.HelpText>Required</Form.HelpText>
								</Form.Group>
								<Form.Group controlId="password-9">
									<Form.ControlLabel>Password</Form.ControlLabel>
									<div className="password-visibility-icon">
									<Form.Control style={{width: 200}}
									              name="password"
									              type="password"
									              autoComplete="off"
									              className="signup-password"/>
									</div>
								</Form.Group>
								<Form.Group controlId="textarea-9">
									<Form.ControlLabel>Textarea</Form.ControlLabel>
									<Form.Control rows={5} name="textarea" accepter={Textarea} />
								</Form.Group>
							</Form>
						</Modal.Body>
						<Modal.Footer>
							<Button onClick={handleClose} appearance="primary">
								Confirm
							</Button>
							<Button onClick={handleClose} appearance="subtle">
								Cancel
							</Button>
						</Modal.Footer>
					</Modal>
					<Button onClick={handleOpen}>Registration</Button>
				</div>
			</form>
		</div>
	);
};

export default LoginPage;
