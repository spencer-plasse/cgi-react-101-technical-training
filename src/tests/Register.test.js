// Testing
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom';

// Custom
import App from "../components/App";
import { Register } from '../pages/Register';
import { withProvider } from "./setupTests";

// Check page contents
test("Assert that the contents of the page are correct", async () => {
  render(withProvider(<Register />));

  expect(screen.getAllByText("Register").length).toEqual(2);
});

// Attempt to log in
test("Attempt to register a new user account", async () => {
  const { rerender } = render(withProvider(<App />));
  await userEvent.click(screen.getByText("Register"));

  // Enter credentials and submit form
  await userEvent.type(screen.getByLabelText("Username"), "splasse");
  await userEvent.type(screen.getByLabelText("Email Address"), "spencerplasse@gmail.com");
  await userEvent.type(screen.getByLabelText("Password"), "password");

  await act(async () => {
    await userEvent.click(screen.getByTitle("register"));
  });

  // Assert that localStorage was updated correctly
  expect(localStorage.getItem("spencerplasse@gmail.com")).toContain("splasse");
  
  // Re-render the app to trigger the redirect
  rerender(withProvider(<App />));

  // Assert that the user was redirected to the login page
  expect(screen.getAllByText("Log In").length).toEqual(2);
});