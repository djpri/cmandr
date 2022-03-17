import React from "react";
import { render } from "../../../test/test-utils";
import SideBar from "./SideBar";

test.skip("renders without crashing", () => {
  render(<SideBar />);
});
