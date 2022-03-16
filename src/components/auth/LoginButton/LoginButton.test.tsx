import React from "react";
import LoginButton from "./LoginButton";
import { render, screen } from "../../../test-utils";
import { waitFor } from "@testing-library/react";

test("Login button shows correct text", async () => {
  render(<LoginButton />);
  const linkElement = screen.getByText(/Log In/i);
  expect(linkElement).toBeInTheDocument();

  await waitFor(() => Promise.resolve());
});
