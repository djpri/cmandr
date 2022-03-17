import React from "react";
import { render } from "../../../test/test-utils";
import CreateCommand from "./CreateCommand";

test.skip("renders without crashing", () => {
  render(<CreateCommand />);
});
