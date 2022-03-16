import React from "react";
import EditLinkCategory from "./EditLinkCategory";
import { render } from "../../../test-utils";

test.skip("renders without crashing", () => {
  render(
    <EditLinkCategory categoryId={"1"} isOpen={() => {}} onClose={() => {}} />
  );
});
