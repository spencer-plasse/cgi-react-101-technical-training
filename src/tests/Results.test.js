// Testing
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';

// Custom
import { withProvider } from "./setupTests";
import { Results } from '../pages/Results';
import { store } from '../redux/store';
import { login } from "../redux/authSlice";

// Check page contents
test("Assert that the contents of the page are correct", async () => {
  // Simulate login
  store.dispatch(login({
    username: "splasse",
    email: "spencerplasse@gmail.com"
  }));

  render(withProvider(<Results />));

  expect(screen.getByRole("table")).toBeInTheDocument();
});