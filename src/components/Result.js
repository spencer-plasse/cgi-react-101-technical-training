export const Result = (props) => {
  const result = props.result;

  return (
    <tr>
      <td>{result.completedDate}</td>
      <td>{result.bodyAge}</td>
      <td>{result.dateOfBirth}</td>
      <td>{result.doesWorkout}</td>
      <td>{result.doesEatJunkFood}</td>
      <td>{result.canTouchToes}</td>
    </tr>
  )
};