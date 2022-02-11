import React from "react";
import AddCommandForm from "./AddCommandForm";
import { render } from "../../../test-utils";

test.skip("renders without crashing", () => {
  render(<AddCommandForm />);
});
