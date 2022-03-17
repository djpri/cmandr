import React from "react";
import { testAccount } from "test/testConstants";
import { fireEvent, render, screen, waitFor } from "../../../test/test-utils";
import LoginDrawer from "./LoginDrawer";

test("Shows display name for logged in user", async () => {
  render(<LoginDrawer />);
  // click popover button
  const button = screen.getByRole("button");
  fireEvent.click(button);
  // then check that display name is visible
  const leftText = screen.getByText(/Signed in as/i);
  const displayName = screen.getByText(testAccount.name);

  expect(leftText).toBeInTheDocument();
  expect(displayName).toBeInTheDocument();

  await waitFor(() => Promise.resolve());
});
