import React from "react";
import { render } from "../../../tests/test-utils";
import AddCommandForm from "./AddCommandForm";

test("renders without crashing", () => {
  render(<AddCommandForm />);
});
