import React from "react";
import { render, screen } from "../../../tests/test-utils";
import SignOutButton from "./SignOutButton";

test.skip("renders without crashing", () => {
  render(<SignOutButton />);
  const linkElement = screen.getByText(/Sign Out/i);
  expect(linkElement).toBeInTheDocument();
});
