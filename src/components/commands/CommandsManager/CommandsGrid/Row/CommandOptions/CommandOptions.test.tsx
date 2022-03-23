import { Command } from "models/command";
import { fireEvent, render, screen } from "../../../../../../tests/test-utils";
import CommandOptions from "./CommandOptions";

const testCommand: Command = {
  line: "php artisan serve",
  description: "serve laravel app",
  reference: "https://laravel.com/docs/8.x#getting-started-on-windows",
  category: { id: 1, name: "general" },
  id: 10,
};

test("Shows edit and delete buttons when clicked", async () => {
  render(<CommandOptions command={testCommand} />);
  const button = screen.getByRole("button");
  fireEvent.click(button);

  expect(screen.getByText("Options")).toBeInTheDocument();
  expect(screen.getByText("Edit")).toBeInTheDocument();
  expect(screen.getByText("Delete")).toBeInTheDocument();
});

test("Shows edit form with correct default information when edit button is clicked", async () => {
  render(<CommandOptions command={testCommand} />);

  // click button
  const button = screen.getByRole("button");
  fireEvent.click(button);

  // then click the edit button
  const editButton = screen.getByText("Edit");
  fireEvent.click(editButton);

  // then view the edit command form
  expect(screen.getByLabelText("edit command form")).toBeInTheDocument();

  expect(screen.getByDisplayValue(testCommand.description)).toBeInTheDocument();
  expect(screen.getByDisplayValue(testCommand.line)).toBeInTheDocument();
  expect(screen.getByText(/Select Category/i)).toBeInTheDocument();
  expect(screen.getByDisplayValue(testCommand.reference)).toBeInTheDocument();
  expect(screen.getByText("Save")).toBeInTheDocument();
});
