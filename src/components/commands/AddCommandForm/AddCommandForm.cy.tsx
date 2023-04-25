import React from 'react'
import AddCommandForm from './AddCommandForm'

describe('<AddCommandForm />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<AddCommandForm />)
  })
})