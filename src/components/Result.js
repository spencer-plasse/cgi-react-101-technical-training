// Represents a single result (collection of calculated dates, answers from "/questions", and body ages)
// to be displayed in a list on the "/results" page
export const Result = (props) => {
  const result = props.result;
  const completedDate = new Date(result.completedDate);
  const dateOfBirth = new Date(result.dateOfBirth);

  // Dates are formatted as ISO for readability and the completed time is formatted in a US standard
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