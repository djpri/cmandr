import { customRender } from "tests/test-utils";
import { test } from "vitest";
import { snippetFormUtils } from "../snippetFormUtils";
import AddSnippetForm from "./AddSnippetForm";

const { labels, registerOptions } = snippetFormUtils;

vi.mock("@monaco-editor/react", () => {
  const FakeEditor = (props: {
    value: string | number | readonly string[];
    onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
  }) => {
    return (
      <textarea
        id="code"
        onChange={(value) => props.onChange(value)}
        value={props.value}
      ></textarea>
    );
  };
  return { default: FakeEditor };
});

test("Displays form labels correctly without categoryId prop", async () => {
  const { getByText } = customRender(<AddSnippetForm />);

  expect(getByText(labels.description)).toBeInTheDocument();
  expect(getByText(labels.language)).toBeInTheDocument();
  expect(getByText(labels.code)).toBeInTheDocument();
  expect(getByText(labels.category)).toBeInTheDocument();
});

test("Displays all inputs correctly", async () => {
  const { getByRole } = customRender(<AddSnippetForm />);
  const codeInput = getByRole("textbox", { name: /code/i });
  const descriptionInput = getByRole("textbox", { name: /description/i });
  const languageInput = getByRole("combobox", { name: /language/i });
  const categoryInput = getByRole("combobox", { name: /category/i });

  expect(codeInput).toBeInTheDocument();
  expect(descriptionInput).toBeInTheDocument();
  expect(languageInput).toBeInTheDocument();
  expect(categoryInput).toBeInTheDocument();
});

test("Displays form labels correctly with categoryId prop", async () => {
  const { getByText, queryByText } = customRender(
    <AddSnippetForm categoryId={1} />
  );

  expect(getByText(labels.description)).toBeInTheDocument();
  expect(getByText(labels.language)).toBeInTheDocument();
  expect(getByText(labels.code)).toBeInTheDocument();
  expect(queryByText(labels.category)).toBeNull();
});

test("When submitting empty form, validation messages are displayed correctly", async () => {
  const { getByRole, findByText } = customRender(<AddSnippetForm />);
  const submitButton = getByRole("button", { name: /Add snippet/i });
  submitButton.click();

  const descriptionRequiredError = await findByText(
    registerOptions.description.required as string
  );
  const languageRequiredError = await findByText(
    registerOptions.language.required as string
  );
  const codeRequiredError = await findByText(
    registerOptions.code.required as string
  );

  expect(descriptionRequiredError).toBeInTheDocument();
  expect(languageRequiredError).toBeInTheDocument();
  expect(codeRequiredError).toBeInTheDocument();
});
