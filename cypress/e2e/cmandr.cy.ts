describe('Azure Active Directory Authentication', () => {
  beforeEach(() => {
    // log into Azure Active Directory through our sample SPA using our custom command
    cy.loginToAAD(Cypress.env('aad_username'), Cypress.env('aad_password'))
    cy.visit('http://localhost:3000')
  })

  it('dashboard shows for logged in user', () => {
    cy.visit('http://localhost:3000/dashboard')
    /* ==== Generated with Cypress Studio ==== */
    /* ==== End Cypress Studio ==== */
  })
})