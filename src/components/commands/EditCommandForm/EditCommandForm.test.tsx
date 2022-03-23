import { testData } from "tests/testData";
import { render } from "../../../tests/test-utils";
import EditCommandForm from "./EditCommandForm";

const randomTestCommand =
  testData.commands[Math.floor(Math.random() * testData.commands.length)];

test("Renders with correct command passed in as prop", async () => {
  render(
    <EditCommandForm commandItem={randomTestCommand} onClose={() => {}} />
  );
});
