import userEvent from "@testing-library/user-event";
import { customRender, waitFor } from "tests/test-utils";
import { testData } from "tests/testData";
import { urlErrorMessages } from "../linkFormUtils";
import AddLinkForm from "./AddLinkForm";

test("Displays default values correctly without categoryId prop", async () => {
  const { getByText } = customRender(<AddLinkForm />);
  expect(getByText("Title")).toBeInTheDocument();
  expect(getByText("Link")).toBeInTheDocument();
  expect(getByText("Category")).toBeInTheDocument();
});

test("Displays default values correctly with categoryId prop", async () => {
  const { getByText, queryByText } = customRender(
    <AddLinkForm categoryId={1} />
  );
  expect(getByText("Title")).toBeInTheDocument();
  expect(getByText("Link")).toBeInTheDocument();
  expect(queryByText("Category")).toBeNull();
});

test("Displays validation messages correctly", async () => {
  const { findByText, getByRole, getByPlaceholderText, queryByText } =
    customRender(<AddLinkForm />);
  const submitButton = getByRole("button", { name: /Add link/i });
  const linkInput = getByPlaceholderText(/URL for link/i);
  await userEvent.type(linkInput, "notavalidurl");
  submitButton.click();
  expect(await findByText(urlErrorMessages.validate)).toBeInTheDocument();

  // clear input and check that error message is
  await userEvent.clear(linkInput);
  await userEvent.type(linkInput, "https://www.google.com");
  expect(queryByText(urlErrorMessages.validate)).toBeNull();
});

test("Submitting new link works correctly", async () => {
  const { getByRole, getByPlaceholderText, findAllByRole } = customRender(
    <AddLinkForm />
  );

  // Get the inputs and submit button
  const linkInput = getByPlaceholderText(/URL for link/i);
  const titleInput = getByPlaceholderText(/Title for link/i);
  const submitButton = getByRole("button", { name: /Add link/i });
  const categorySelect = getByRole("combobox");

  // Wait for the options to load
  expect((await findAllByRole("option")).length).toBe(
    testData.linkCategories.length + 1
  );

  // Add the values to the inputs
  await userEvent.type(linkInput, "https://www.google.com");
  await userEvent.type(titleInput, "Test Title");
  await userEvent.selectOptions(categorySelect, "71");

  // Submit the form
  submitButton.click();

  // Wait for the form to clear
  await waitFor(() => {
    expect(linkInput).toHaveValue("");
    expect(titleInput).toHaveValue("");
    expect(categorySelect).toHaveValue("-1");
  });
});
