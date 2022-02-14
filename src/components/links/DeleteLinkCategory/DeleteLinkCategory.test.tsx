import React from "react";
import DeleteLinkCategory from "./DeleteLinkCategory";
import { render } from "../../../test-utils";

test("renders without crashing", () => {
  render(
    <DeleteLinkCategory
      isOpen={false}
      onClose={() => {}}
      categoryName="general"
      categoryId={1}
    />
  );
});
