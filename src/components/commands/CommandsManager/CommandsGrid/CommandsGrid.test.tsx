import React from "react";
import { mockStore } from "../../../../redux/mockStore";
import { render, waitFor } from "../../../../test/test-utils";
import CommandsTable from "./CommandsGrid";

test("Render CommandsTable with correct props", async () => {
  render(
    <CommandsTable commands={mockStore.commands.commands} showCategories />
  );
  await waitFor(() => Promise.resolve());
});
