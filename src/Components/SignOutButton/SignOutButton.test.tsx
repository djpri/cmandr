import React from 'react';
import SignOutButton from "./SignOutButton";
import { render, screen } from "../../test-utils";

test("renders without crashing", () => {
  render(<SignOutButton />);
});
