import React from "react";
import CommandsTable from "./CommandsGrid";
import { render, waitFor } from "../../../../test-utils";
import { mockStore } from "../../../../redux/mockStore";

test("Render CommandsTable with correct props", async () => {
  render(
    <CommandsTable commands={mockStore.commands.commands} showCategories />
  );
  await waitFor(() => Promise.resolve());
});
