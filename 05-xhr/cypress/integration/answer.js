/// <reference types="cypress" />
// note, we are not resetting the server before each test
it('starts with zero items (waits)', () => {
  cy.visit('/')
  cy.wait(1000)
  cy.get('li.todo').should('have.length', 0)
})

it('starts with zero items', () => {
  // start Cypress network server
  // spy on route `GET /todos`
  // THEN visit the page
  cy.server()
  cy.route('GET', '/todos').as('todos')
  cy.visit('/')
  cy
    .wait('@todos') // wait for `GET /todos` response
    // inspect the server's response
    .its('response.body')
    .should('have.length', 0)
  // then check the DOM
  cy.get('li.todo').should('have.length', 0)
})
