// React
import { useState } from "react";

// Redux
import { useAuth } from "../redux/useAuth";

// React Router
import { Navigate } from "react-router-dom";

// React Bootstrap
import Table from "react-bootstrap/Table";
import Dropdown from "react-bootstrap/Dropdown";

// Custom
import { Result } from "../components/Result";
import { questions, filters } from "../utils/constants"
import { isDateWithinWeek } from "../utils/dates";

// "/results" page
export const Results = () => {
  const {loggedIn, email, } = useAuth();
  const [filter, setFilter] = useState(filters.ALL);

  // User must be logged in to access the "/results" page
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

  // Filter result list based on selected filter
  switch(filter){
    case filters.ALL:
      break;

    case filters.RECENT:
      results = results.filter((result) => isDateWithinWeek(new Date(result.completedDate)));
      break;

    case filters.OLD:
      results = results.filter((result) => !isDateWithinWeek(new Date(result.completedDate)));
      break;

    default:
      alert(`Invalid filter value: ${filter}. Displaying all results.`);
      break;
  }

  // Sort results in order of most recently completed
  const resultDisplay = results.map((result) => <Result result={result} key={result.completedDate} />)
                        .sort((first, second) => first.completedDate > second.completedDate ? 1 : -1);

  return (
    <>
      <span className="mt-2 float-left h5">Showing {filter.toLowerCase()} results:</span>
      <div className="mb-3 float-right">
        <Dropdown>
          <Dropdown.Toggle variant="dark">Filter</Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={(event) => setFilter(filters.ALL)}>All</Dropdown.Item>
            <Dropdown.Item onClick={(event) => setFilter(filters.RECENT)}>Recent (last 7 days)</Dropdown.Item>
            <Dropdown.Item onClick={(event) => setFilter(filters.OLD)}>Older than 7 days</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

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
      <br />
    </>
  );
}