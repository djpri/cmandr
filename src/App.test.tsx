import React from "react";
import { App } from "./App";
import { render, screen } from "./test-utils";

test("renders without crashing", () => {
  render(<App />);
  const linkElement = screen.getByText(/cmandr/i);
  expect(linkElement).toBeInTheDocument();
});
