import { home_page_locators } from "../../variables/locators.spec";
import BasePage from "./BasePage.spec";

/// <reference types="cypress" />
const basePage = new BasePage()

class HomePage extends BasePage {

    accessApplication() {
        basePage.launchApplication()
    }

    getSessionLanguage() {
        return cy.get(home_page_locators['getSessionLanguage'])
    }

    enterDocumentCountry() {
        return cy.get(home_page_locators['enterDocumentCountry'])
    }

    getDocumentCountry() {
        return cy.get(home_page_locators['getDocumentCountry'])
    }

    enterDocumentType() {
        return cy.get(home_page_locators['enterDocumentType'])
    }

    selectBrowserVerificationType() {
        return cy.get(home_page_locators['selectBrowserVerificationType'])
    }

    clickVeriffMeSubmitButton() {
        cy.get(home_page_locators['clickVeriffMeSubmitButton']).click()
    }
}

export default HomePage;