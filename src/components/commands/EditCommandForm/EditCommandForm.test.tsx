import React from "react";
import { Command } from "../../../models/command";
import { render } from "../../../test-utils";
import EditCommandForm from "./EditCommandForm";

const testCommand: Command = {
  line: "php artisan serve",
  description: "serve laravel app",
  reference: "https://laravel.com/docs/8.x#getting-started-on-windows",
  category: { id: 1, name: "general" },
  id: 10,
};

test("Renders with correct command passed in as prop", () => {
  render(<EditCommandForm commandItem={testCommand} onClose={() => {}} />);
});
