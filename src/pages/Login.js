// React
import { useState } from 'react';

// React Router
import { Navigate } from 'react-router-dom';

// Redux
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice"

// React Bootstrap
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export const Login = () => {
	const [validated, setValidated] = useState(false);
	const dispatch = useDispatch();

	function handleLogin(event){
		const form = event.currentTarget;

		if(form.checkValidity() === false){
			setValidated(false);
			event.preventDefault();
			event.stopPropagation();

			return;
		}

		setValidated(true);

		// TODO: Check if user exists in system (via email address)
		const userExists = true;

		if(!userExists){
			alert("No user exists for the provided email address.");

			setValidated(false);
			event.preventDefault();
			event.stopPropagation();

			return;
		}

		// TODO: If so, API call to get username (localStorage?)
		const username = "TODO";
		dispatch(login({user: username}));
	}

	if(validated){
		return <Navigate to="/home" />
	}

	else{
		return (
			<Form noValidate validated={validated} onSubmit={handleLogin}>
				<Form.Group className="mb-3">
					<Form.Label>Email Address</Form.Label>
					<Form.Control type="email" className="w-25" />
				</Form.Group>
	
				<Form.Group className="mb-3">
					<Form.Label>Password</Form.Label>
					<Form.Control type="password" className="w-25" />
				</Form.Group>
	
				<Button type="submit" variant="primary">Log In</Button>
			</Form>
		)
	}
}