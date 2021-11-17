import React from "react";
import DeleteLinkButton from "./DeleteLinkButton";
import { render, screen } from "../../../test-utils";

test("renders without crashing", () => {
  render(<DeleteLinkButton />);
});
