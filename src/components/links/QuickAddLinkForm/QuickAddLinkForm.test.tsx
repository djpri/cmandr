import React from "react";
import { render } from "../../../tests/test-utils";
import QuickAddLinkForm from "./QuickAddLinkForm";

test("renders without crashing", () => {
  render(<QuickAddLinkForm />);
});
