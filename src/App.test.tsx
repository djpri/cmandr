import React from "react";
import { App } from "./App";
import { render } from "./test-utils";

test("renders without crashing", () => {
  render(<App />);
});
