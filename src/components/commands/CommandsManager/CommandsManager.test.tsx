import React from "react";
import { mockStore } from "redux/mockStore";
import { render } from "../../../test/test-utils";
import CommandsManager from "./CommandsManager";

test.skip("renders without crashing", () => {
  render(<CommandsManager commands={mockStore.commands.commands} />);
});
