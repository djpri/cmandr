import React from 'react';
import NavBar from "./NavBar";
import { render, screen } from "../../test-utils";

test("renders without crashing", () => {
  render(<NavBar />);
});
