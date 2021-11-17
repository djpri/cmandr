import React from "react";
import AddLinkCategory from "./AddLinkCategory";
import { render } from "../../../test-utils";

test("renders without crashing", () => {
  render(<AddLinkCategory />);
});
