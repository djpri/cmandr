import React from "react";
import EditLinkForm from "./EditLinkForm";
import { render, screen } from "../../../test-utils";

test("renders without crashing", () => {
  render(<EditLinkForm />);
});
