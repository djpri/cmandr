import React from "react";
import LinksTable from "./LinksGrid";
import { render } from "../../../../test-utils";
import { mockStore } from "../../../../redux/mockStore";

test("Render LinksTable with correct props", () => {
  render(<LinksTable links={mockStore.links.links} showCategories isLoading />);
});
