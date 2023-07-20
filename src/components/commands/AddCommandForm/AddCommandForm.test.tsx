import userEvent from "@testing-library/user-event";
import { customRender, waitFor } from "tests/test-utils";
import AddCommandForm from "./AddCommandForm";
import { errorMessages, registerOptions } from "../commandFormUtils";

test("Displays form labels correctly without categoryId prop", async () => {
  const { getByText } = customRender(<AddCommandForm />);

  expect(getByText("Description")).toBeInTheDocument();
  expect(getByText("Command")).toBeInTheDocument();
  expect(getByText("Category")).toBeInTheDocument();
});

test("Displays form labels correctly with categoryId prop", async () => {
  const { getByText, queryByText } = customRender(
    <AddCommandForm categoryId={1} />
  );
  expect(getByText("Description")).toBeInTheDocument();
  expect(getByText("Command")).toBeInTheDocument();
  expect(queryByText("Category")).toBeNull();
});

test("Displays validation messages correctly", async () => {
  const { findByText, getByRole, getByLabelText } = customRender(
    <AddCommandForm />
  );
  const submitButton = getByRole("button", { name: /Add command/i });
  const referenceInput = getByLabelText('Reference');

  userEvent.type(referenceInput, "notavalidurl");
  submitButton.click();

  const referenceError = await findByText(errorMessages.reference);
  const lineRequiredError = await findByText(
    registerOptions.line.required as string
  );
  const descriptionRequiredError = await findByText(
    registerOptions.description.required as string
  );

  expect(lineRequiredError).toBeInTheDocument();
  expect(descriptionRequiredError).toBeInTheDocument();
  expect(referenceError).toBeInTheDocument();

  await userEvent.clear(referenceInput);
  userEvent.type(referenceInput, "https://www.google.com");
  expect(referenceError).not.toBeInTheDocument();
});

test("Submits form correctly", async () => {
  const { getByRole, getByLabelText } = customRender(
    <AddCommandForm categoryId={1} />
  );
  const descriptionInput = getByLabelText("Description");
  const commandInput = getByRole("textbox", { name: "Command" });
  const referenceInput = getByLabelText('Reference');

  userEvent.type(descriptionInput, "test description");
  userEvent.type(commandInput, "test command");
  userEvent.type(referenceInput, "https://www.google.com");

  const submitButton = getByRole("button", { name: /Add command/i });
  submitButton.click();

  await waitFor(() => {
    expect(commandInput).toHaveValue("");
    expect(descriptionInput).toHaveValue("");
  });
});
