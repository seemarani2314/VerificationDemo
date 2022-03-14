import BasePage from "./BasePage.spec"

import { home_page_locators } from '../../variables/locators.spec.js';

class MobileViewPage extends BasePage {

    getSelect() {
        return cy.get('select')
    }

    getPhoneNumberAutopopulated() {
        return cy.get(home_page_locators['getPhoneNumberAutopopulated'])
    }

    clickNextbutton() {
        cy.contains('Next').click()
    }

    getLinkedText() {
        return cy.get(home_page_locators['getLinkedText'])
    }

    clickContinueWithYourCurrentDevice() {
        cy.contains('Continue with your current device').click()
    }

}

export default MobileViewPage;