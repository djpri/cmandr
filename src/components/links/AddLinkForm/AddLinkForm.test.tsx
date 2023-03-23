import userEvent from "@testing-library/user-event";
import { customRender } from "tests/test-utils";
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
