import { Given, When, And, Then } from "cypress-cucumber-preprocessor/steps"

const endpointAccessApplication = 'https://demo.saas-3.veriff.me/environment'
const endpointPostData = 'https://demo.saas-3.veriff.me/'
const endpointGetConfig = 'https://magic.saas-3.veriff.me/api/v2/configs'
const endpointGetSession = 'https://magic.saas-3.veriff.me/api/v2/sessions'
const endpointVerification = 'https://magic.saas-3.veriff.me/api/v2/verifications/'

Given('As a user want to access production environment', () => {
    cy.request({
        method: 'GET',
        url: endpointAccessApplication,
    }).as('post_user_data')
})

Then('Verify response details', () => {
    cy.get('@post_user_data').should((response) => {
        expect(response.body).has.to.deep.equal({
            "env": "production"
        })

    })
})

Given('As a user I want to enter valid details on the home page POST api', () => {
    cy.fixture('createSession').then((payload) => {
        cy.request({
            method: 'POST',
            url: endpointPostData,
            body: {
                "document_country": payload.document_country,
                "document_type": payload.document_type,
                "full_name": payload.full_name,
                "lang": payload.lang
            }
        }).as('post_user_data')
    })
});

Then('Verify response status code is {int}', (statusCode) => {
    cy.get('@post_user_data').should((response) => {
        expect(response.status).to.eq(statusCode);
    })
})

Given('As a user I want to enter invalid document country details on the home page POST api', () => {
    cy.fixture('createSession').then((payload) => {
        cy.request({
            method: 'POST',
            url: endpointPostData,
            body: {
                "document_country": payload.incorrect_details,
                "document_type": payload.document_type,
                "full_name": payload.full_name,
                "lang": payload.lang
            },
            failOnStatusCode: false
        }).as('post_user_data')
    })
})

Given('As a user I want to enter invalid document type details on the home page POST api', () => {
    cy.fixture('createSession').then((payload) => {
        cy.request({
            method: 'POST',
            url: endpointPostData,
            body: {
                "document_country": payload.document_country,
                "document_type": payload.incorrect_details,
                "full_name": payload.full_name,
                "lang": payload.lang
            },
            failOnStatusCode: false
        }).as('post_user_data')
    })
})

Given('As a user I want to create a new session and config the session created.', () => {
    cy.fixture('createSession').then((payload) => {

        cy.request({
            method: 'POST',
            url: endpointPostData,
            body: {
                "document_country": payload.document_country,
                "document_type": payload.document_type,
                "full_name": payload.full_name,
                "lang": payload.lang
            }
        }).then(res => {
            expect(res.status).to.eq(200)

            const newSessionToken = res.body.sessionToken
            cy.log("session token is = " + newSessionToken)

            cy.request({
                method: 'GET',
                url: endpointGetConfig,
                headers: {
                    'Authorization': 'Bearer ' + newSessionToken
                }
            }).then(res => {
                expect(res.status).to.eq(200)
                expect(res.body).has.to.deep.equal({
                    "geoIpCountry": "IN",
                    "hostname": "magic.saas-3.veriff.me"
                })
                expect(res.headers).has.property('content-type', 'application/json; charset=utf-8')

                cy.request({
                    method: 'GET',
                    url: endpointGetSession,
                    headers: {
                        'Authorization': 'Bearer ' + newSessionToken
                    }
                }).then(res => {
                    expect(res.status).to.eq(200)
                    const sessionId = res.body.id
                    cy.log("session id = " + sessionId)
                    expect(res.body.status).to.eq('created')
                    expect(res.body.initData.language).to.eq('en')
                    expect(res.body.initData.preselectedDocument).to.have.property('country', 'IN')
                    expect(res.body.initData.preselectedDocument).to.have.property('type', 'PASSPORT')
                    const integrationId = res.body.vendorIntegration.id
                    cy.log("integration id = " + integrationId)
                    expect(res.body.activeVerificationSession.status).to.eq('created')
                    const activeVerificationSessionId = res.body.activeVerificationSession.id
                    cy.log("integration id = " + activeVerificationSessionId)
                    expect(res.body.activeVerificationSession.document).has.to.deep.equal({
                        "country": "IN",
                        "type": "PASSPORT"
                    })
                    expect(res.body.copyStrings.intro[0]).to.have.property('key', 'vrff.handover.next.document');
                    expect(res.body.copyStrings.intro[0]).to.have.property('value', 'Prepare a valid government-issued identity document');
                    expect(res.body.copyStrings.intro[1]).to.have.property('key', 'vrff.handover.next.camera');
                    expect(res.body.copyStrings.intro[1]).to.have.property('value', 'Check if your device’s camera is uncovered and working');
                    expect(res.body.copyStrings.intro[2]).to.have.property('key', 'vrff.handover.next.step.default');
                    expect(res.body.copyStrings.intro[2]).to.have.property('value', 'Be prepared to take a selfie and photos of your ID');

                    cy.request({
                        method: 'POST',
                        url: endpointVerification + activeVerificationSessionId + '/browser-id-tokens',
                        headers: {
                            'Authorization': 'Bearer ' + newSessionToken,
                            'X-Veriff-Platform': 'web'
                        },
                        body: {
                            "initData": {
                                "language": "en",
                                "preselectedDocument": {
                                    "country": "IN",
                                    "type": "PASSPORT"
                                }
                            },
                            "vendorIntegration": {
                                "id": "cccddd07-1bba-4eee-8884-14a5d35d09e3",
                                "name": "End User Web Demo (Production)",
                                "publicName": "Demo Inc"
                            }
                        },

                    }).then(res => {
                        expect(res.status).to.eq(201)
                        const bearerToken = res.body.token
                        cy.log("session token is = " + bearerToken)
                    })
                })
            })
        })
    })

})


