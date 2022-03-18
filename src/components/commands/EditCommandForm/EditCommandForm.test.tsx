import React from "react";
import { Command } from "../../../models/command";
import { render, waitFor } from "../../../tests/test-utils";
import EditCommandForm from "./EditCommandForm";

const testCommand: Command = {
  line: "php artisan serve",
  description: "serve laravel app",
  reference: "https://laravel.com/docs/8.x#getting-started-on-windows",
  category: { id: 1, name: "general" },
  id: 10,
};

test("Renders with correct command passed in as prop", async () => {
  render(<EditCommandForm commandItem={testCommand} onClose={() => {}} />);
  await waitFor(() => Promise.resolve());
});
