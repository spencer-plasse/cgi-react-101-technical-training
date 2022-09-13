// Testing
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';

// Custom
import { withProvider } from "./setupTests";
import { Results } from '../pages/Results';
import { store } from '../redux/store';
import { login } from "../redux/authSlice";
import { answerOffsets } from "../utils/constants";

// Check page contents
test("Assert that the contents of the page are correct", async () => {
  // Simulate login
  store.dispatch(login({
    username: "splasse",
    email: "spencerplasse@gmail.com"
  }));

  useTestResults("spencerplasse@gmail.com");

  render(withProvider(<Results />));

  expect(screen.getByRole("table")).toBeInTheDocument();
});

function useTestResults(email){
  const currentDatetime = new Date();
  const oldData = JSON.parse(localStorage.getItem(email));

  const newData = {
    ...oldData,
    results: {
      [currentDatetime]: {
        dateOfBirth: "01-01-2000",
        doesWorkout: answerOffsets["Never"],
        doesEatJunkFood: answerOffsets["Sometimes"],
        canTouchToes: answerOffsets["No"],
        bodyAge: (currentDatetime.getFullYear() - new Date("01-01-2000").getFullYear())
                  + (answerOffsets["Never"] + answerOffsets["Sometimes"] + answerOffsets["No"]),
        completedDate: currentDatetime.toISOString()
      },
      [new Date("09-02-2022")]: {
        dateOfBirth: "05-05-2006",
        doesWorkout: answerOffsets["Sometimes"],
        doesEatJunkFood: answerOffsets["Always"],
        canTouchToes: answerOffsets["Yes"],
        bodyAge: (currentDatetime.getFullYear() - new Date("05-05-2006").getFullYear())
                  + (answerOffsets["Sometimes"] + answerOffsets["Always"] + answerOffsets["Yes"]),
        completedDate: currentDatetime.toISOString()
      }
    }
  };

  localStorage.setItem(email, JSON.stringify(newData));
}