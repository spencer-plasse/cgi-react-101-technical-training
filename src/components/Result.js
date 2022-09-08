export const Result = (props) => {
  const result = props.result;
  const completedDate = new Date(result.completedDate);
  const dateOfBirth = new Date(result.dateOfBirth);

  return (
    <tr>
      <td>{completedDate.toISOString().split('T')[0] + ' ' + completedDate.toLocaleTimeString('en-US')}</td>
      <td>{result.bodyAge}</td>
      <td>{dateOfBirth.toISOString().split('T')[0]}</td>
      <td>{result.doesWorkout}</td>
      <td>{result.doesEatJunkFood}</td>
      <td>{result.canTouchToes}</td>
    </tr>
  )
};