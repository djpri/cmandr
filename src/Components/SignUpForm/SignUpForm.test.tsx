import React from "react";
import SignUpForm from "./SignUpForm";
import { render, screen } from "../../test-utils";

test("renders sign up button", () => {
  render(<SignUpForm />);
  const linkElement = screen.getByText(/sign up/i);
  expect(linkElement).toBeInTheDocument();
});
