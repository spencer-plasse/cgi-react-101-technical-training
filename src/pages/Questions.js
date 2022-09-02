// React
import { useState } from "react";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { useAuth } from "../redux/useAuth";
import { submitAnswers } from "../redux/answerSlice";

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
	const dispatch = useDispatch();

	function submitForm(event){
		const form = event.currentTarget;

		try{
			if(form.checkValidity() === false){
				throw new Error("Form is missing answers.");
			}

			const currentDatetime = new Date();
			const dateOfBirth = answers.dateOfBirth; // Stored in Redux as an ISO date string (without time)
			const doesWorkout = answers.doesWorkout;
			const doesEatJunkFood = answers.doesEatJunkFood;
			const canTouchToes = answers.canTouchToes;

			// Body age is calculated as the user's age + the combination of answer offsets (anywhere between -3 and 3)
			const bodyAge = (currentDatetime.getFullYear() - new Date(dateOfBirth).getFullYear())
											+ (doesWorkout + doesEatJunkFood + canTouchToes);

			const oldData = JSON.parse(localStorage.getItem(email));

			// Preserve all previous user data but add latest answers/results under the datetime they were submitted
			const newData = {
				...oldData,
				results: {
					...oldData.results,
					[currentDatetime]: {
						dateOfBirth: dateOfBirth,
						doesWorkout: doesWorkout,
						doesEatJunkFood: doesEatJunkFood,
						canTouchToes: canTouchToes,
						bodyAge: bodyAge,
						/* Preserved as an ISO string to make retrieval and display easier for "/results"
						   Have to keep track of time as well for result order. */
						completedDate: currentDatetime.toISOString()
					}
				}
			};

			localStorage.setItem(email, JSON.stringify(newData));
			dispatch(submitAnswers);

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
			<Form noValidate validated={validated} onSubmit={submitForm}>
				<Question labelText="What is your birth date?" type="date" questionId="dateOfBirth" />
				<Question labelText="Do you workout weekly?" type="radio" questionId="doesWorkout" answers={["Never", "Sometimes", "Always"]} />
				<Question labelText="Do you eat junk food?" type="radio" questionId="doesEatJunkFood" answers={["Never", "Sometimes", "Always"]} />
				<Question labelText="Can you touch your toes?" type="radio" questionId="canTouchToes" answers={["Yes", "No"]} />
	
				<Button type="submit" variant="primary">Submit</Button>
			</Form>
		);
	}
}