import React from 'react';
import LinksList from "./LinksList";
import { render, screen } from "../../test-utils";

test("renders without crashing", () => {
  render(<LinksList />);
});
