import React from "react";
import { render } from "../../../tests/test-utils";
import SideBar from "./SideBar";

test.skip("renders without crashing", () => {
  render(<SideBar />);
});
