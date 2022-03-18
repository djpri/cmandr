import SignOutButton from "components/auth/SignOutButton/SignOutButton";
import { render, screen } from "./test-utils";

test.skip("renders without crashing", () => {
  render(<SignOutButton />);
  const linkElement = screen.getByText(/Sign Out/i);
  expect(linkElement).toBeInTheDocument();
});
