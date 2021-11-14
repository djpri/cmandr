import React from 'react';
import AddLinkCategory from "./AddLinkCategory";
import { render, screen } from "../../test-utils";

test("renders without crashing", () => {
  render(<AddLinkCategory />);
});
