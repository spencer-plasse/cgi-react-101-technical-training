// React
import { useState } from "react";

// Redux
import { useSelector } from "react-redux";

// React Router
import { Navigate } from "react-router-dom";

// React Bootstrap
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

// Custom React components
import { Question } from "../components/Question";

export const Questions = () => {
	const [validated, setValidated] = useState(false);
	const email = useSelector((state) => state.auth.user.email);

	function submitAnswers(event){
		const form = event.currentTarget;

		try{
			if(form.checkValidity() === false){
				throw new Error("Form is missing answers.");
			}

			

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
		return <Navigate to="/results" />
	}

	else{
		return (
			<Form noValidate validated={validated} onSubmit={submitAnswers}>
				<Question labelText="What is your birth date?" type="date" />
				<Question labelText="Do you workout weekly?" type="radio" questionId="doesWorkout" answers={["Never", "Sometimes", "Always"]} />
				<Question labelText="Do you eat junk food?" type="radio" questionId="doesEatJunkFood" answers={["Never", "Sometimes", "Always"]} />
				<Question labelText="Can you touch your toes?" type="radio" questionId="canTouchToes" answers={["Yes", "No"]} />
	
				<Button type="submit" variant="primary">Submit</Button>
			</Form>
		)
	}
}