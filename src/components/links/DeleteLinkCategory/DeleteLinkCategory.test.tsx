import React from "react";
import DeleteLinkCategory from "./DeleteLinkCategory";
import { render } from "../../../test-utils";

test("renders with correct props", () => {
  render(
    <DeleteLinkCategory
      isOpen={false}
      onClose={() => {}}
      categoryName="general"
      categoryId={1}
    />
  );
});
