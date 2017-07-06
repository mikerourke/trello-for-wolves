require('dotenv').config();

const path = require('path');
const chalk = require('chalk');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.should();
chai.use(chaiAsPromised);

// This is used by all the tests, so it's much easier to set it here.
const auth = {
  key: process.env.TRELLO_API_KEY || /* istanbul ignore next */ '',
  token: process.env.TRELLO_AUTH_TOKEN || /* istanbul ignore next */ '',
};
global.auth = auth;

// Sets the time (in milliseconds) that is called in the before() function
// of each test suite.  This is to ensure the Trello API rate limits aren't
// exceeded.
const testDelay = process.env.TEST_DELAY || /* istanbul ignore next */ 1500;
global.testDelay = testDelay;

// Path to assets (used for uploading files).
const assetsDir = path.resolve(process.cwd(), 'internals/testing/assets');
global.assetsDir = assetsDir;

// Stores the resource information for newly created instances.  This
// prvents the need to read and write to a JSON file.
global.resources = {};

// All the good testing stuff.
global.chai = chai;
global.AssertionError = chai.AssertionError;
global.expect = chai.expect;
global.assert = chai.assert;

/* istanbul ignore next */
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
    console.log(chalk.white.bgRed.bold(errorMessage));
    return;
  }

  return true;
};

if (!validateTestEnvironment()) {
  process.exit();
}
