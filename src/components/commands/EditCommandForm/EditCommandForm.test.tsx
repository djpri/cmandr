import { testData } from "tests/testData";
import { render } from "../../../tests/test-utils";
import EditCommandForm from "./EditCommandForm";

const randomTestCommand =
  testData.commands[Math.floor(Math.random() * testData.commands.length)];

test("Renders with correct command passed in as prop", async () => {
  render(
      // eslint-disable-next-line @typescript-eslint/no-empty-function
    <EditCommandForm commandItem={randomTestCommand} onClose={() => {}} />
  );
});
