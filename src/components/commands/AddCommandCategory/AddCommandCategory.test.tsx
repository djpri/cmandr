import React from "react";
import AddCommandCategory from "./AddCommandCategory";
import { render } from "../../../test-utils";

test.skip("renders without crashing", () => {
  render(<AddCommandCategory />);
});
