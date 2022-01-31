import React from "react";
import EditCommandForm from "./EditCommandForm";
import { render } from "../../../test-utils";
import { Command } from "../../../models/models";

const testCommand: Command = {
  command: "php artisan serve",
  description: "serve laravel app",
  reference: "https://laravel.com/docs/8.x#getting-started-on-windows",
  category: { id: 1, name: "general" },
  id: 10,
};

test("renders without crashing", () => {
  render(<EditCommandForm commandItem={testCommand} onClose={() => {}} />);
});
