import React from "react";
import { render, waitFor } from "../../../test-utils";
import DeleteCategoryModal from "./DeleteCategoryModal";

test("Model renders with correct props passed in", async () => {
  render(
    <DeleteCategoryModal
      isOpen={false}
      onClose={() => {}}
      categoryName="general"
      categoryId={1}
    />
  );
  await waitFor(() => Promise.resolve());
});
