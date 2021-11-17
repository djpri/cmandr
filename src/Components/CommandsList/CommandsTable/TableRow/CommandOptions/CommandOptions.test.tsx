import React from "react";
import { render, screen, fireEvent } from "../../../../../test-utils";
import { Command } from "../../../../../types/types";
import CommandOptions from "./CommandOptions";

const testCommand: Command = {
  command: "php artisan serve",
  description: "serve laravel app",
  reference: "https://laravel.com/docs/8.x#getting-started-on-windows",
  category: { id: 1, name: "general" },
  id: 10,
};

test("Shows edit and delete buttons when clicked", () => {
  render(<CommandOptions command={testCommand} />);
  const button = screen.getByRole("button");
  fireEvent.click(button);
  const heading = screen.getByText("Options");
  const editButton = screen.getByText("Edit");
  const deleteButton = screen.getByText("Delete");
  expect(heading).toBeInTheDocument();
  expect(editButton).toBeInTheDocument();
  expect(deleteButton).toBeInTheDocument();
});

test("Shows edit form with correct default information when edit button is clicked", () => {
  render(<CommandOptions command={testCommand} />);
  // click button
  const button = screen.getByRole("button");
  fireEvent.click(button);
  // then click the edit button
  const editButton = screen.getByText("Edit");
  fireEvent.click(editButton);
  // then view the edit command form
  const defaultDescription = screen.getByDisplayValue(testCommand.description);
  const defaultCommand = screen.getByDisplayValue(testCommand.command);
  const defaultCategory = screen.getByDisplayValue(testCommand.category.name);
  const defaultReference = screen.getByDisplayValue(testCommand.reference);
  const saveButton = screen.getByText("Save");

  expect(defaultDescription).toBeInTheDocument();
  expect(defaultCommand).toBeInTheDocument();
  expect(defaultCategory).toBeInTheDocument();
  expect(defaultReference).toBeInTheDocument();
  expect(saveButton).toBeInTheDocument();
});
