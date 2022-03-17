import React from "react";
import { render } from "../../../test/test-utils";
import EditLinkCategory from "./EditLinkCategory";

test.skip("renders without crashing", () => {
  render(
    <EditLinkCategory categoryId={"1"} isOpen={() => {}} onClose={() => {}} />
  );
});
