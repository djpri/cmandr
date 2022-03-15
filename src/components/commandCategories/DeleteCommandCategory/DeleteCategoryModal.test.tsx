import React from "react";
import { render } from "../../../test-utils";
import DeleteCategoryModal from "./DeleteCategoryModal";

test("Model renders with correct props passed in", () => {
  render(
    <DeleteCategoryModal
      isOpen={false}
      onClose={() => {}}
      categoryName="general"
      categoryId={1}
    />
  );
});
