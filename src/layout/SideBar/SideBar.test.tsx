import React from 'react';
import SideBar from "./SideBar";
import { render } from "../../test-utils";

test("renders without crashing", () => {
  render(<SideBar />);
});
