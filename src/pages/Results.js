// React
import { useState } from "react";

// Redux
import { useAuth } from "../redux/useAuth";

// React Router
import { Navigate } from "react-router-dom";

// React Bootstrap
import Table from "react-bootstrap/Table";
import Form from 'react-bootstrap/Form';

// Custom
import { Result } from "../components/Result";
import { questions, filters } from "../utils/constants"
import { isDateWithinWeek } from "../utils/dates";

export const Results = () => {
    const {loggedIn, email, username} = useAuth();
    const [filter, setFilter] = useState(filters.ALL);

    if(!loggedIn){
      alert("You must log in to access this page!");
		  return <Navigate to="/login" />;
    }

    let userData = JSON.parse(localStorage.getItem(email));

    // In case user has not calculated a body age before (in general or for a specific browser)
    if(!("results" in userData)){
      return (
        <section>
          <span className="h4">There are no results to display!</span><br />
          <span>Click on "Questions" in the navbar to calculate a new body age result.</span>
        </section>
      );
    }

    let results = Object.values(userData.results);

    switch(filter){
      case filters.ALL:
        break;

      case filters.RECENT:
        results = results.filter((result) => isDateWithinWeek(result.completedDate));
        break;

      case filters.OLD:
        results = results.filter((result) => !isDateWithinWeek(result.completedDate));
        break;

      default:
        alert(`Invalid filter value: ${filter}. Displaying all results.`);
        break;
    }

    const resultDisplay = results.map((result) => <Result result={result} />);

    return (
      <>
        <Form className="mb-3 float-right">
          <legend className="h5">Filter</legend>
          <Form.Select size="md" onChange={(event) => setFilter(event.target.value)}>
            <option value={filters.ALL}>All</option>
            <option value={filters.RECENT}>Recent (last 7 days)</option>
            <option value={filters.OLD}>Older (before last 7 days)</option>
          </Form.Select>
        </Form>

        <Table bordered striped hover>
          <thead>
            <tr>
              <th>Completed date</th>
              <th>Body age</th>
              <th>{questions.DATE_OF_BIRTH}</th>
              <th>{questions.DOES_WORKOUT}</th>
              <th>{questions.DOES_EAT_JUNK_FOOD}</th>
              <th>{questions.CAN_TOUCH_TOES}</th>
            </tr>
          </thead>
          
          <tbody>
            {resultDisplay}
          </tbody>
        </Table>
      </>
    );
}