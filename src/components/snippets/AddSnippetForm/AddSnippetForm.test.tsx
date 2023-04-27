import { customRender } from "tests/test-utils";
import AddSnippetForm from "./AddSnippetForm";
import { snippetFormUtils } from "../snippetFormUtils";

const {
  labels,
  registerOptions,
} = snippetFormUtils;

test("Displays form labels correctly without categoryId prop", async () => {
  const { getByText } = customRender(<AddSnippetForm />);

  expect(getByText(labels.description)).toBeInTheDocument();
  expect(getByText(labels.language)).toBeInTheDocument();
  expect(getByText(labels.code)).toBeInTheDocument();
  expect(getByText(labels.category)).toBeInTheDocument();
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
  const { getByRole, findByText } = customRender(
    <AddSnippetForm />
  );
  const submitButton = getByRole("button", { name: /Add snippet/i });
  submitButton.click();

  const descriptionRequiredError = await findByText(registerOptions.description.required as string);
  const languageRequiredError = await findByText(registerOptions.language.required as string);
  const codeRequiredError = await findByText(registerOptions.code.required as string);

  expect(descriptionRequiredError).toBeInTheDocument();
  expect(languageRequiredError).toBeInTheDocument();
  expect(codeRequiredError).toBeInTheDocument();
});