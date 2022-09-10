// React
import { useState } from 'react'

// React Router
import { Navigate } from 'react-router-dom';

// Redux
import { useAuth } from '../redux/useAuth';

// React Bootstrap
import Form from "react-bootstrap/Form";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from "react-bootstrap/Button";

// "/register" page
export const Register = () => {
	const [validated, setValidated] = useState(false);
	const {loggedIn, ...rest} = useAuth();

	function register(event){
		const form = event.currentTarget;

		try{
			if(form.checkValidity() === false){
				throw new Error("Form received invalid input.");
			}

			// Check if a registered user already exists for the specified email
			const email = form.elements["email"].value;	
			const userExists = localStorage.getItem(email);

			if(userExists){
				throw new Error("A user already exists for the provided email address.");
			}

			// If no user exists, register the new user in localStorage
			const userData = {
				username: form.elements["username"].value,
				password: form.elements["password"].value
			};

			// Users are stored as email (string) -> other data (JSON object stored as a string with username and password)
			localStorage.setItem(email, JSON.stringify(userData));
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
		return <Navigate to="/login" />
	}

	else{
		return (
			<Form noValidate onSubmit={register} validated={validated}>
				<Form.Text className="mb-3 h3 text-center">Register</Form.Text>

				<Row className="mb-3">
					<Form.Group as={Col} xs={3}>
						<Form.Label htmlFor="username">Username</Form.Label>
						<Form.Control type="text" id="username" required />
	
						<Form.Control.Feedback type="invalid">Username is a required field!</Form.Control.Feedback>
					</Form.Group>
				</Row>
				
				<Row className="mb-3">
					<Form.Group as={Col} xs={4}>
						<Form.Label htmlFor="email">Email Address</Form.Label>
						<Form.Control type="email" id="email" required />
	
						<Form.Control.Feedback type="invalid">Email address is a required field!</Form.Control.Feedback>
					</Form.Group>
				</Row>
				
				<Row className="mb-3">
					<Form.Group as={Col} xs={4}>
						<Form.Label htmlFor="password">Password</Form.Label>
						<Form.Control type="password" id="password" required />
	
						<Form.Control.Feedback type="invalid">Password is a required field!</Form.Control.Feedback>
					</Form.Group>
				</Row>
	
				<Button type="submit" variant="primary">Register</Button>
			</Form>
		)
	}
}