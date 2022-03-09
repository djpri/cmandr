import React from "react";
import LoginButton from "./LoginButton";
import { render, screen } from "../../../test-utils";

test("Login button shows correct text", () => {
  render(<LoginButton />);
  const linkElement = screen.getByText(/Log In/i);
  expect(linkElement).toBeInTheDocument();
});
