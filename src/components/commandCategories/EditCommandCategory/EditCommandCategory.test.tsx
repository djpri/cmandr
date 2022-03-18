import React from "react";
import { render } from "../../../tests/test-utils";
import EditCommandCategory from "./EditCommandCategory";

test.skip("renders without crashing", () => {
  render(
    <EditCommandCategory isOpen={true} onClose={() => {}} categoryId={5} />
  );
});
