import { waitFor } from "@testing-library/react";
import { App } from "./App";
import { render } from "./test-utils";

test("App component renders without crashing", async () => {
  render(<App />);
  await waitFor(() => Promise.resolve());
});
