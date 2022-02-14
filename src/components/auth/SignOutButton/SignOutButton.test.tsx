import React from "react";
import SignOutButton from "./SignOutButton";
import { render } from "../../../test-utils";

test.skip("renders without crashing", () => {
  render(<SignOutButton />);
});
