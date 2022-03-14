import { home_page_locators } from "../../variables/locators.spec"
import BasePage from "./BasePage.spec"

class BrowserPage extends BasePage {

    getTextLink() {
        return cy.get(home_page_locators['getTextLink'])
    }

    clickStartSessionButton() {
        cy.contains('Start session').click()
    }

    getLinkTextOnSessionPage() {
        cy.get((home_page_locators['getLinkTextOnSessionPage']), { timeout: 20000 }).should('be.visible')
        return cy.get(home_page_locators['getLinkTextOnSessionPage'])
    }

    clickOnContinueButton() {
        cy.contains('Continue').click()
    }

    selectIssuingCountry() {
        return cy.get(home_page_locators['selectIssuingCountry'])
    }

    getText() {
        return cy.get(home_page_locators['getText'])
    }

    getValue() {
        return cy.get(home_page_locators['getValue'])
    }

    getSessionPage() {
        return cy.get(home_page_locators['getSessionPage'])
    }

    getverifyTitle() {
        return cy.title()
    }

    messageOnLog() {
        cy.log('Test Passed')
    }

}

export default BrowserPage;