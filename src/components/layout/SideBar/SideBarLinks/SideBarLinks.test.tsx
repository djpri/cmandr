import { customRender, screen } from "tests/test-utils";
import { testData } from "tests/testData";
import SideBarLinks from "./SideBarLinks";

beforeEach(() => {
  vi.stubGlobal("scrollTo", vi.fn());
  customRender(<SideBarLinks />);
});

afterEach(() => {
  vi.clearAllMocks();
});

test("Displays command categories after data is loaded", async () => {
  testData.commandCategories.forEach(async (category) => {
    expect(await screen.findByText(category.name)).toBeInTheDocument();
  });
});

test("Displays link categories after data is loaded", async () => {
  testData.linkCategories.forEach(async (category) => {
    expect(await screen.findByText(category.name)).toBeInTheDocument();
  });
});
