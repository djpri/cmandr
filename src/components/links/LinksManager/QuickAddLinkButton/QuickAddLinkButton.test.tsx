import React from "react";
import AddQuickLink from "./QuickAddLinkButton";
import { render } from "tests/test-utils";

test.skip("renders without crashing", () => {
  render(<AddQuickLink />);
});
