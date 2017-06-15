/* External dependencies */
import fs from 'fs';
import chalk from 'chalk';
import jsonFile from 'jsonfile';
import moment from 'moment';

const key = process.env.TRELLO_API_KEY || '';
const token = process.env.TRELLO_AUTH_TOKEN || '';

export const auth = {
  key,
  token,
};

export const resourceIds = {
  actionId: '592b4b6716732423b99d7f9a',
  attachmentId: '593f436fc7a003f68d0abaf8',
  boardId: 'bJDPVV1A',
  cardId: '592b4b6716732423b99d7f99',
  checkItemId: '593f4613b90814702fe03f39',
  checklistId: '593f4610637b0c70455e8f84',
  commentId: '59370991f5bdf80363e086ad',
  labelId: '5927718cced82109ffc85150',
  listId: '59277195029939eb776c07c4',
  memberId: '56c266ee58b06885bc4e54e3',
  membershipId: '5927718c7a9e8015ddbedcfe',
  orgActionId: '592f0c5a637c4ec4515afd3f',
  orgId: '592f0c5a637c4ec4515afd3d',
  stickerId: '594032c2b50001911daf1ac5',
};

export const getTimeForTest = () => moment().format('YY.MM.D HH:mm:ss');

/**
 * Logger used to log test data to the console and save results of tests to
 *    a file for review.
 */
export class Logger {
  constructor() {
    this.testName = '';
    this.testResults = {};
    this.endpoint = '';
    this.dataFromApiCall = {};
    this.outputFolder = './tests/results';
    if (!fs.existsSync(this.outputFolder)) {
      fs.mkdirSync(this.outputFolder);
    }
  }

  /**
   * Appends an object containing the endpoint and data from the API call to
   *    the testResults object with a key of the test name.
   * @private
   */
  _appendToTestResults() {
    this.testResults[this.testName] = {
      endpoint: this.endpoint,
      data: this.dataFromApiCall,
    };
  }

  /**
   * If the LOG_TEST_RESULTS environment variable is "true", log the endpoint
   *    and response data to the console.
   * @private
   */
  _logToConsoleIfRequired() {
    if (process.env.LOG_TEST_RESULTS) {
      console.log(chalk.magenta('ENDPOINT:'));
      console.log(chalk.magenta(`${this.endpoint}\n`));
      console.log(chalk.blue.bold('DATA:'));
      console.log(chalk.blue(JSON.stringify(this.dataFromApiCall)));
    }
  }

  /**
   * Removes the key and token suffix from the route path prior to assigning
   *    it to the value of endpoint.
   * @param {Object} response Response object from the API call.
   * @returns {string}
   * @private
   */
  _extrapolateEndpoint(response) {
    if (response.request) {
      const keySeparator = 'key=';
      const path = response.request.path || keySeparator;
      return path.split(keySeparator)[0].slice(0, -1);
    }
    return '';
  }

  /**
   * Extrapolates the endpoint and data from the API response.
   * @param {Object} response Response object from the API call.
   * @private
   */
  _parseResponse(response) {
    let responseData = {};
    let endpoint = {};

    // If the response is in the form of multiple requests (using Promise.all),
    // loop through each response and create an object for the endpoint and
    // response data with the key being the index of the response.
    if (Array.isArray(response)) {
      response.forEach((responseItem, index) => {
        endpoint[index] = this._extrapolateEndpoint(responseItem);
        if (responseItem.data) {
          responseData[index] = responseItem.data;
        }
      });
    } else {
      // If the response was for a single request, extrapolate the endpoint and
      // assign the resulting data to the responseData variable.
      if (response.data) {
        responseData = response.data;
      }
      endpoint = this._extrapolateEndpoint(response);
    }

    // This will end up a looking a little weird for multiple responses, but
    // it'll still work.
    this.endpoint = endpoint;
    this.dataFromApiCall = responseData;
  }

  /**
   * If the SAVE_TEST_RESULTS environment variable is "true", save the test
   *    results to a JSON file in the results directory.
   * @param {string} resourceName Name of the resource, this will be used to
   *    name the results JSON file.
   * @returns {Promise}
   */
  writeResultsToFile(resourceName) {
    // Don't write the results if the environment variable isn't set.
    if (!process.env.SAVE_TEST_RESULTS) {
      return Promise.resolve();
    }

    if (!resourceName) {
      return Promise.reject(new Error('No resource name was specified.'));
    }

    // The test results are stored in a file named "[resourceName].json",
    // where "resourceName" was passed as an argument.  The results file is
    // located in the results folder.
    return new Promise((resolve, reject) => {
      const filePath = `${this.outputFolder}/${resourceName}.json`;
      const dataToWrite = this.testResults || {};
      jsonFile.writeFile(filePath, dataToWrite, { spaces: 2 }, (error) => {
        if (error) {
          reject(new Error(error));
        }
        resolve();
      });
    });
  }

  /**
   * Extrapolates the name of the test from the title specified in the
   *    beforeEach method from Mocha.  The test naming convention is:
   *    <code>ACTG01-01</code>
   * @param {string} testTitle Title of the test to parse, it's in the format:
   *    <code>ACTG01-01 | gets an action</code>
   */
  setTestName(testTitle) {
    if (testTitle.includes(' | ')) {
      this.testName = testTitle.split(' | ')[0];
    } else {
      this.testName = 'Unknown';
    }
  }

  /**
   * Parses the response from the API call, extrapolates the pertinent data,
   *    logs to the console (if required), and stores the results.
   * @param {Object} response Response object from API call.
   * @returns {Promise}
   */
  processResponse(response) {
    return new Promise((resolve, reject) => {
      this._parseResponse(response);
      if (this.dataFromApiCall) {
        this._logToConsoleIfRequired();
        this._appendToTestResults();
        resolve(response);
      } else {
        reject(new Error('Error processing response through Logger.'));
      }
    });
  }
}
