// React
import { useState } from 'react'

// React Router
import { Navigate } from 'react-router-dom';

// React Bootstrap
import Form from "react-bootstrap/Form";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from "react-bootstrap/Button";

export const Register = () => {
	const [validated, setValidated] = useState(false);

	function register(event){
		const form = event.currentTarget;

		if(form.checkValidity() === false){
			setValidated(false);
			event.preventDefault();
			event.stopPropagation();
			
			return;
		}

		// TODO: Check if user exists in system (via email address)
		const userExists = false;

		if(userExists){
			alert("A user already exists for the provided email address.");

			setValidated(false);
			event.preventDefault();
			event.stopPropagation();

			return;
		}

		setValidated(true);

		// TODO: If not, API call to store new user info (localStorage?)
	}

	if(validated){
		return <Navigate to="/login" />
	}

	else{
		return (
			<Form noValidate onSubmit={register} validated={validated}>
				<Row className="mb-3">
					<Form.Group as={Col} xs={3}>
						<Form.Label>Username</Form.Label>
						<Form.Control type="text" required />
	
						<Form.Control.Feedback type="invalid">Username is a required field!</Form.Control.Feedback>
					</Form.Group>
				</Row>
				
				<Row className="mb-3">
					<Form.Group as={Col} xs={4}>
						<Form.Label>Email Address</Form.Label>
						<Form.Control type="email" required />
	
						<Form.Control.Feedback type="invalid">Email address is a required field!</Form.Control.Feedback>
					</Form.Group>
				</Row>
				
				<Row className="mb-3">
					<Form.Group as={Col} xs={4}>
						<Form.Label>Password</Form.Label>
						<Form.Control type="password" required />
	
						<Form.Control.Feedback type="invalid">Password is a required field!</Form.Control.Feedback>
					</Form.Group>
				</Row>
	
				<Button type="submit" variant="primary">Register</Button>
			</Form>
		)
	}
}