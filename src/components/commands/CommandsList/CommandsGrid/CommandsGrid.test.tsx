import React from "react";
import CommandsTable from "./CommandsGrid";
import { render } from "../../../../test-utils";
import { mockStore } from "../../../../redux/mockStore";

test("Render CommandsTable with correct props", () => {
  render(
    <CommandsTable commands={mockStore.commands.commands} showCategories />
  );
});
