import userEvent from '@testing-library/user-event';
import QuickAddLinkForm from './QuickAddLinkForm';
import { customRender } from "tests/test-utils";
import { urlErrorMessages } from "../linkFormUtils";

test("Displays validation messages correctly", async () => {
  const { findByText, getByRole, getByPlaceholderText, queryByText } = customRender(
    <QuickAddLinkForm />
  );
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