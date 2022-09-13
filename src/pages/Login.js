// React
import { useState } from 'react';

// React Router
import { Navigate } from 'react-router-dom';

// Redux
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice"
import { useAuth } from '../redux/useAuth';

// React Bootstrap
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

// "/login" page
export const Login = () => {
	const [validated, setValidated] = useState(false);
	const {loggedIn, ...rest} = useAuth();
	const dispatch = useDispatch();

	// Works when turning "Persist state history" on in Redux DevTools but not otherwise? Couldn't figure it out.
	if(loggedIn && !validated){
		alert("You cannot access this page while you are logged in!");
		return <Navigate to="/home" />;
	}

	function handleLogin(event){
		event.preventDefault();
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
			if(userData.password !== form.elements["password"].value){
				throw new Error("Invalid login information.");
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
			event.stopPropagation();
	
			return;
		}
	}

	if(validated){
		return <Navigate to="/home" />
	}

	else{
		return (
			<Form validated={validated} onSubmit={handleLogin}>
				<Form.Text className="mb-3 h3 text-center">Log In</Form.Text>
				<Form.Group className="mb-3">
					<Form.Label htmlFor="email">Email Address</Form.Label>
					<Form.Control required type="email" id="email" className="w-25" />
				</Form.Group>
	
				<Form.Group className="mb-3">
					<Form.Label htmlFor="password">Password</Form.Label>
					<Form.Control required type="password" id="password" className="w-25" />
				</Form.Group>
	
				<Button type="submit" variant="primary" title="login">Log In</Button>
			</Form>
		)
	}
}