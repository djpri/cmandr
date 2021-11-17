import React from "react";
import DeleteLinkCategory from "./DeleteLinkCategory";
import { render, screen } from "../../../test-utils";

test("renders without crashing", () => {
  render(<DeleteLinkCategory />);
});
