import React from "react";
import CommandsList from "./CommandsList";
import { render } from "../../test-utils";
import { mockStore } from "../../redux/mockStore";

test("renders without crashing", () => {
  render(
    <CommandsList commands={mockStore.commands.commands} showCategories />
  );
});
