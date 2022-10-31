import React from "react";
import { render } from "../../../tests/test-utils";
import DeleteCommandButton from "./DeleteCommandButton";

test("renders without crashing", () => {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  render(<DeleteCommandButton onClose={() => {}} commandId={5} />);
});
