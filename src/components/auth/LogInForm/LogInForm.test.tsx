import React from "react";
import LogInForm from "./LogInForm";
import { render, screen } from "../../../test-utils";

test("renders sign up button", () => {
  render(<LogInForm />);
  const linkElement = screen.getByText(/log in/i);
  expect(linkElement).toBeInTheDocument();
});
