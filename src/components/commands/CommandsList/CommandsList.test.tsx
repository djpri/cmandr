import React from "react";
import CommandsList from "./CommandsList";
import { render } from "../../../test-utils";
import { Command } from "../../../types/types";

const ghostCommands = () => {
  const ghostData: Command[] = [];
  for (let i = 0; i < 20; i++) {
    ghostData.push({
      id: i,
      description: "",
      command: "",
      reference: "    ",
      category: {
        id: null,
        name: "",
      },
    });
  }
  return ghostData;
};

test("renders without crashing", () => {
  render(<CommandsList showCategories ghostCommands={ghostCommands()} />);
});
