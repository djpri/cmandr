import React from "react";
import { render } from "../../../test/test-utils";
import DeleteCommandButton from "./DeleteCommandButton";

test.skip("renders without crashing", () => {
  render(<DeleteCommandButton onClose={() => {}} commandId={5} />);
});
