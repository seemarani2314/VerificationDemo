/// <reference types="Cypress" />

import BasePage from "../pages/BasePage.spec";
import HomePage from "../pages/HomePage.spec"
import MobileViewPage from "../pages/MobileViewPage.spec"

describe('Happy Path Flow - Mobile Window Flow', function () {
    it('Verify Mobile Verification Flow', function () {
        cy.fixture('verificationData').then((payload) => {

            const homePage = new HomePage;
            const mobileViewPage = new MobileViewPage;
            const basePage = new BasePage();

            basePage.launchApplication()

            homePage.getSessionLanguage().click()
            cy.selectValue(payload.lang)
            homePage.getSessionLanguage()
                .should('contain', payload.lang)

            homePage.enterDocumentCountry().type(payload.document_country)
            cy.selectValue(payload.document_country)
            homePage.enterDocumentCountry()
                .should('have.value', payload.document_country)

            homePage.enterDocumentType().click()
            cy.selectValue(payload.id_card)
            homePage.enterDocumentType()
                .should('contain', payload.id_card)

            homePage.selectBrowserVerificationType()
                .check()
                .should('be.checked')

            homePage.clickVeriffMeSubmitButton()

            mobileViewPage.getSelect()
                .should('have.value', 'IN')

            mobileViewPage.getPhoneNumberAutopopulated()
                .type('9518471230')

            mobileViewPage.clickNextbutton()

            mobileViewPage.getLinkedText()
                .then(function (textElement) {
                    const actualText = textElement.text()
                    expect(actualText.includes("sent a secure link to +919518471230")).to.be.true
                })
        })
    })
})