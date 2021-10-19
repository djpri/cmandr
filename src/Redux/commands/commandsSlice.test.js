import reducer, {
  setCommands,
  setAddCommand,
  setEditCommand,
  setDeleteCommand,
} from "./commandsSlice";
import {
  testState,
  testStateAfterEdit,
  editedTestItem,
  testStateAfterDeletion,
} from "./testData";

const testItem = {
  command: "yarn add framer-motion",
  howTo: "install framer motion",
  category: "npm package",
  reference: "https://www.framer.com/docs/",
  id: "BqeJ0PXxnNahJryxW8MK",
};

test("returns the initial state", () => {
  expect(reducer(undefined, {})).toEqual({
    commands: [],
    categories: [],
  });
});

test("setCommands", () => {
  expect(reducer(undefined, setCommands(testState))).toEqual({
    commands: testState,
    categories: [],
  });
});

test("setAddCommand", () => {
  expect(reducer(undefined, setAddCommand(testItem))).toEqual({
    commands: [testItem],
    categories: [],
  });
});

test("setEditCommand", () => {
  expect(
    reducer({ commands: testState }, setEditCommand(editedTestItem))
  ).toEqual({
    commands: testStateAfterEdit,
    categories: [],
  });
});

test("setDeleteCommand", () => {
  expect(
    reducer({ commands: testState }, setDeleteCommand(testItem.id))
  ).toEqual({
    commands: testStateAfterDeletion,
    categories: [],
  });
});
