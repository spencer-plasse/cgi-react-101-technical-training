// Redux
import { store } from "../redux/store";

// Testing
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom';

// Custom
import App from "../components/App";
import { Login } from '../pages/Login';
import { login } from "../redux/authSlice";
import { withProvider } from "./setupTests";

// Check page contents
test("Assert that the contents of the page are correct", async () => {
  render(withProvider(<Login />));

  expect(screen.getAllByText("Log In").length).toEqual(2);
});

// Attempt to log in
test("Attempt to log into a user account", async () => {
  const { rerender } = render(withProvider(<App />));
  await userEvent.click(screen.getByText("Login"));

  // Necessary because localStorage data is relative to each run of the test, so registrations will be
  // refreshed when tests are ran again. A user must exist in localStorage for the login code wrapped
  // in the act() below to be successful.
  localStorage.setItem("spencerplasse@gmail.com", JSON.stringify({
    username: "splasse",
    password: "password"
  }));

  // Enter credentials and submit form
  await userEvent.type(screen.getByLabelText("Email Address"), "spencerplasse@gmail.com");
  await userEvent.type(screen.getByLabelText("Password"), "password");
  
  // Simulate the user clicking the Log In button
  await act(async() => {
    await userEvent.click(screen.getByTitle("login"));
    store.dispatch(login({
      username: "splasse",
      email: "spencerplasse@gmail.com"
    }));
  });

  // Re-render the app with the newly logged-in state
  rerender(withProvider(<App />));

  // Make sure the Header element correctly displays the username when logged in
  expect(screen.getByTitle("userStatus")).toHaveTextContent(/splasse/);
});