import React from "react";
import { render } from "../../../test/test-utils";
import AddCommandForm from "./AddCommandForm";

test.skip("renders without crashing", () => {
  render(<AddCommandForm />);
});
