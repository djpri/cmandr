import React from "react";
import CommandsTable from "./CommandsTable";
import { render } from "../../../test-utils";
import { mockStore } from "../../../redux/mockStore";

test("renders without crashing", () => {
  render(
    <CommandsTable commands={mockStore.commands.commands} showCategories />
  );
});
