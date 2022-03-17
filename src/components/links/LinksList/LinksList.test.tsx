import React from "react";
import { render } from "../../../test/test-utils";
import LinksList from "./LinksList";

test.skip("renders without crashing", () => {
  render(<LinksList showCategories links={[]} />);
});
