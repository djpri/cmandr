import { waitFor } from "@testing-library/react";
import React from "react";
import { render, screen } from "../../../test/test-utils";
import LoginButton from "./LoginButton";

test("Login button shows correct text", async () => {
  render(<LoginButton />);
  const linkElement = screen.getByText(/Log In/i);
  expect(linkElement).toBeInTheDocument();

  await waitFor(() => Promise.resolve());
});
