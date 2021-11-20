import React from "react";
import LinksTable from "./LinksGrid";
import { render } from "../../../../test-utils";
import { mockStore } from "../../../../redux/mockStore";

test("renders without crashing", () => {
  render(<LinksTable links={mockStore.links.links} showCategories />);
});
