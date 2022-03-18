import React from "react";
import { render } from "../../../tests/test-utils";
import DeleteLinkButton from "./DeleteLinkButton";

test.skip("renders without crashing", () => {
  render(<DeleteLinkButton linkId={0} onClose={() => {}} />);
});
