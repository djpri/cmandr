import React from "react";
import CommandsList from "./CommandsList";
import { render } from "../../../test-utils";
import { mockStore } from "redux/mockStore";

test.skip("renders without crashing", () => {
  render(
    <CommandsList showCategories commands={mockStore.commands.commands} />
  );
});
