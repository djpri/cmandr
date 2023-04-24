import { v4 as uuidv4 } from "uuid";
import { Entity } from "../../src/models/entity";

const entityTypes: Entity[] = ["command", "link", "snippet"];

const createDataCySelector = (str: string) =>
  `[data-cy="dashboard"] [data-cy="${str}"]`;

const selectors = ({
  entityType,
  isGroup,
}: {
  entityType: Entity;
  isGroup: boolean;
}) => {
  const base = isGroup
    ? `add-group ${entityType}`
    : `add-category ${entityType}`;
  return {
    showInputButton: createDataCySelector(base),
    input: createDataCySelector(`${base} input`),
    save: createDataCySelector(`${base} save`),
  };
};

describe("Adds group and category for each entity and displays on dashboard", () => {
  beforeEach(() => {
    cy.loginToAAD(Cypress.env("aad_username"), Cypress.env("aad_password"));
    cy.visit("http://localhost:3000");
  });

  entityTypes.forEach((entityType) => {
    it(`${entityType}: should add new group or category when save button is clicked`, () => {
      cy.visit("http://localhost:3000/dashboard");

      const randomGroupName = `Group ${uuidv4()}`;
      const randomCategoryName = `Category ${uuidv4()}`;

      const { showInputButton: showGroupInputButton, input: groupInput } =
        selectors({ entityType, isGroup: true });
      const { showInputButton: showCategoryInputButton, input: categoryInput } =
        selectors({ entityType, isGroup: false });

      cy.log("Show inputs");
      cy.get(showGroupInputButton).scrollIntoView().click();
      cy.get(showCategoryInputButton).scrollIntoView().click();

      cy.log("Type in inputs");
      cy.get(groupInput).type(randomGroupName);
      cy.get(categoryInput).type(randomCategoryName);

      cy.log("Click save for group and category");
      cy.get(`[data-cy="add-group ${entityType} save"]`).click();
      cy.get(`[data-cy="add-category ${entityType} save"]`).click();

      cy.log("Check if group is added");
      cy.get(`[data-cy="categories-grid ${entityType}"]`).should(
        "contain",
        randomGroupName
      );
      cy.log("Check if category is added");
      cy.get(`[data-cy="categories-grid ${entityType}"]`).should(
        "contain",
        randomGroupName
      );
      cy.log("Click on category button");
      cy.contains( randomCategoryName).click();
    });
  });
});
