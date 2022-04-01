import { testData } from "tests/testData";
import { render } from "../../../../tests/test-utils";
import CommandsTable from "./CommandsGrid";

test("Render CommandsTable with correct props", async () => {
  render(<CommandsTable commands={testData.commands} showCategories />);
});
