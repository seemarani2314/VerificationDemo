import { Given, When, And, Then } from "cypress-cucumber-preprocessor/steps"
import BasePage from "../../../pages/BasePage.spec";
import BrowserPage from "../../../pages/BrowserPage.spec"
import HomePage from "../../../pages/HomePage.spec"
import MobileViewPage from "../../../pages/MobileViewPage.spec"

const homePage = new HomePage();
const basePage = new BasePage();
const mobileViewPage = new MobileViewPage();
const browserPage = new BrowserPage();

Given('I am on Home Page', function () {
    basePage.launchApplication()
})

When('Enter value in Session Language as {string}', function (sessionLanguage) {
    homePage.getSessionLanguage().click()
    cy.selectValue(sessionLanguage)
    homePage.getSessionLanguage().should('contain', sessionLanguage)
})

When('Enter value in Document Country as {string}', function (documentCountry) {
    homePage.enterDocumentCountry().type(documentCountry)
    cy.selectValue(documentCountry)
    homePage.enterDocumentCountry().should('have.value', documentCountry)
})

When('Enter value in Document Type as {string}', function (documentType) {
    homePage.enterDocumentType().click()
    cy.selectValue(documentType)
    homePage.enterDocumentType().should('contain', documentType)
})

When('Select value in Verification Type as {string}', function (element) {
    homePage.selectBrowserVerificationType().check().should('be.checked')
})

And('Click on VeriffMe button', () => {
    homePage.clickVeriffMeSubmitButton()
})

And('Click on Continue with your current device button', function () {
    mobileViewPage.clickContinueWithYourCurrentDevice()
})

And('Verify the link text displayed on the Start Session Page', function () {
    browserPage.getTextLink().then(function (element) {
        const expectedText = 'Prepare a valid government-issued identity documentCheck if your device’s camera is uncovered and workingBe prepared to take a selfie and photos of your ID'
        const actualText = element.text()
        assert.equal(actualText, expectedText, "Both Strings are equal")
    })
})

And('Click on Start Session button', function () {
    browserPage.clickStartSessionButton()
})

And('Verify the link text displayed on the User New Session Page for {string}', function (value) {
    browserPage.getLinkTextOnSessionPage().then(function (element) {
        var actualValue = element.text()
        if (value === 'Passport') {
            expect(actualValue.includes('Please have your passport ready.')).to.be.true
        }
        else if (value === 'ID Card') {
            expect(actualValue.includes('Please have your ID card ready.')).to.be.true
        }
        else if (value === 'Residence Permit') {
            expect(actualValue.includes("Please have your residence permit ready.")).to.be.true
        }
        else if (value === "Driver's license") {
            expect(actualValue.includes("Please have your driver’s license ready.")).to.be.true
        }
    })
})

Then('Click on Continue button', function () {
    browserPage.clickOnContinueButton()
    cy.wait(5000);
})

Then('Verify that user is on Country Selection page', function () {
    browserPage.selectIssuingCountry().then(function (element) {
        var actualValue = element.text()
        expect(actualValue.includes('Select issuing country')).to.be.true
    })

    browserPage.getText().then(function (element) {
        var actualValue = element.text()
        expect(actualValue.includes('Please select the country that issued your ID.')).to.be.true
    })
})

Then('Select value in Country Dropdown as {string}', function (countryName) {
    mobileViewPage.getSelect().select(countryName)
    browserPage.getValue().should('contain', countryName)
})

Then('New Session should be created for capturing photographs.', function () {
    browserPage.getSessionPage().then(function (element) {
        var message = element.text()
        expect(message.includes('Take a photo of your document’s photo pageAccepted documents:')).to.be.true
    })
})

Then('Verify that user is on Document Select ID type page', () => {
    browserPage.getverifyTitle().should('eq', 'Document - Select ID type - Veriff')
})

Then('Select value in Document Type as {string}', function (documentType) {
    cy.selectDocumentType(documentType)
})

Then('User is ready to take photo', () => {
    browserPage.messageOnLog()
})