// ***********************************************
// This example commands.js shows you how to
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
Cypress.Commands.add("selectValue", (value) => {
    cy.get("[role='option']").each(($el, index, $list) => {
        const name = $el.text()
        if (name.includes(value)) {
           $el.click();
        }
    })
})

Cypress.Commands.add("selectDocumentType", (value) => {
    cy.get(".c1ck515b").each(($el, index, $list) => {
        const type = $el.text()
        if (type.includes(value)) {
           $el.click();
        }
    })
})