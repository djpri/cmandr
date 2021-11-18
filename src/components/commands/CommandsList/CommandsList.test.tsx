import React from "react";
import CommandsList from "./CommandsList";
import { render } from "../../../test-utils";

test("renders without crashing", () => {
  render(<CommandsList showCategories />);
});
