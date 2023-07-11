import React, {useState} from 'react';
import {Button, ButtonToolbar, Form, Modal, Schema} from "rsuite";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import "../components/Authorization.css";

const { StringType, NumberType } = Schema.Types;

const model = Schema.Model({
	email: StringType()
		.isEmail('Please enter a valid email address.')
		.isRequired('This field is required.'),
	password: StringType().isRequired('This field is required.'),
	verifyPassword: StringType()
		.addRule((value, data) => {
			console.log(data);

			if (value !== data.password) {
				return false;
			}
			return true;
		}, 'The two passwords do not match')
		.isRequired('This field is required.')
});

const TextField = React.forwardRef((props, ref) => {
	const { name, label, accepter, ...rest } = props;
	return (
		<Form.Group controlId={`${name}-4`} ref={ref}>
			<Form.ControlLabel>{label} </Form.ControlLabel>
			<Form.Control name={name} accepter={accepter} {...rest} />
		</Form.Group>
	);
});


const Authorization = ({ handleModalClose }) => {
	const formRef = React.useRef();
	const [showPassword, setShowPassword] = useState(false);
	const [showVerificationPassword, setShowVerificationPassword] = useState(false);
	const [formError, setFormError] = React.useState({});
	const [formValue, setFormValue] = React.useState({
		email: '',
		age: '',
		password: '',
		verifyPassword: ''
	});

	const handleSubmit = () => {
		if (!formRef.current.check()) {
			console.error('Form Error');
			return;
		}
		console.log(formValue, 'Form Value');
	};

	const handleShowPasswordChange = () => {
		setShowPassword(!showPassword);
	};
	const handleShowVerificationPasswordChange = () => {
		setShowVerificationPassword(!showVerificationPassword);
	};



	return (
		<Modal open={true} onClose={handleModalClose} size="xs">
			<Modal.Header>
				<Modal.Title>Registration</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form
					ref={formRef}
					onChange={setFormValue}
					onCheck={setFormError}
					formValue={formValue}
					model={model}
				>
					<TextField name="email" label="Email" />
					<div className="password-visibility">
						<TextField name="password"
						           label="Password"
						           type={showVerificationPassword ? 'text' : 'password'}
						           autoComplete="off" />
						{showVerificationPassword ?
							<VisibilityIcon
								onClick={handleShowVerificationPasswordChange}
								onChange={showVerificationPassword}/> :
							<VisibilityOffIcon
								onClick={handleShowVerificationPasswordChange}
								onChange={showVerificationPassword}/>}
					</div>
					<div className="password-visibility">
						<TextField
							name="verifyPassword"
							label="Verify password"
							type={showPassword ? 'text' : 'password'}
							autoComplete="off"
						/>
						{showPassword ?
							<VisibilityIcon
								onClick={handleShowPasswordChange}
								onChange={showPassword}/> :
							<VisibilityOffIcon
								onClick={handleShowPasswordChange}
								onChange={showPassword}/>}
					</div>
					<ButtonToolbar className="button-toolbar">
						<Button appearance="primary" onClick={handleSubmit}>
							Registration
						</Button>
					</ButtonToolbar>
					<hr/>
						<div className="login-area">
							<h6>I already have an account:</h6>
							<Button appearance="ghost">
								Login
							</Button>
						</div>

				</Form>
				<hr/>
			</Modal.Body>
			<Modal.Footer className="modal-footer">
				<Button onClick={handleModalClose} appearance="primary">
					Confirm
				</Button>
				<Button onClick={handleModalClose} appearance="subtle">
					Cancel
				</Button>
			</Modal.Footer>

		</Modal>
	);
};

export default Authorization;