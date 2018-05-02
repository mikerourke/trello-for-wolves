/**
 * Represents the base error for the application that other Errors inherit
 *    from.
 * @extends Error
 */
class BaseError extends Error {
  /**
   * Assigns the message to the Error object and initiates the StackTrace.
   * @param {string} message Error message to display to the user.
   * @param {string} [errorName='BaseError'] Name of the error being thrown.
   */
  constructor(message: string, errorName: string = 'BaseError') {
    super(message);
    this.message = message;
    this.name = errorName;
    if ((Error as any).captureStackTrace) {
      (Error as any).captureStackTrace(this, this.constructor);
    }
  }
}

/**
 * Returns the URL associated with the API call with the key and token
 *    values removed.
 * @param {string} url Full URL used for the API call.
 * @returns {string}
 */
const getCleanUrl = (url: string) => {
  // Get everything before the "key=" string.  Since the key and token are
  // always appended to the end of the URL, this ensures only the pertinent
  // section is kept.
  let cleanUrl = url.split('key=')[0];

  // If the last character represents the start of the query string or is an
  // ampersand, remove it.
  const lastChar = cleanUrl.slice(-1);
  if (lastChar === '?' || lastChar === '&') {
    cleanUrl = cleanUrl.slice(0, -1);
  }
  return cleanUrl;
};

/**
 * Error thrown if the API call was not successful and there was a response error.
 * @extends BaseError
 */
export class ApiCallResponseError extends BaseError {
  apiMessage: string;
  apiStatusCode: number;

  constructor(
    statusCode: number,
    method: string,
    url: string,
    data?: Object | string,
  ) {
    const cleanUrl = getCleanUrl(url);
    let includedMessage = '';
    if (data) {
      let dataContent = '';
      if (typeof data === 'object') {
        dataContent = JSON.stringify(data);
      } else {
        dataContent = data.toString();
      }
      if (!dataContent.includes('Cannot ')) {
        includedMessage = ` with an error message of "${dataContent}"`;
      }
    }
    const message =
      `The server returned status code ${statusCode}${includedMessage} when ` +
      `attempting to perform a ${method} request to ${cleanUrl}. (Note: The ` +
      'key and token have been removed from the displayed url.)';
    super(message, 'ApiCallResponseError');

    this.apiMessage = message;
    this.apiStatusCode = statusCode;
  }
}
