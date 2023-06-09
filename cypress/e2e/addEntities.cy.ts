describe("Adds group and category for each entity and displays on dashboard", () => {
  beforeEach(() => {
    cy.loginToAAD(Cypress.env("aad_username"), Cypress.env("aad_password"));
    cy.visit("/");
  });

  it("should add new command to commands grid", () => {
    cy.log("Visit commands page");
    cy.visit("/commands");

    cy.log("Show command form");
    cy.dataCy("add-command-button").click();

    cy.log("Type in inputs");
    cy.dataCy("add-command-form-description").type("New Description");
    cy.dataCy("add-command-form-line").type("New Command");
    cy.dataCy("add-command-form-category").select(1);
    cy.dataCy("add-command-form-reference").type("https://www.google.com/");
    cy.dataCy("add-command-form-submit").click();

    cy.log("Check that form has been reset");
    cy.dataCy("add-command-form-description").should("have.value", "");
    cy.dataCy("add-command-form-line").should("have.value", "");
    cy.dataCy("add-command-form-category").should("have.value", -1);
    cy.dataCy("add-command-form-reference").should("have.value", "");
  });

  it("should add new link to links grid", () => {
    cy.log("Visit links page");
    cy.visit("/links");

    cy.log("Show link form");
    cy.dataCy("add-link-button").click();

    cy.log("Type in inputs");
    cy.dataCy("add-link-form-title").type("New Title");
    cy.dataCy("add-link-form-url").type("https://www.google.com/");
    cy.dataCy("add-link-form-category").select(1);
    cy.dataCy("add-link-form-submit").click();

    cy.log("Check that form has been reset");
    cy.dataCy("add-link-form-title").should("have.value", "");
    cy.dataCy("add-link-form-url").should("have.value", "");
    cy.dataCy("add-link-form-category").should("have.value", -1);
  });
});
