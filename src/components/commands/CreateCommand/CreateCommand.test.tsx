import React from "react";
import CreateCommand from "./CreateCommand";
import { render, screen } from "../../../test-utils";

test("renders without crashing", () => {
  render(<CreateCommand />);
});
