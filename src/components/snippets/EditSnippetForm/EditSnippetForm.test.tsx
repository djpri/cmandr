import { customRender } from "tests/test-utils";
import EditSnippetForm from "./EditSnippetForm";
import { testData } from "tests/testData";
import { snippetFormUtils } from "../snippetFormUtils";
import { SnippetReadDto } from "models/snippets";

const {
  registerOptions,
} = snippetFormUtils;

const emptySnippet: SnippetReadDto = {
  id: 0,
  title: "",
  description: "",
  code: "",
  language: "",
  starred: false,
  category: {
    id: 0,
    name: "",
  },
};

test("Displays form labels correctly", async () => {
  const { getByText } = customRender(<EditSnippetForm snippetItem={testData.snippets[0]} onClose={vi.fn()} />);

  expect(getByText("Description")).toBeInTheDocument();
  expect(getByText("Language")).toBeInTheDocument();
  expect(getByText("Code")).toBeInTheDocument();
  expect(getByText("Category")).toBeInTheDocument();
});


test("When fields are empty, validation messages are displayed correctly", async () => {
  const { getByRole, findByText } = customRender(
    <EditSnippetForm snippetItem={emptySnippet} onClose={vi.fn()} />
  );
  const submitButton = getByRole("button", { name: /save/i });
  submitButton.click();

  const descriptionRequiredError = await findByText(registerOptions.description.required as string);
  const languageRequiredError = await findByText(registerOptions.language.required as string);
  const codeRequiredError = await findByText(registerOptions.code.required as string);

  expect(descriptionRequiredError).toBeInTheDocument();
  expect(languageRequiredError).toBeInTheDocument();
  expect(codeRequiredError).toBeInTheDocument();
});