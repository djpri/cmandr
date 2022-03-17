import React from "react";
import { mockStore } from "../../../../redux/mockStore";
import { render, waitFor } from "../../../../test/test-utils";
import LinksTable from "./LinksGrid";

test("Render LinksTable with correct props", async () => {
  render(<LinksTable links={mockStore.links.links} showCategories isLoading />);
  await waitFor(() => Promise.resolve());
});
