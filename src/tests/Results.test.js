// Testing
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';

// Custom
import { withProvider } from "./setupTests";
import { Results } from '../pages/Results';
import { store } from '../redux/store';
import { login } from "../redux/authSlice";
import { answerOffsets, filters } from "../utils/constants";
import { isDateWithinWeek, monthDiff } from "../utils/dates";

// Check result table length when all results are displayed
test("Assert that filtering to all results works", async () => {
  // Simulate login
  store.dispatch(login({
    username: "splasse",
    email: "spencerplasse@gmail.com"
  }));

  useTestResults("spencerplasse@gmail.com", filters.ALL);
  render(withProvider(<Results />));

  // 2 result rows plus the <th> row = 3
  expect(screen.getByRole("table").rows.length).toEqual(3);
});

// Check result table length when only recent results are displayed
test("Assert that filtering to recent results works", async () => {
  // Simulate login
  store.dispatch(login({
    username: "splasse",
    email: "spencerplasse@gmail.com"
  }));

  useTestResults("spencerplasse@gmail.com", filters.RECENT);
  render(withProvider(<Results />));

  // 1 recent result row plus the <th> row = 2
  expect(screen.getByRole("table").rows.length).toEqual(2);
});

// Check result table length when only older results are displayed
test("Assert that filtering to older results works", async () => {
  // Simulate login
  store.dispatch(login({
    username: "splasse",
    email: "spencerplasse@gmail.com"
  }));

  useTestResults("spencerplasse@gmail.com", filters.OLD);
  render(withProvider(<Results />));

  // 1 older result row plus the <th> row = 2
  expect(screen.getByRole("table").rows.length).toEqual(2);
});

// Mock a set of two results for the specified user using a filter value of all, recent, or old.
function useTestResults(email, filter=filters.ALL){
  const currentDatetime = new Date();
  const oldData = JSON.parse(localStorage.getItem(email));

  // Set of two results - one recent, and one old.
  let results = [
    {
      dateOfBirth: "01-01-2000",
      doesWorkout: answerOffsets["Never"],
      doesEatJunkFood: answerOffsets["Sometimes"],
      canTouchToes: answerOffsets["No"],
      bodyAge: Math.floor(monthDiff(new Date("01-01-2000"), currentDatetime) / 12)
                + (answerOffsets["Never"] + answerOffsets["Sometimes"] + answerOffsets["No"]),
      completedDate: new Date().toISOString()
    },
    {
      dateOfBirth: "05-05-2006",
      doesWorkout: answerOffsets["Sometimes"],
      doesEatJunkFood: answerOffsets["Always"],
      canTouchToes: answerOffsets["Yes"],
      bodyAge: Math.floor(monthDiff(new Date("05-05-2006"), new Date("09-02-2022")) / 12)
                + (answerOffsets["Sometimes"] + answerOffsets["Always"] + answerOffsets["Yes"]),
      completedDate: new Date("09-02-2022").toISOString()
    }
  ];

  // Filter result list
  switch(filter){
    case filters.ALL:
      results = results.filter((result) => result)

      break;

    case filters.RECENT:
      results = results.filter((result) => isDateWithinWeek(new Date(result.completedDate)));

      break;

    case filters.OLD:
      results = results.filter((result) => !isDateWithinWeek(new Date(result.completedDate)))

      break;
  }

  let newData = {
    ...oldData,
    results: {}
  };

  // Populate newData.results with the filtered results list
  results.forEach((result) => newData.results[result.completedDate] = result);
  localStorage.setItem(email, JSON.stringify(newData));
}