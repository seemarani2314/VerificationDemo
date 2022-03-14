Feature: Test verification flow using API

   @test
   Scenario: Verify environment details
      Given As a user want to access production environment
      Then Verify response status code is 200
      Then Verify response details

   @test
   Scenario: Create API Test to verify valid details to create new session
      Given As a user I want to enter valid details on the home page POST api
      Then Verify response status code is 200

   @test @negative
   Scenario: Create API test to check invalid details of document country
      Given As a user I want to enter invalid document country details on the home page POST api
      Then Verify response status code is 400

   @test @negative
   Scenario: Create API test to check invalid details of document type
      Given As a user I want to enter invalid document type details on the home page POST api
      Then Verify response status code is 400

   @test
   Scenario: Create API Test which is creating new session
      Given As a user I want to create a new session and config the session created.