/// <reference types="Cypress" />

import BasePage from "../pages/BasePage.spec";
import BrowserPage from "../pages/BrowserPage.spec"
import HomePage from "../pages/HomePage.spec"
import MobileViewPage from "../pages/MobileViewPage.spec"

describe('Happy Path Flow - PASSPORT', function () {
    it('Verify Passport Selection Verification Flow', function () {
        cy.fixture('verificationData').then((payload) => {

            const homePage = new HomePage;
            const mobileViewPage = new MobileViewPage;
            const browserPage = new BrowserPage;
            const basePage = new BasePage();

            basePage.launchApplication()

            homePage.getSessionLanguage().click()
            cy.selectValue(payload.lang)
            homePage.getSessionLanguage().should('contain', payload.lang)


            homePage.enterDocumentCountry().type(payload.document_country)
            cy.selectValue(payload.document_country)
            homePage.enterDocumentCountry().should('have.value', payload.document_country)

            homePage.enterDocumentType().click()
            cy.selectValue(payload.passport)
            homePage.enterDocumentType().should('contain', payload.passport)

            homePage.selectBrowserVerificationType().check().should('be.checked')

            homePage.clickVeriffMeSubmitButton()

            mobileViewPage.clickContinueWithYourCurrentDevice()

            browserPage.getTextLink().then(function (element) {
                const expectedText = 'Prepare a valid government-issued identity documentCheck if your device’s camera is uncovered and workingBe prepared to take a selfie and photos of your ID'
                const actualText = element.text()
                assert.equal(actualText, expectedText, "Both Strings are equal")
            })

            browserPage.clickStartSessionButton()

            browserPage.getLinkTextOnSessionPage().then(function (element) {
                var actualValue = element.text()
                expect(actualValue.includes('Please have your passport ready.')).to.be.true
            })

            browserPage.clickOnContinueButton()
        })
    })
})