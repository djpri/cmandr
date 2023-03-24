import userEvent from "@testing-library/user-event";
import { customRender, waitFor } from "tests/test-utils";
import { testData } from "tests/testData";
import { urlErrorMessages } from "../linkFormUtils";
import QuickAddLinkForm from "./QuickAddLinkForm";

test("Displays validation messages correctly", async () => {
  const { findByText, getByRole, getByPlaceholderText, queryByText } =
    customRender(<QuickAddLinkForm />);
  const submitButton = getByRole("button", { name: /Add link/i });
  const linkInput = getByPlaceholderText(/URL for link/i);

  submitButton.click();
  expect(await findByText(urlErrorMessages.required)).toBeInTheDocument();
  await userEvent.type(linkInput, "notavalidurl");
  expect(await findByText(urlErrorMessages.validate)).toBeInTheDocument();

  // clear input and check that error messages are gone
  await userEvent.clear(linkInput);
  await userEvent.type(linkInput, "https://www.google.com");
  expect(queryByText(urlErrorMessages.required)).toBeNull();
  expect(queryByText(urlErrorMessages.validate)).toBeNull();
});

test("Submitting new link works correctly", async () => {
  const { getByRole, getByPlaceholderText, findAllByRole } = customRender(
    <QuickAddLinkForm />
  );

  // Get the inputs and submit button
  const linkInput = getByPlaceholderText(/URL for link/i);
  const submitButton = getByRole("button", { name: /Add link/i });
  const categorySelect = getByRole("combobox");
  expect((await findAllByRole('option')).length).toBe(testData.linkCategories.length + 1);

  // Add the values to the inputs
  await userEvent.type(linkInput, "https://www.google.com");
  await userEvent.selectOptions(categorySelect, "71");

  // Submit the form
  submitButton.click();

  // Wait for the form to close and the mutation to complete
  await waitFor(
    () => {
      expect(linkInput).toHaveValue("");
    },
  );
});
