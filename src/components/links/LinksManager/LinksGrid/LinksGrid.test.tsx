import { act } from "react-dom/test-utils";
import { customRender } from "tests/test-utils";
import { testData } from "tests/testData";
import LinksGrid from "./LinksGrid";

test("Displays all headers correctly", () => {
  const { getByText } = customRender(
    <LinksGrid links={testData.links} showCategories isLoading={false} />
  );
  expect(getByText("Title")).toBeInTheDocument();
  expect(getByText("Url")).toBeInTheDocument();
  expect(getByText("Category")).toBeInTheDocument();
});

test("Displays all headers correctly for no categories", () => {
  const { getByText, queryByText } = customRender(
    <LinksGrid
      links={testData.links}
      showCategories={false}
      isLoading={false}
    />
  );
  expect(getByText("Title")).toBeInTheDocument();
  expect(getByText("Url")).toBeInTheDocument();
  expect(queryByText("Category")).toBeNull();
});

test("Displays pagination information correctly", () => {
  const { getByText } = customRender(
    <LinksGrid links={testData.links} showCategories isLoading={false} />
  );
  expect(getByText("Page")).toBeInTheDocument();
  expect(getByText("1 of 2")).toBeInTheDocument();
});

test("Displays correct placeholder information in search bar", () => {
  const { getByPlaceholderText } = customRender(
    <LinksGrid links={testData.links} showCategories isLoading={false} />
  );
  expect(getByPlaceholderText("Search all 44 items...")).toBeInTheDocument();
});

test("Pagination buttons are enabled or disabled when expected", () => {
  const { getByRole } = customRender(
    <LinksGrid links={testData.links} showCategories isLoading={false} />
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
  expect(goToNextPageButton).not.toBeDisabled();
  expect(goToLastPageButton).not.toBeDisabled();

  // click on next page button to go to last page (2 of 2)
  act(() => {
    goToNextPageButton.click();
  });

  expect(goToFirstPageButton).not.toBeDisabled();
  expect(goToPreviousPageButton).not.toBeDisabled();
  expect(goToNextPageButton).toBeDisabled();
  expect(goToLastPageButton).toBeDisabled();
});
