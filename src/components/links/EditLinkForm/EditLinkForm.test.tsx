import userEvent from "@testing-library/user-event";
import { Link } from "models/link";
import { customRender, waitFor } from "../../../tests/test-utils";
import { urlErrorMessages } from "../linkFormUtils";
import EditLinkForm from "./EditLinkForm";

const testLink: Link = {
  id: 1,
  title: "laravel",
  url: "https://laravel.com/docs/8.x#getting-started-on-windows",
  category: { id: 1, name: "general" },
};

test("Displays validation messages correctly", async () => {
  const { findByText, getByRole, getByPlaceholderText, queryByText } =
    customRender(<EditLinkForm linkItem={testLink} onClose={vi.fn()} />);
  const submitButton = getByRole("button", { name: /Save/i });
  const linkInput = getByPlaceholderText(/URL for link/i);
  await userEvent.clear(linkInput);
  await userEvent.type(linkInput, "notavalidurl");
  submitButton.click();
  expect(await findByText(urlErrorMessages.validate)).toBeInTheDocument();
  // clear input and check that error message is
  await userEvent.clear(linkInput);
  await userEvent.type(linkInput, "https://www.google.com");
  expect(queryByText(urlErrorMessages.validate)).toBeNull();
});

test("Submitting edited link works correctly", async () => {
  const { getByRole, getByPlaceholderText } =
    customRender(<EditLinkForm linkItem={testLink} onClose={vi.fn()} />);

  // Get the inputs and submit button
  const linkInput = getByPlaceholderText(/Url/i);
  const titleInput = getByPlaceholderText(/Title/i);
  const submitButton = getByRole("button", { name: /Save/i });

  // Add the values to the inputs
  await userEvent.clear(linkInput);
  await userEvent.type(linkInput, "https://www.google.com");
  await userEvent.clear(titleInput);
  await userEvent.type(titleInput, "Test Title");

  // Submit the form
  submitButton.click();

  // Wait for the form to close
  await waitFor(() => {
    expect(linkInput).toHaveValue("");
    expect(titleInput).toHaveValue("");
  });
});
