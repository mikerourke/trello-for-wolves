require('dotenv').config();

require('babel-core/register')({
  presets: [
    'es2015',
    'flow'
  ],
  plugins: ['transform-object-rest-spread'],
});

/* External dependencies */
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const chalk = require('chalk');
const Mocha = require('mocha');
const shell = require('shelljs');

chai.should();
chai.use(chaiAsPromised);

const auth = {
  key: process.env.TRELLO_API_KEY || '',
  token: process.env.TRELLO_AUTH_TOKEN || '',
};

global.auth = auth;
global.chai = chai;
global.AssertionError = chai.AssertionError;
global.expect = chai.expect;
global.assert = chai.assert;

const printError = (errorMessage) => {
  console.log(chalk.white.bgRed.bold(errorMessage));
};

const stageFilesForTesting = () => new Promise((resolve) => {
  const mocha = new Mocha({
    // bail: true, // We want to exit the tests if a required resource wasn't created.
    useColors: true,
    timeout: 10000,
  });

  // Ensure the Setup tests are ran before any of the Resource tests.
  mocha.addFile('./tests/utils/query-args-stringifier.test.js');
  mocha.addFile('./tests/setup.test.js');

  const resourceTestFiles = shell
    .find('./tests/resources')
    .filter(file => file.match(/\.test.js$/));

  resourceTestFiles.forEach(resourceTestFile => {
      mocha.addFile(resourceTestFile);
  });

  // Ensure the Teardown tests are ran after all of the Resource tests.
  mocha.addFile('./tests/teardown.test.js');

  resolve(mocha);
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

if (validateTestEnvironment()) {
  runTests();
}
