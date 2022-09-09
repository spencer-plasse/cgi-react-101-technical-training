// Redux
import { useDispatch } from "react-redux";
import { saveDateAnswer } from "../redux/answerSlice";

// React Bootstrap
import Form from "react-bootstrap/Form";

// Represents the date question on the "/questions" page
export const DateQuestion = (props) => {
  const dispatch = useDispatch();

  // Save the date to Redux every time it is changed
  function saveDate(event){
    const date = event.target.value;
    dispatch(saveDateAnswer(date.toString()));
  }

  return (
    <Form.Group className="mb-3">
      <Form.Label>{props.labelText}</Form.Label>
      <Form.Control required type="date" name="dateOfBirth" id={`${props.questionId}`} className="w-25" onChange={saveDate} />
    </Form.Group>
  )
}