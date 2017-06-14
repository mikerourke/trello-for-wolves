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
const dirty = require('dirty');
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
};

const stageFilesForTesting = () => new Promise((resolve) => {
  const mocha = new Mocha({
    bail: true, // We want to exit the tests if a required resource wasn't created.
    useColors: true,
    timeout: 10000,
  });

  // These files contain tests that can be ran in any order.
  mocha.addFile('./tests/resources/base-resource.test.js');
  mocha.addFile('./tests/utils/query-args-stringifier.test.js');

  // In order to ensure the tests run correctly, the tests need to be
  // ran in order of resource creation.
  const orderedResources = [
    'organization',
    'board',
    'label',
    'list',
    'card',
    'checklist',
  ];

  orderedResources.forEach(orderedResource => {
    const fileName = `./tests/resources/${orderedResource}.test.js`;
    if (shell.test('-f', fileName)) {
      mocha.addFile(fileName);
    }
  });
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
  // Setup Dirty database for storing Ids.
  const dbPath = './tests/resources/ids.db';
  shell.rm(dbPath);
  const db = new dirty.Dirty(dbPath);
  runTests();
}
