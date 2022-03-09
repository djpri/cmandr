import React from "react";
import LoginButton from "./LoginButton";
import { render, screen } from "../../../test-utils";

test("renders login button", () => {
  render(<LoginButton />);
  const linkElement = screen.getByText(/Log In/i);
  expect(linkElement).toBeInTheDocument();
});
