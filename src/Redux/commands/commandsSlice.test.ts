import reducer, {
  setCommands,
  setAddCommand,
  setEditCommand,
  setDeleteCommand,
  setCommandCategories,
} from "./commandsSlice";
import {
  testState,
  testItem,
  testStateAfterEdit,
  editedTestItem,
  testStateAfterDeletion,
} from "./testData";
import { CommandsState } from "./../../types/types";

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
  const initialState: CommandsState = { commands: testState, categories: [] };
  expect(reducer(initialState, setEditCommand(editedTestItem))).toEqual({
    commands: testStateAfterEdit,
    categories: [],
  });
});

test("setDeleteCommand", () => {
  const initialState: CommandsState = { commands: testState, categories: [] };
  expect(reducer(initialState, setDeleteCommand(testItem.id))).toEqual({
    commands: testStateAfterDeletion,
    categories: [],
  });
});

test("setCommandCategories", () => {
  const initialState: CommandsState = { commands: [], categories: [] };
  const categories = ["general", "npm package", "git"];
  expect(reducer(initialState, setCommandCategories(categories))).toEqual({
    commands: [],
    categories: categories,
  });
});
