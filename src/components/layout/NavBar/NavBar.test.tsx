import React from "react";
import NavBar from "./NavBar";
import { render } from "../../../test-utils";

test.skip("renders without crashing", () => {
  render(<NavBar />);
});
