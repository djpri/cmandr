import React from "react";
import DeleteLinkCategory from "./DeleteLinkCategory";
import { render, waitFor } from "../../../test-utils";

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
