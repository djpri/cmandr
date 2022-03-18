import React from "react";
import { render } from "../../../tests/test-utils";
import DeleteCommandButton from "./DeleteCommandButton";

test("renders without crashing", () => {
  render(<DeleteCommandButton onClose={() => {}} commandId={5} />);
});
