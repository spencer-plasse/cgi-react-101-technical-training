// Redux
import { store } from "../redux/store";

// Testing
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

// Custom
import App from "../components/App";
import { Login } from '../pages/Login';
import { withProvider } from "./setupTests";

// Check page contents
test("Assert that the contents of the page are correct", async () => {
  render(withProvider(<Login />));

  expect(screen.getAllByText("Log In").length).toEqual(2);
});

// WARNING: THIS TEST WILL THROW ERRORS (due to not having localStorage access)
// Attempt to log in
test("Attempt to log into a user account", async () => {
  render(withProvider(<App />));
  await userEvent.click(screen.getByText("Login"));

  // Enter credentials and submit form
  await userEvent.type(screen.getByLabelText("Email Address"), "spencerplasse@gmail.com");
  await userEvent.type(screen.getByLabelText("Password"), "password");
  await userEvent.click(screen.getByTitle("login"));

  // Assert whether the Redux state was correctly updated
  expect(store.getState().auth.loggedIn).toEqual(true);
  expect(store.getState().auth.user.email).toEqual("spencerplasse@gmail.com");

  // Assert that the user was redirected to the home page
  expect(screen.getByRole("heading")).toHaveTextContent("Welcome to the Body Age Calculator!");
});