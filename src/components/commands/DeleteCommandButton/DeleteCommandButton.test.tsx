import React from "react";
import DeleteCommandButton from "./DeleteCommandButton";
import { render } from "../../../test-utils";

test("renders without crashing", () => {
  render(<DeleteCommandButton onClose={() => {}} commandId={5} />);
});
