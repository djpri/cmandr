import userEvent from "@testing-library/user-event";
import { customRender, waitFor } from "tests/test-utils";
import AddCommandForm from "./AddCommandForm";

test("Displays default values correctly without categoryId prop", async () => {
  const { getByText } = customRender(<AddCommandForm />);
  expect(getByText("Description")).toBeInTheDocument();
  expect(getByText("Command")).toBeInTheDocument();
  expect(getByText("Category")).toBeInTheDocument();
});

test("Displays default values correctly with categoryId prop", async () => {
  const { getByText, queryByText } = customRender(
    <AddCommandForm categoryId={1} />
  );
  expect(getByText("Description")).toBeInTheDocument();
  expect(getByText("Command")).toBeInTheDocument();
  expect(queryByText("Category")).toBeNull();
});

test("Displays validation messages correctly", async () => {
  const { findByText, getByRole, getByPlaceholderText } = customRender(
    <AddCommandForm />
  );
  const submitButton = getByRole("button", { name: /Add command/i });
  const referenceInput = getByPlaceholderText(/Reference/i);
  userEvent.type(referenceInput, "notavalidurl");
  submitButton.click();
  expect(await findByText(/Link is not a valid URL/i)).toBeInTheDocument();
  expect(await findByText(/Command is required/i)).toBeInTheDocument();
  expect(await findByText(/Description is required/i)).toBeInTheDocument();
});

test("Submits form correctly", async () => {
  const { getByRole, getByPlaceholderText } = customRender(
    <AddCommandForm categoryId={1} />
  );
  const submitButton = getByRole("button", { name: /Add command/i });
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
