// Testing
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

// Custom
import { withProvider } from "./setupTests";
import App from '../components/App';
import { store } from '../redux/store';
import { login } from "../redux/authSlice";

// WARNING: THIS TEST WILL FAIL
// Check page contents
test("Assert that the contents of the page are correct", async () => {
  // Simulate login
  store.dispatch(login({
    username: "splasse",
    email: "spencerplasse@gmail.com"
  }));

  render(withProvider(<App />));
  await userEvent.click(screen.getByText("Logout"));

  expect(screen.getByText(/Are you sure/)).toBeInTheDocument();
});