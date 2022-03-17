import React from "react";
import { render } from "../../../test/test-utils";
import NavBar from "./NavBar";

test.skip("renders without crashing", () => {
  render(<NavBar />);
});
