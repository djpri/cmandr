import React from "react";
import { App } from "./App";
import { render } from "./test-utils";

test("App component renders without crashing", () => {
  render(<App />);
});
