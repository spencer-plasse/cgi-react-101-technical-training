// React
import { useState } from "react";

// Redux
import { useSelector } from "react-redux";
import { useAuth } from "../redux/useAuth";

// React Router
import { Navigate } from "react-router-dom";

// React Bootstrap
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

// Custom React components
import { Question } from "../components/Question";

export const Questions = () => {
	const [validated, setValidated] = useState(false);
	const {loggedIn, email, } = useAuth();
	const answers = useSelector((state) => state.answers);

	function submitAnswers(event){
		const form = event.currentTarget;

		try{
			if(form.checkValidity() === false){
				throw new Error("Form is missing answers.");
			}

			const currentTime = new Date();
			const dateOfBirth = new Date(answers.dateOfBirth);
			const doesWorkout = answers.doesWorkout;
			const doesEatJunkFood = answers.doesEatJunkFood;
			const canTouchToes = answers.canTouchToes;

			const bodyAge = (currentTime.getFullYear() - dateOfBirth.getFullYear())
											+ (doesWorkout + doesEatJunkFood + canTouchToes);

			const oldData = JSON.parse(localStorage.getItem(email));
			const newData = {
				...oldData,
				results: {
					...oldData.results,
					[currentTime]: {
						dateOfBirth: dateOfBirth,
						doesWorkout: doesWorkout,
						doesEatJunkFood: doesEatJunkFood,
						canTouchToes: canTouchToes,
						bodyAge: bodyAge,
						completedDate: currentTime
					}
				}
			};

			localStorage.setItem(email, JSON.stringify(newData));

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
		return <Navigate to="/results" />;
	}

	else if(!loggedIn){
		alert("You must log in to access this page!");
		return <Navigate to="/login" />;
	}

	else{
		return (
			<Form noValidate validated={validated} onSubmit={submitAnswers}>
				<Question labelText="What is your birth date?" type="date" questionId="dateOfBirth" />
				<Question labelText="Do you workout weekly?" type="radio" questionId="doesWorkout" answers={["Never", "Sometimes", "Always"]} />
				<Question labelText="Do you eat junk food?" type="radio" questionId="doesEatJunkFood" answers={["Never", "Sometimes", "Always"]} />
				<Question labelText="Can you touch your toes?" type="radio" questionId="canTouchToes" answers={["Yes", "No"]} />
	
				<Button type="submit" variant="primary">Submit</Button>
			</Form>
		);
	}
}