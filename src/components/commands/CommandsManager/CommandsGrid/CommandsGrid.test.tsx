import { customRender } from "tests/test-utils";
import { testData } from "tests/testData";
import CommandsGrid from "./CommandsGrid";

test("Displays all headers correctly", async () => {
  const { getByText } = customRender(
    <CommandsGrid commands={testData.commands} showCategories />
  );
  expect(getByText("Description")).toBeInTheDocument();
  expect(getByText("Command")).toBeInTheDocument();
  expect(getByText("Category")).toBeInTheDocument();
});

test("Displays all headers correctly for no categories", async () => {
  const { getByText, queryByText } = customRender(
    <CommandsGrid commands={testData.commands} showCategories={false} />
  );
  expect(getByText("Description")).toBeInTheDocument();
  expect(getByText("Command")).toBeInTheDocument();
  expect(queryByText("Category")).toBeNull();
});

test("Displays pagination information correctly", () => {
  const { getByText } = customRender(
    <CommandsGrid commands={testData.commands} showCategories />
  );
  expect(getByText("Page")).toBeInTheDocument();
  expect(getByText("1 of 1")).toBeInTheDocument();
});

test("Displays correct placeholder information in search bar", () => {
  const { getByPlaceholderText } = customRender(
    <CommandsGrid commands={testData.commands} showCategories />
  );
  expect(getByPlaceholderText("Search all 17 items...")).toBeInTheDocument();
});

test("Pagination buttons are enabled or disabled when expected", () => {
  const { getByRole } = customRender(
    <CommandsGrid commands={testData.commands} showCategories />
  );
  const goToFirstPageButton = getByRole("button", {
    name: "goToFirstPage",
  });
  const goToPreviousPageButton = getByRole("button", {
    name: "goToPreviousPage",
  });
  const goToNextPageButton = getByRole("button", {
    name: "goToNextPage",
  });
  const goToLastPageButton = getByRole("button", {
    name: "goToLastPage",
  });
  expect(goToFirstPageButton).toBeDisabled();
  expect(goToPreviousPageButton).toBeDisabled();
  expect(goToNextPageButton).toBeDisabled();
  expect(goToLastPageButton).toBeDisabled();
});
