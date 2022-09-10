// React
import React from "react";

// Redux
import { store } from "../redux/store";
import { login } from "../redux/authSlice";

// Testing
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

// Custom
import App from "../components/App";
import { withProvider } from "./setupTests";

// Correct elements when logged out?
test("Asserts whether the navbar is populated with the correct elements on startup", async () => {
  render(withProvider(<App />));

  // Select elements in the navbar (while logged out)
  const navbarElements = screen.getAllByRole("button");

  expect(navbarElements[0]).toHaveTextContent("CGI");
  expect(navbarElements[1]).toHaveTextContent("Login");
  expect(navbarElements[2]).toHaveTextContent("Register");
});

// CGI header links to "/home"?
test("Simulates clicking the CGI link to the home page in the navbar", async () => {
  render(withProvider(<App />));

  // "CGI" header in the navbar should link to "/home" as well
  await userEvent.click(screen.getByText("CGI"));
  expect(screen.getByRole("heading")).toHaveTextContent("Welcome to the Body Age Calculator!");
});

// Login links to "/login"?
test("Simulates clicking the Login link to the home page in the navbar", async () => {
  render(withProvider(<App />));

  await userEvent.click(screen.getByText("Login"));
  expect(screen.getAllByText("Log In").length).toEqual(2);
});

// Register links to "/register"?
test("Simulates clicking the Register link to the home page in the navbar", async () => {
  render(withProvider(<App />));

  await userEvent.click(screen.getByText("Register"));
  expect(screen.getAllByText("Register").length).toEqual(3);
});

// 
test("Asserts whether the navbar is populated with the correct elements when logged in", async () => {
  // Simulate logging in
  store.dispatch(login({
    username: "splasse", email: "spencerplasse@gmail.com"
  }));
  
  render(withProvider(<App />));

  // Select elements in the navbar (while logged in)
  const navbarLinks = screen.getAllByRole("button");
  const userStatus = screen.getByText("Signed in as");

  expect(navbarLinks[0]).toHaveTextContent("CGI");
  expect(navbarLinks[1]).toHaveTextContent("Questions");
  expect(navbarLinks[2]).toHaveTextContent("Results");
  expect(navbarLinks[3]).toHaveTextContent("Log Out");
  expect(userStatus).toHaveTextContent("Signed in as splasse");
});

// Questions links to "/questions"?
test("Simulates clicking the Questions link to the home page in the navbar", async () => {
  render(withProvider(<App />));

  await userEvent.click(screen.getByText("Questions"));

  expect(screen.getAllByRole("radio").length).toBeGreaterThan(0);
  expect(screen.getByText("Submit")).toHaveClass("btn-primary");
});

// Results links to "/results"?
test("Simulates clicking the Results link to the home page in the navbar", async () => {
  render(withProvider(<App />));

  await userEvent.click(screen.getByText("Results"));

  expect(screen.getByRole("table")).toBeInTheDocument();
  expect(screen.getByText("Filter")).toBeInTheDocument();
  expect(screen.getByText("Completed date")).toBeInTheDocument();
});

// Log Out links to "/logout"?
test("Simulates clicking the Log Out link to the home page in the navbar", async () => {
  render(withProvider(<App />));

  await userEvent.click(screen.getByText("Log Out"));
  expect(screen.getByText(/Are you sure/)).toHaveTextContent(`Are you sure you want to log out ${store.getState().auth.user.username}?`);
});