import React from "react";
import LinksList from "./LinksList";
import { render } from "../../../test-utils";

test("renders without crashing", () => {
  render(<LinksList showCategories />);
});
