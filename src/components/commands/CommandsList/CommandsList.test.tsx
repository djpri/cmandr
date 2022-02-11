import React from "react";
import CommandsList from "./CommandsList";
import { render } from "../../../test-utils";
import { Command } from "../../../models/models";

test("renders without crashing", () => {
  render(<CommandsList showCategories />);
});
