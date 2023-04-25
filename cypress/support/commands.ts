/// <reference types="cypress" />

// import { login } from "./auth";
import { login } from "./auth";
import { loginViaAAD } from "./e2e";

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//

Cypress.Commands.add('dataCy', (value) => {
  return cy.get(`[data-cy=${value}]`)
})

Cypress.Commands.add("loginToAAD", (username: string, password: string) => {
  cy.session(`aad-${username}`, () => {
    const log = Cypress.log({
      displayName: "Azure Active Directory B2C Login",
      message: [`🔐 Authenticating | ${username}`],
      autoEnd: false,
    });
    // log.snapshot("before");

    loginViaAAD(username, password);

    // log.snapshot("after");
    log.end();
  }, {
    validate: () => {
      cy.visit('/');
      cy.get('.login-button').should('be.disabled');
    }
  });
});

let cachedTokenExpiryTime = new Date().getTime();
let cachedTokenResponse: null;

Cypress.Commands.add("login", () => {
  // Clear our cache if tokens are expired
  if (cachedTokenExpiryTime <= new Date().getTime()) {
    cachedTokenResponse = null;
  }

  return login(cachedTokenResponse).then((tokenResponse) => {
    cachedTokenResponse = tokenResponse;
    // Set expiry time to 50 minutes from now
    cachedTokenExpiryTime = new Date().getTime() + 50 * 60 * 1000;
  });
});