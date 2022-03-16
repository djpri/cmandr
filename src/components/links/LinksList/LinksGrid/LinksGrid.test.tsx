import React from "react";
import LinksTable from "./LinksGrid";
import { render, waitFor } from "../../../../test-utils";
import { mockStore } from "../../../../redux/mockStore";

test("Render LinksTable with correct props", async () => {
  render(<LinksTable links={mockStore.links.links} showCategories isLoading />);
  await waitFor(() => Promise.resolve());
});
