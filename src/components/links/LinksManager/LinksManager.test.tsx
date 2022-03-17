import React from "react";
import { render } from "../../../test/test-utils";
import LinksManager from "./LinksManager";

test.skip("renders without crashing", () => {
  render(<LinksManager showCategories links={[]} />);
});
