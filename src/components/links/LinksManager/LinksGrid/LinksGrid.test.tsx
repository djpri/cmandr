import { testData } from "tests/testData";
import { render } from "../../../../tests/test-utils";
import LinksTable from "./LinksGrid";

test("Render LinksTable with correct props", async () => {
  render(<LinksTable links={testData.links} showCategories isLoading />);
});
