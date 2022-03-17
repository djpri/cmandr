import React from "react";
import { mockStore } from "redux/mockStore";
import { render } from "../../../test/test-utils";
import CommandsList from "./CommandsList";

test.skip("renders without crashing", () => {
  render(<CommandsList commands={mockStore.commands.commands} />);
});
