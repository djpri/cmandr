import React from 'react';
import EditCommandCategory from "./EditCommandCategory";
import { render, screen } from "../../test-utils";

test("renders without crashing", () => {
  render(<EditCommandCategory />);
});
