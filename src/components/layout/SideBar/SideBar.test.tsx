import React from "react";
import SideBar from "./SideBar";
import { render } from "../../../test-utils";

test.skip("renders without crashing", () => {
  render(<SideBar />);
});
