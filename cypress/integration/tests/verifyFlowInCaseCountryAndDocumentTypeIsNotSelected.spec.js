/// <reference types="Cypress" />

import BasePage from "../pages/BasePage.spec";
import BrowserPage from "../pages/BrowserPage.spec"
import HomePage from "../pages/HomePage.spec"
import MobileViewPage from "../pages/MobileViewPage.spec"

describe('Verification Flow', function () {
    it('Verify Flow In Case Country And Document Type Is Not Selected.js', function () {
        cy.fixture('verificationData').then((payload) => {

            const homePage = new HomePage;
            const mobileViewPage = new MobileViewPage;
            const browserPage = new BrowserPage;
            const basePage = new BasePage();

            basePage.launchApplication()

            homePage.getSessionLanguage()
                .click()
            cy.selectValue(payload.lang)
            homePage.getSessionLanguage()
                .should('contain', payload.lang)

            homePage.selectBrowserVerificationType()
                .check()
                .should('be.checked')

            homePage.clickVeriffMeSubmitButton()

            mobileViewPage.clickContinueWithYourCurrentDevice()

            browserPage.getTextLink().then(function (element) {
                const expectedText = 'Prepare a valid government-issued identity documentCheck if your device’s camera is uncovered and workingBe prepared to take a selfie and photos of your ID'
                const actualText = element.text()
                assert.equal(actualText, expectedText, "Both Strings are equal")
            })

            browserPage.clickStartSessionButton()

            //Camera should be connected to verify this page
            browserPage.getSessionPage().then(function (element) {
                var message = element.text()
                var expectedMessage = "Take a photo of your document’s photo pageAccepted documents: "
                assert.equal(message, expectedMessage, "Both strings are equal")
            })
        })
    })
})