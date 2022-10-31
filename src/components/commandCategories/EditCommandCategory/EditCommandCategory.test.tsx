import React from "react";
import { render } from "../../../tests/test-utils";
import EditCommandCategory from "./EditCommandCategory";

test("renders without crashing", () => {
  render(
      // eslint-disable-next-line @typescript-eslint/no-empty-function
    <EditCommandCategory isOpen={true} onClose={() => {}} categoryId={5} />
  );
});
