// Testing
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom';

// Custom
import { withProvider } from "./setupTests";
import App from '../components/App';
import { store } from '../redux/store';
import { login } from "../redux/authSlice";

// Check page contents and validate that logging out reflects in the navbar
test("Assert the page contents are correct and logouts are correctly reflected", async () => {
  // Simulate login
  store.dispatch(login({
    username: "splasse",
    email: "spencerplasse@gmail.com"
  }));

  render(withProvider(<App />));

  await act(async () => {
    await userEvent.click(screen.getByText("Log Out"));
  });
  
  expect(screen.getByText(/Are you sure/)).toBeInTheDocument();

  await act(async () => {
    await userEvent.click(screen.getByTitle("logout"));
  });

  expect(screen.getByText("Login")).toBeInTheDocument();
});