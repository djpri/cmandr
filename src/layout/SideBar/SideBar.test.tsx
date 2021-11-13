import React from 'react';
import SideBar from "./SideBar";
import { render, screen } from "../../test-utils";

test("renders without crashing", () => {
  render(<SideBar />);
});
