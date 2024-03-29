// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

import "./commands";

export function loginViaAAD(username: string, password: string) {
  cy.visit("/");
  cy.get(".login-button").click();

  cy.origin(
    "https://cmandrapp.b2clogin.com",
    {
      args: {
        username,
        password,
      },
    },
    ({ username, password }) => {
      // Enter the email address and password and click the sign-in button
      cy.get("#email").type(username);
      cy.get("#password").type(password);
      cy.get('button[type="submit"]').click();
    }
  );

  cy.wait(2000);
  // Ensure Microsoft has redirected us back to the sample app with our logged in user.
  cy.url().should("equal", Cypress.config().baseUrl + "/");
}
