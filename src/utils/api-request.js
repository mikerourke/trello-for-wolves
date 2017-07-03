/* @flow */

/* External dependencies */
import axios from 'axios';
import FormData from 'form-data';
import concat from 'concat-stream';

/* Internal dependencies */
import { ApiCallResponseError } from '../utils/errors';

/* Types */
import type { HttpMethod } from '../types';

let thisHttpMethod = 'get';
let thisFile = {
  contents: { readable: false },
  name: '',
};
let thisUrl = '';

/**
 * Handles the request error based on the contents of the Error object returned from the API call.
 * @param {Object} error Custom error created by Axios.
 * @param {Function} reject Reject handler from Promise.
 * @see {@link https://github.com/mzabriskie/axios#handling-errors}
 */
const handleRequestError = (
  error: Object,
  reject: Function,
) => {
  if (error.response) {
    reject(new ApiCallResponseError(error.response));
  } else if (error.request) {
    // @todo: Create custom error for API Request errors.
    reject(error);
  } else {
    // @todo: Create custom error for other API errors.
    reject(error);
  }
};

/**
 * If a file was specified in the request, this reads the contents and returns the configuration
 *    object to include in the Axios request.
 */
const getFileDetailsForRequest = (): Promise<*> =>
  new Promise((resolve, reject) => {
    const form = new FormData();
    form.append('file', thisFile.contents, thisFile.name);
    form
      .on('error', error => reject(error))
      .pipe(concat(
        { encoding: 'buffer' },
        data => resolve({ data, headers: form.getHeaders() })),
      );
  });

/**
 * Constructs an `config` object that will be passed to the Axios instance for performing the API
 *    request.  If a file needs to be uploaded, the contents to send as multipart form data are
 *    added to the object.
 */
const getRequestConfig = (): Promise<*> =>
  new Promise((resolve, reject) => {
    const baseConfig = {
      method: thisHttpMethod,
      url: `https://${thisUrl}`,
    };
    // Ensure the file is a ReadStream.
    if (thisFile.contents.readable) {
      getFileDetailsForRequest()
        .then((fileDetails) => {
          resolve({ ...baseConfig, ...fileDetails });
        })
        .catch((error) => { reject(error); });
    } else {
      resolve(baseConfig);
    }
  });

/**
 * Attempts to make an HTTP request.  The configuration is contingent on whether a file needs to
 *    be uploaded.
 */
const attemptRequest = (): Promise<*> =>
  new Promise((resolve, reject) => {
    getRequestConfig()
      .then((requestConfig) => {
        axios(requestConfig)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      })
      .catch((error) => { reject(error); });
  });

/**
 * Returns a resolved Promise with the results of the Trello API call.
 * @param {HttpMethod} httpMethod Method associated with the request.
 * @param {string} endpoint Endpoint for API request.
 * @param {Object} [queryArgs={}] Arguments for building the querystring.
 * @returns {Promise}
 * @private
 */
const performApiRequest = (
  httpMethod: HttpMethod,
  endpoint: string,
  queryArgs?: Object = {},
): Promise<*> =>
  new Promise((resolve, reject) => {
    // Assign local variables to avoid passing arguments to each method.
    thisHttpMethod = httpMethod;
    // One more check is done to ensure there are no consecutive slashes.
    thisUrl = `api.trello.com/1/${endpoint}`.replace(/\/+/g, '/');
    thisFile = {
      contents: queryArgs.file || { readable: false },
      name: queryArgs.name,
    };

    attemptRequest()
      .then((firstResponse) => {
        resolve(firstResponse);
      })
      .catch((firstError) => {
        // If the error was due to a timeout, wait 3 seconds and try again.
        const firstErrorResponse = firstError.response || { status: 400 };
        if (firstErrorResponse.status === 429) {
          setTimeout(() => {
            attemptRequest()
              .then((secondResponse) => {
                resolve(secondResponse);
              })
              .catch((secondError) => {
                handleRequestError(secondError, reject);
              });
          }, 3000);
        } else {
          handleRequestError(firstError, reject);
        }
      });
  });

export default performApiRequest;
