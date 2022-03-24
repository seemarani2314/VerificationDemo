# VerificationDemo
VerificationDemo

## Environment
Windows

## Dependecy
node
npm

## Plugins Used
1. cypress
2. cypress-cucumber-preprocessor
3. cypress-mochawesome-reporter
4. multiple-cucumber-html-reporter

## Techniques used
1. Page Object Model
2. BDD (Cucumber)
3. Docker – CI integration

## Custom Commands
1. REST API testing (GET, POST)
2. Test Tags 

## How to install and run on Docker
1. Pull the branch
2. Go to the project root folder
3. Run command to create image

```bash
docker build -t my-cypress-image:1.1.0 .
```
4. Run command to execute tests 

```bash
docker run -i -v "%cd%":/my-cypress-project -t my-cypress-image:1.1.0 --browser chrome
```

## How to run
1. Headless mode
```bash
docker run -it -v "%cd%":/e2e -w /e2e cypress/included:9.4.1 --browser chrome
```
2. Using scripts defined in package.json
3. Running from the Test Runner, run the command:
```bash
npx cypress open
```
4. click on the required feature files
5. Run scripts using tags
```bash
npx cypress-tags run -e TAGS='@smokeTest'
```

## How to generate report
* Mochawesome report will be generated automatically. 
    * rootfolder > mochawesome-report > mochawesome.html > open this document in any browser
* To generate more interactive cucumber-html report, run the below listed command in visual studio code after execution will be completed.
```bash
node uitest-html-report.js
```
* After executing above mentioned command, follow this path to get the report 
    * rootfolder > reports > index.html > open this document in any browser
