import React from "react";
import { render, waitFor } from "../../../test/test-utils";
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
  await waitFor(() => Promise.resolve());
});
