import React from "react";
import AddCommandCategory from "./AddCommandCategory";
import { render, screen } from "../../../test-utils";

test("renders without crashing", () => {
  render(<AddCommandCategory />);
});
