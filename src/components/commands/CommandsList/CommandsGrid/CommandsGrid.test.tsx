import React from "react";
import CommandsTable from "./CommandsGrid";
import { render } from "../../../../test-utils";
import { mockStore } from "../../../../redux/mockStore";

test("renders without crashing", () => {
  render(
    <CommandsTable commands={mockStore.commands.commands} showCategories />
  );
});
