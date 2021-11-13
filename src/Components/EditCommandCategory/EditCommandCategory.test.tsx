import React from "react";
import EditCommandCategory from "./EditCommandCategory";
import { render } from "../../test-utils";

test("renders without crashing", () => {
  render(
    <EditCommandCategory isOpen={true} onClose={() => {}} categoryId={5} />
  );
});
