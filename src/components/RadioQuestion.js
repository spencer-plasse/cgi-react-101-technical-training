// Redux
import { useDispatch } from "react-redux";
import { saveRadioAnswer } from "../redux/answerSlice";

// React Bootstrap
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

export const RadioQuestion = (props) => {
  const dispatch = useDispatch();
  const questionId = props.questionId;

  return (
    <Form.Group className="mb-3" controlId={`question${questionId}`}>
      <Form.Label>{props.labelText}</Form.Label>

      <div>
        {props.answers.map((answer, x) => {
          return (
              <Form.Check type="radio" name={questionId} value={answer} label={answer} 
                      inline key={`question${questionId}-answer${x}`} 
                      onClick={() => dispatch(saveRadioAnswer({questionId: questionId, answer: answer}))} />
            )
          })}
      </div>
    </Form.Group>
  )
}