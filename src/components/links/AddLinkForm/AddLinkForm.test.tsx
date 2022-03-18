import React from "react";
import { render } from "../../../tests/test-utils";
import AddLinkForm from "./AddLinkForm";

test.skip("renders without crashing", () => {
  render(<AddLinkForm />);
});
