import React from "react";
import { render } from "../../../tests/test-utils";
import LinksManager from "./LinksManager";

test("renders without crashing", () => {
  render(<LinksManager links={[]} />);
});
