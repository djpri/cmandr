/* eslint-disable @typescript-eslint/no-empty-function */
import React from "react";
import { render } from "../../../tests/test-utils";
import DeleteLinkCategory from "./DeleteLinkCategory";

test("renders with correct props", async () => {
  render(
    <DeleteLinkCategory
      isOpen={false}
      onClose={() => {}}
      categoryName="general"
      categoryId={1}
    />
  );
});
