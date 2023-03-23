import userEvent from "@testing-library/user-event";
import { Link } from "models/link";
import { customRender } from "../../../tests/test-utils";
import { urlErrorMessages } from "../linkFormUtils";
import EditLinkForm from "./EditLinkForm";

const testLink: Link = {
  id: 1,
  title: "laravel",
  url: "https://laravel.com/docs/8.x#getting-started-on-windows",
  category: { id: 1, name: "general" },
};

test("Renders EditLinkForm with correct link item passed in as prop", async () => {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  customRender(<EditLinkForm linkItem={testLink} onClose={vi.fn()} />);
});

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

