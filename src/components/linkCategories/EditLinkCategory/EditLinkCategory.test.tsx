import { render } from "../../../tests/test-utils";
import EditLinkCategory from "./EditLinkCategory";

test("renders without crashing", () => {
  render(
    <EditLinkCategory categoryId={"1"} isOpen={() => {}} onClose={() => {}} />
  );
});
