// Custom React components
import { RadioQuestion } from './RadioQuestion';
import { DateQuestion } from './DateQuestion';

// Represents a general question on the "/questions" page
export const Question = (props) => {
	switch(props.type){
		case "radio":
			return (
					<RadioQuestion questionId={props.questionId} labelText={props.labelText} answers={props.answers} />
			)

		case "date":
			return (
					<DateQuestion questionId={props.questionId} labelText={props.labelText} />
			)

		default:
			return <></>
	}
}