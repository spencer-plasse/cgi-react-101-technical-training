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

		try{
			if(form.checkValidity() === false){
				throw new Error("Form received invalid input.");
			}
	
			// Check if a registered user already exists for the specified email
			const email = form.elements["email"].value;
			const userExists = localStorage.getItem(email);
	
			if(!userExists){
				throw new Error("No user exists for the provided email address.");
			}

			const userData = JSON.parse(localStorage.getItem(email));

			// Make sure provided password matches the one from registration
			if(userData.password != form.elements["password"].value){
				throw new Error("Email address and password match.");
			}

			// Retrive matching username for provided login and log into account
			const username = userData.username;
			dispatch(login({
				username: username, email: email
			}));

			setValidated(true);
		}
		
		catch(exception){
			alert(exception.message);

			setValidated(false);
			event.preventDefault();
			event.stopPropagation();
	
			return;
		}
	}

	if(validated){
		return <Navigate to="/home" />
	}

	else{
		return (
			<Form noValidate validated={validated} onSubmit={handleLogin}>
				<Form.Group className="mb-3">
					<Form.Label>Email Address</Form.Label>
					<Form.Control type="email" id="email" className="w-25" />
				</Form.Group>
	
				<Form.Group className="mb-3">
					<Form.Label>Password</Form.Label>
					<Form.Control type="password" id="password" className="w-25" />
				</Form.Group>
	
				<Button type="submit" variant="primary">Log In</Button>
			</Form>
		)
	}
}