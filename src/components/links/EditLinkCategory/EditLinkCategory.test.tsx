import React from "react";
import EditLinkCategory from "./EditLinkCategory";
import { render, screen } from "../../../test-utils";

test("renders without crashing", () => {
    render(<EditLinkCategory categoryId={"1"} isOpen={() => { }} onClose={() => { }} />);
});
