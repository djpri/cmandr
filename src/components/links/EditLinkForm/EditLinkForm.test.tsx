import React from "react";
import EditLinkForm from "./EditLinkForm";
import { render } from "../../../test-utils";
import { Link } from "../../../models/models";

const testLink: Link = {
  id: 1,
  title: "laravel",
  link: "https://laravel.com/docs/8.x#getting-started-on-windows",
  category: { id: 1, name: "general" },
};

test("renders without crashing", () => {
  render(<EditLinkForm linkItem={testLink} onClose={() => {}} />);
});
