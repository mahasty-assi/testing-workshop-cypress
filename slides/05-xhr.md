## Spying / stubbing network calls

- use `05-xhr`
- **note** stubbing `window.fetch` is NOT implemented yet, but will be [issue #687](https://github.com/cypress-io/cypress/issues/687)

+++

## Situation

- there is no resetting the state before each test
- the test passes but _something is wrong_

```javascript
it('starts with zero items', () => {
  cy.visit('/')
  cy.get('li.todo').should('have.length', 0)
})
```

![Should have failed](05-xhr/img/test-passes-but-this-is-wrong.png)

+++

## Problem

- page loads
- web application makes XHR call `GET /todos`
  - meanwhile it shows an empty list of todos
- Cypress assertion passes!
- `GET /todos` returns with 2 items
  - they are added to the DOM
  - but the test has already finished

+++

## Waiting

```javascript
it('starts with zero items', () => {
  cy.visit('/')
  cy.wait(1000)
  cy.get('li.todo').should('have.length', 0)
})
```

![Waiting works](05-xhr/img/waiting.png)