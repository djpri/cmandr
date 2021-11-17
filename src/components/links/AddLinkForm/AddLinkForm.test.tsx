import React from "react";
import AddLinkForm from "./AddLinkForm";
import { render, screen } from "../../../test-utils";

test("renders without crashing", () => {
  render(<AddLinkForm />);
});
