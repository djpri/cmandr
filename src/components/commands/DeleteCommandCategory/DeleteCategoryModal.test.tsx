import React from "react";
import DeleteCategoryModal from "./DeleteCategoryModal";
import { render } from "../../../test-utils";

test("renders without crashing", () => {
  render(
    <DeleteCategoryModal
      isOpen={false}
      onClose={() => {}}
      categoryName="general"
      categoryId={1}
    />
  );
});
