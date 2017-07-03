/* External dependencies */
import fs from 'fs';
import chalk from 'chalk';
import jsonFile from 'jsonfile';

/**
 * Logger used to log test data to the console and save results of tests to
 *    a file for review.
 */
export default class Logger {
  constructor() {
    this.testName = '';
    this.testResults = {};
    this.endpoint = '';
    this.dataFromApiCall = {};
    this.outputFolder = './tests/results';
    if (process.env.SAVE_TEST_RESULTS) {
      /* istanbul ignore if */
      if (!fs.existsSync(this.outputFolder)) {
        fs.mkdirSync(this.outputFolder);
      }
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
    /* istanbul ignore if */
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
  /* istanbul ignore next */
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
  /* istanbul ignore next */
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
   * @param {string} fileName Name of the file to write data to.
   * @returns {Promise}
   */
  /* istanbul ignore next */
  writeResultsToFile(fileName) {
    // Don't write the results if the environment variable isn't set.
    if (!process.env.SAVE_TEST_RESULTS) {
      return Promise.resolve();
    }

    if (!fileName) {
      return Promise.reject(new Error('No file name was specified.'));
    }

    // The test results are stored in a file named "[resourceName].json",
    // where "resourceName" was passed as an argument.  The results file is
    // located in the results folder.
    return new Promise((resolve, reject) => {
      const filePath = `${this.outputFolder}/${fileName}.json`;
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
    /* istanbul ignore next */
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
      /* istanbul ignore next */
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
