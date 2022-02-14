import reducer, {
  setCommands,
  setAddCommand,
  setEditCommand,
  setDeleteCommand,
  setCommandCategories,
  setAddCommandCategory,
  setDeleteCommandCategory,
  setEditCommandCategory,
  CommandsState,
} from "./commandsSlice";
import {
  testState,
  testItem,
  testStateAfterEdit,
  editedTestItem,
  testStateAfterDeletion,
} from "./testData";

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
  const categories = [
    { id: 1, name: "general" },
    { id: 2, name: "npm package" },
    { id: 3, name: "git" },
  ];
  expect(reducer(initialState, setCommandCategories(categories))).toEqual({
    commands: [],
    categories: categories,
  });
});

test("setAddCommandCategory", () => {
  const oldCategoriesList = [
    { id: 1, name: "general" },
    { id: 2, name: "npm package" },
    { id: 3, name: "git" },
  ];
  const initialState: CommandsState = {
    commands: [],
    categories: oldCategoriesList,
  };
  const newCategory = { id: 4, name: "c#" };
  const newCategoriesList = [
    { id: 1, name: "general" },
    { id: 2, name: "npm package" },
    { id: 3, name: "git" },
    { id: 4, name: "c#" },
  ];
  expect(reducer(initialState, setAddCommandCategory(newCategory))).toEqual({
    commands: [],
    categories: newCategoriesList,
  });
});

test("setEditCommandCategory", () => {
  const oldCategoriesList = [
    { id: 1, name: "general" },
    { id: 2, name: "npm package" },
    { id: 3, name: "git" },
  ];
  const initialState: CommandsState = {
    commands: [],
    categories: oldCategoriesList,
  };
  const editedCategory = { id: 2, name: "javascript" };
  const newCategoriesList = [
    { id: 1, name: "general" },
    { id: 2, name: "javascript" },
    { id: 3, name: "git" },
  ];
  expect(reducer(initialState, setEditCommandCategory(editedCategory))).toEqual(
    {
      commands: [],
      categories: newCategoriesList,
    }
  );
});

test("setDeleteCommandCategory", () => {
  const oldCategoriesList = [
    { id: 1, name: "general" },
    { id: 2, name: "npm package" },
    { id: 3, name: "git" },
  ];
  const initialState: CommandsState = {
    commands: [],
    categories: oldCategoriesList,
  };
  const categorytoDelete = { id: 2, name: "npm package" };
  const newCategoriesList = [
    { id: 1, name: "general" },
    { id: 3, name: "git" },
  ];
  expect(
    reducer(initialState, setDeleteCommandCategory(categorytoDelete.id))
  ).toEqual({
    commands: [],
    categories: newCategoriesList,
  });
});
