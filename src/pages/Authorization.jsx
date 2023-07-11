import React, {useState} from 'react';
import {Button, ButtonToolbar, Form, Modal, Schema} from "rsuite";

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
					<TextField name="password" label="Password" type="password" autoComplete="off" />
					<TextField
						name="verifyPassword"
						label="Verify password"
						type="password"
						autoComplete="off"
					/>
					<hr/>
					<ButtonToolbar>
						<Button appearance="primary" onClick={handleSubmit}>
							Submit
						</Button>
					</ButtonToolbar>
				</Form>
			</Modal.Body>
			<Modal.Footer>
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