import { render, screen, fireEvent } from "../../../tests/test-utils";
import AddCommandForm from "./AddCommandForm";

test("renders without crashing", () => {
  render(<AddCommandForm />);
});
