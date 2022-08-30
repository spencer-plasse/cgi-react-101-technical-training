import { useDispatch } from "react-redux";
import { saveDateAnswer } from "../redux/answerSlice";

// React Bootstrap
import Form from "react-bootstrap/Form";

export const DateQuestion = (props) => {
  const dispatch = useDispatch();
  // TODO: Research Redux and figure out how to dispatch the correct date value

  return (
    <Form.Group className="mb-3">
      <Form.Label>{props.labelText}</Form.Label>
      <Form.Control type="date" name="dateOfBirth" className="w-25" onChange={(newDate) => dispatch(saveDateAnswer(newDate.toString()))}/>
    </Form.Group>
  )
}