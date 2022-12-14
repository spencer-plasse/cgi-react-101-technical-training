// Redux
import { useDispatch } from "react-redux";
import { saveRadioAnswer } from "../redux/answerSlice";

// React Bootstrap
import Form from "react-bootstrap/Form";

// Represents a single radio question in the "/questions" page
export const RadioQuestion = (props) => {
  const dispatch = useDispatch();
  const questionId = props.questionId;

  return (
    <Form.Group className="mb-3" controlId={`${questionId}`}>
      <Form.Label>{props.labelText}</Form.Label>

      <div>
        {props.answers.map((answer, x) => {
          return (
              <Form.Check required type="radio" name={questionId} value={answer} label={answer} 
                      inline key={`${questionId}-answer${x}`} id={`${questionId}`}
                      onClick={() => dispatch(saveRadioAnswer({
                        questionId: questionId, answer: answer
                      }))} />
            )
          })}
      </div>
    </Form.Group>
  )
}