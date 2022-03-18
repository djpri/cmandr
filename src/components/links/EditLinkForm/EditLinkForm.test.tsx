import { Link } from "models/link";
import React from "react";
import { render, waitFor } from "../../../tests/test-utils";
import EditLinkForm from "./EditLinkForm";

const testLink: Link = {
  id: 1,
  title: "laravel",
  url: "https://laravel.com/docs/8.x#getting-started-on-windows",
  category: { id: 1, name: "general" },
};

test("Renders EditLinkForm with correct link item passed in as prop", async () => {
  render(<EditLinkForm linkItem={testLink} onClose={() => {}} />);
  await waitFor(() => Promise.resolve());
});
