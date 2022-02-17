import React from "react";
import LoginDrawer from "./LoginDrawer";
import { render } from "../../../test-utils";

test("renders without crashing", () => {
  render(<LoginDrawer />);
});
