import { testData } from "tests/testData";
import { render, screen } from "tests/test-utils";
import Row from "components/commands/CommandsManager/CommandsGrid/Row/Row";

test("Displays correct data on screen", async () => {
  testData.commands.forEach((command) => {
    render(<Row commandItem={command} showCategories />);
    expect(screen.getByText(command.line)).toBeInTheDocument();
    expect(screen.getAllByText(command.category.name)).toBeTruthy();
    expect(screen.getByText(command.description)).toBeInTheDocument();
    expect(screen.queryByText(command.reference)).toBeNull();
  });
});
