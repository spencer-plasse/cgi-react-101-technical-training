import { useDispatch } from "react-redux";
import { saveDateAnswer } from "../redux/answerSlice";

// React Bootstrap
import Form from "react-bootstrap/Form";

export const DateQuestion = (props) => {
  const dispatch = useDispatch();

  function saveDate(event){
    const date = event.target.value;
    dispatch(saveDateAnswer(date.toString()));
  }

  return (
    <Form.Group className="mb-3">
      <Form.Label>{props.labelText}</Form.Label>
      <Form.Control type="date" name="dateOfBirth" className="w-25" onChange={saveDate}/>
    </Form.Group>
  )
}