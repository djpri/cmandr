import { CommandReadDto } from "models/command";
import {
  customRender,
  fireEvent,
  screen,
} from "../../../../../../tests/test-utils";
import CommandOptions from "./CommandOptions";

const testCommand: CommandReadDto = {
  line: "php artisan serve",
  description: "serve laravel app",
  reference: "https://laravel.com/docs/8.x#getting-started-on-windows",
  category: { id: 1, name: "general" },
  id: 10,
};

test("Shows edit and delete buttons", async () => {
  customRender(<CommandOptions command={testCommand} />);
  const editButton = screen.getByLabelText(/edit/i);
  const deleteButton = screen.getByLabelText(/delete/i);
  expect(editButton).toBeInTheDocument();
  expect(deleteButton).toBeInTheDocument();
});

test("Shows edit form with correct default information when edit button is clicked", async () => {
  customRender(<CommandOptions command={testCommand} />);
  
  // click edit button
  const editButton = screen.getByLabelText(/edit/i);
  fireEvent.click(editButton);

  // then view the edit command form
  expect(screen.getByLabelText("edit command form")).toBeInTheDocument();

  expect(screen.getByDisplayValue(testCommand.description)).toBeInTheDocument();
  expect(screen.getByDisplayValue(testCommand.line)).toBeInTheDocument();
  expect(screen.getByText(/Select Category/i)).toBeInTheDocument();
  expect(screen.getByDisplayValue(testCommand.reference)).toBeInTheDocument();
  expect(screen.getByText("Save")).toBeInTheDocument();
});
