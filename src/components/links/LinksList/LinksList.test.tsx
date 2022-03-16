import React from "react";
import LinksList from "./LinksList";
import { render } from "../../../test-utils";

test.skip("renders without crashing", () => {
  render(<LinksList showCategories links={[]} />);
});
