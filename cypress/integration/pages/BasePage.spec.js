class BasePage {

    launchApplication() {
        cy.visit(Cypress.env('url'))
    }

}
export default BasePage;