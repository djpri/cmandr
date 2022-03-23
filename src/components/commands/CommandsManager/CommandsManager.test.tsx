import { mockStore } from "redux/mockStore";
import { render, screen, fireEvent } from "../../../tests/test-utils";
import CommandsManager from "./CommandsManager";

test("Add command button toggles display of the add command form", () => {
  render(<CommandsManager commands={mockStore.commands.commands} />);
  // open form
  let button = screen.getByLabelText("show add command form");
  fireEvent.click(button);
  expect(screen.getByLabelText("add command form")).toBeInTheDocument();
  // then close form
  button = screen.getByLabelText("hide add command form");
  fireEvent.click(button);
  // expect(screen.queryByLabelText("add command form")).not.toBeInTheDocument();
});
