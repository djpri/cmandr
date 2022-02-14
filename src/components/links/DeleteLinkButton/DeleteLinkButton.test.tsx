import React from "react";
import DeleteLinkButton from "./DeleteLinkButton";
import { render } from "../../../test-utils";

test("renders without crashing", () => {
    render(<DeleteLinkButton linkId={0} onClose={() => {}} />);
});
