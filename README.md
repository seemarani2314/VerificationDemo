# VerificationDemo
VerificationDemo

**Environment**
Windows

**Dependecy**
node
npm

**Libraries Used**
cypress
cypress-cucumber-preprocessor
cypress-mochawesome-reporter
multiple-cucumber-html-reporter

**Techniques used**
Page Object Model
BDD (Cucumber)
Docker – CI integration

**Custom Commands**
REST API testing (GET, POST)
Test Tags 

**How to install and run on Docker**
    • Pull the branch
    • Go to the project root folder
    • Run command to create image
        ◦ docker build -t my-cypress-image:1.1.0 .
    • Run command to execute tests 
        ◦ docker run -i -v "%cd%":/my-cypress-project -t my-cypress-image:1.0.0 --browser chrome

**How to run**
    • Headless mode
        ◦ docker run -it -v "%cd%":/e2e -w /e2e cypress/included:9.4.1 --browser chrome
    • Using scripts defined in package.json
    • Running from the Test Runner
        ◦ run the command npx cypress open and click on the required feature files
    • Run scripts using tags
        ◦ npx cypress-tags run -e TAGS='@smokeTest'

**How to generate report**
    • Mochawesome report will be generated automatically. 
        ◦ rootfolder > mochawesome-report > mochawesome.html > open this document in any browser
    • To generate more interactive cucumber-html report, run the below listed command in visual studio code after execution will be completed.
        ◦ node uitest-html-report.js
        ◦ After executing above mentioned command, follow this path to get the report 
	rootfolder > reports > index.html > open this document in any browser
