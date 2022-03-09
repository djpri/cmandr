import React from "react";
import EditLinkForm from "./EditLinkForm";
import { render } from "../../../test-utils";
import { Link } from "../../../api/models/link";

const testLink: Link = {
  id: 1,
  title: "laravel",
  link: "https://laravel.com/docs/8.x#getting-started-on-windows",
  category: { id: 1, name: "general" },
};

test("Renders EditLinkForm with correct link item passed in as prop", () => {
  render(<EditLinkForm linkItem={testLink} onClose={() => {}} />);
});
