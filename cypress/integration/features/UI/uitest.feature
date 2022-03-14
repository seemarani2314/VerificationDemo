@smokeTest
Feature: End to End Verification Flow

    To Perform end to end Verification Flow

    @smoke
    Scenario Outline: Validate the verification flow with the selected country and document type for a user.
        Given I am on Home Page
        When  Enter value in Session Language as "<Session Language>"
        When  Enter value in Document Country as "<Document Country>"
        When  Enter value in Document Type as "<Document Type>"
        When  Select value in Verification Type as "<Verification Type>"
        And   Click on VeriffMe button
        And   Click on Continue with your current device button
        And   Verify the link text displayed on the Start Session Page
        And   Click on Start Session button
        And   Verify the link text displayed on the User New Session Page for "<Document Type>"
        Then  Click on Continue button
        Then  User is ready to take photo

        Examples:
            | Session Language | Document Country | Document Type    | Verification Type |
            | English          | India            | Passport         | Redirect          |
            | English          | Estonia          | Passport         | Redirect          |
            | English          | Estonia          | ID Card          | Redirect          |
            | English          | Estonia          | Driver's license | Redirect          |
            | English          | Estonia          | Residence Permit | Redirect          |
            | English          | Finland          | Passport         | Redirect          |
            | English          | Finland          | ID Card          | Redirect          |
            | English          | Bhutan           | Passport         | Redirect          |

    @sanity
    Scenario Outline: Validate the verification flow in case Document Country and Document Type is missing while creating session
        Given I am on Home Page
        When  Enter value in Session Language as "<Session Language>"
        When  Select value in Verification Type as "<Verification Type>"
        And   Click on VeriffMe button
        And   Click on Continue with your current device button
        And   Verify the link text displayed on the Start Session Page
        And   Click on Start Session button
        Then  New Session should be created for capturing photographs.
        Then  User is ready to take photo

        Examples:
            | Session Language | Verification Type |
            | English          | Redirect          |

    @regression
    Scenario Outline: Validate the verification flow in case Document Type is not provided while creating session
        Given I am on Home Page
        When  Enter value in Session Language as "<Session Language>"
        When  Enter value in Document Country as "<Document Country>"
        When  Select value in Verification Type as "<Verification Type>"
        And   Click on VeriffMe button
        And   Click on Continue with your current device button
        And   Verify the link text displayed on the Start Session Page
        And   Click on Start Session button
        Then  Verify that user is on Document Select ID type page
        Then  Select value in Document Type as "<Document Type>"
        Then  Click on Continue button
        Then  User is ready to take photo

        Examples:
            | Session Language | Document Country | Document Type    | Verification Type |
            | English          | India            | Passport         | Redirect          |
            | English          | Finland          | ID card          | Redirect          |
            | English          | Estonia          | Driver's license | Redirect          |
            | English          | Estonia          | Residence permit | Redirect          |

    @regression
    Scenario Outline: Validate the verification flow in case Document Country is not provided while creating session
        Given I am on Home Page
        When  Enter value in Session Language as "<Session Language>"
        When  Enter value in Document Type as "<Document Type>"
        When  Select value in Verification Type as "<Verification Type>"
        And   Click on VeriffMe button
        And   Click on Continue with your current device button
        And   Verify the link text displayed on the Start Session Page
        And   Click on Start Session button
        Then  Verify that user is on Country Selection page
        Then  Select value in Country Dropdown as "<Document Country>"
        Then  Click on Continue button
        And   Verify the link text displayed on the User New Session Page for "<Document Type>"
        Then  Click on Continue button
        Then  User is ready to take photo

        Examples:
            | Session Language | Document Country | Document Type    | Verification Type |
            | English          | India            | Passport         | Redirect          |
            | English          | Finland          | ID Card          | Redirect          |
            | English          | Estonia          | Driver's license | Redirect          |
            | English          | Estonia          | Residence Permit | Redirect          |