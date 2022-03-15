import { Link } from "models/link";
import { fireEvent, render, screen } from "test-utils";
import LinkOptions from "./LinkOptions";

const testLink: Link = {
  title: "Laravel",
  url: "https://laravel.com/docs/8.x#getting-started-on-windows",
  category: { id: 1, name: "general" },
  id: 10,
};

test("Shows edit and delete buttons when clicked", () => {
  render(<LinkOptions link={testLink} />);
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
  render(<LinkOptions link={testLink} />);
  // click button
  const button = screen.getByRole("button");
  fireEvent.click(button);
  // then click the edit button
  const editButton = screen.getByText("Edit");
  fireEvent.click(editButton);
  // then view the edit command form
  const defaultTitle = screen.getByDisplayValue(testLink.title);
  const defaultLink = screen.getByDisplayValue(testLink.url);
  const defaultCategory = screen.getByDisplayValue(testLink.category.name);
  const saveButton = screen.getByText("Save");

  expect(defaultTitle).toBeInTheDocument();
  expect(defaultLink).toBeInTheDocument();
  expect(defaultCategory).toBeInTheDocument();
  expect(saveButton).toBeInTheDocument();
});
