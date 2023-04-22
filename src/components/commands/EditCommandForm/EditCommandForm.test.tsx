import userEvent from "@testing-library/user-event";
import { customRender, waitFor } from "tests/test-utils";
import { testData } from "tests/testData";
import EditCommandForm from "./EditCommandForm";

const testCommand = testData.commands[0];

test("Displays default values correctly", async () => {
  const { getByText } = customRender(
    <EditCommandForm commandItem={testCommand} onClose={vi.fn()} />
  );
  expect(getByText("Description")).toBeInTheDocument();
  expect(getByText("Command")).toBeInTheDocument();
  expect(getByText("Category")).toBeInTheDocument();
});

test("Displays validation messages correctly", async () => {
  const { findByText, getByRole, getByPlaceholderText } = customRender(
    <EditCommandForm commandItem={testCommand} onClose={vi.fn()} />
  );
  const submitButton = getByRole("button", { name: /Save command/i });
  const referenceInput = getByPlaceholderText(/Reference/i);
  userEvent.type(referenceInput, "notavalidurl");
  submitButton.click();
  expect(await findByText(/Link is not a valid URL/i)).toBeInTheDocument();
  expect(await findByText(/Command is required/i)).toBeInTheDocument();
  expect(await findByText(/Description is required/i)).toBeInTheDocument();
});

test("Submits form correctly", async () => {
  const { getByRole, getByPlaceholderText } = customRender(
    <EditCommandForm commandItem={testCommand} onClose={vi.fn()} />
  );
  const submitButton = getByRole("button", { name: /Save command/i });
  const descriptionInput = getByPlaceholderText(/Description/i);
  const commandInput = getByPlaceholderText("Command");
  const referenceInput = getByPlaceholderText(/Reference/i);
  userEvent.type(descriptionInput, "test description");
  userEvent.type(commandInput, "test command");
  userEvent.type(referenceInput, "https://www.google.com");

  submitButton.click();

  await waitFor(() => {
    expect(commandInput).toHaveValue("");
    expect(descriptionInput).toHaveValue("");
  });
});
