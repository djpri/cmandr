import React from "react";
import CreateCommand from "./CreateCommand";
import { render } from "../../../test-utils";

test.skip("renders without crashing", () => {
  render(<CreateCommand />);
});
