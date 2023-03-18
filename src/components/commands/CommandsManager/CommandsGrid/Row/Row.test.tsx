import CommandRow from "components/commands/CommandsManager/CommandsGrid/Row/Row";
import { render, screen } from "tests/test-utils";
import { testData } from "tests/testData";

test.skip("Displays correct data on screen", async () => {
  testData.commands.forEach((command) => {
    render(
      <CommandRow
        commandItem={command}
        showCategories
        rowId={0}
      />
    );
    expect(screen.getByText(command.line)).toBeInTheDocument();
    expect(screen.getAllByText(command.category.name)).toBeTruthy();
    expect(screen.getByText(command.description)).toBeInTheDocument();
    expect(screen.queryByText(command.reference)).toBeNull();
  });
});
