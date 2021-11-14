import React from 'react';
import Links from "./Links";
import { render, screen } from "../../test-utils";

test("renders without crashing", () => {
  render(<Links />);
});
