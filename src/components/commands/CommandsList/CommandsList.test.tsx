import React from "react";
import CommandsList from "./CommandsList";
import { render } from "../../../test-utils";

test.skip("renders without crashing", () => {
  render(<CommandsList showCategories />);
});
