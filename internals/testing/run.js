require('dotenv').config();

require('babel-core/register')({
  presets: [
    'es2015',
    'flow'
  ],
  plugins: ['transform-object-rest-spread'],
});

/* External dependencies */
const fs = require('fs');
const path = require('path');
const Mocha = require('mocha');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const chalk = require('chalk');
const shell = require('shelljs');

chai.should();
chai.use(chaiAsPromised);

global.chai = chai;
global.AssertionError = chai.AssertionError;
global.expect = chai.expect;
global.assert = chai.assert;

const printError = (errorMessage) => {
  console.log(chalk.white.bgRed.bold(errorMessage));
}

const validateTestEnvironment = () => {
  let errorMessage = '';
  if (!process.env.TRELLO_API_KEY) {
    errorMessage =
    'You must have a valid Trello API key setup as an environment variable ' +
    'with the name TRELLO_API_KEY.';
  }

  if (!process.env.TRELLO_AUTH_TOKEN) {
    errorMessage =
    'You must have a valid Trello API token setup as an environment variable ' +
    'with the name TRELLO_AUTH_TOKEN.';
  }

  if (errorMessage) {
    errorMessage += ' Add this to your environment or use a .env file in the ' +
                    'root directory.';
    printError(errorMessage);
    return;
  }

  return true;
};

const stageFilesForTesting = () => new Promise((resolve, reject) => {
  const mocha = new Mocha({
    useColors: true,
    timeout: 10000,
  });

  const testFiles = shell
    .find('./tests')
    .filter(file => file.match(/\.test.js$/));

  if (testFiles.length) {
    testFiles.forEach(testFile => {
      mocha.addFile(testFile);
    });
    resolve(mocha);
  }
  reject();
});

const runTests = () => {
  stageFilesForTesting()
    .then((mocha) => {
      mocha.run((failures) => {
        if (failures) {
          printError(`There were ${failures} failing tests.`);
        } else {
          console.log(chalk.white.bgGreen.bold('All tests passed!  Hooray!'));
        }
      });
    })
    .catch(error => console.error(error));
};

if (validateTestEnvironment()) {
  runTests();
}
