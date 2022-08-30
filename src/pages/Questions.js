// React
import { useState } from "react";

// React Router
import { Navigate } from "react-router-dom";

// React Bootstrap
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button"

// Custom React components
import { Question } from '../components/Question'

export const Questions = () => {
	const [validated, setValidated] = useState(false);

	function submitAnswers(event){
		const form = event.currentTarget;

		if(form.checkValidity() === false){
			setValidated(false);
			event.preventDefault();
			event.stopPropagation();
			
			return;
		}

		setValidated(true);
	}

	if(validated){
		return <Navigate to="/results" />
	}

	else{
		return (
			<Form noValidate validated={validated} onSubmit={submitAnswers}>
				<Question labelText="What is your birth date?" type="date" />
				<Question labelText="Do you workout weekly?" type="radio" questionId={1} answers={["Never", "Sometimes", "Always"]} />
				<Question labelText="Do you eat junk food?" type="radio" questionId={2} answers={["Never", "Sometimes", "Always"]} />
				<Question labelText="Can you touch your toes?" type="radio" questionId={3} answers={["Yes", "No"]} />
	
				<Button type="submit" variant="primary">Submit</Button>
			</Form>
		)
	}
}