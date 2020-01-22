/**
 * Represents the base error for the application that other Errors inherit from.
 * @extends Error
 */
class BaseError extends Error {
  /**
   * Assigns the message to the Error object and initiates the StackTrace.
   * @param message Error message to display to the user.
   * @param [errorName='BaseError'] Name of the error being thrown.
   * @constructor
   */
  constructor(public message: string, public errorName: string = "BaseError") {
    super(message);
    this.message = message;
    this.name = errorName;
  }
}

/**
 * Error thrown if the API call was not successful and there was a response error.
 * @extends BaseError
 */
export class ApiCallResponseError extends BaseError {
  public apiMessage: string;
  public apiStatusCode: number;

  public constructor(
    statusCode: number,
    method: string,
    url: string,
    data?: object | string,
  ) {
    const cleanUrl = ApiCallResponseError.getCleanUrl(url);

    let includedMessage = "";
    if (data) {
      let dataContent = "";
      if (typeof data === "object") {
        dataContent = JSON.stringify(data);
      } else {
        dataContent = data.toString();
      }
      if (!dataContent.includes("Cannot ")) {
        includedMessage = ` with an error message of "${dataContent}"`;
      }
    }

    const message =
      `The server returned status code ${statusCode}${includedMessage} when ` +
      `attempting to perform a ${method} request to ${cleanUrl}. (Note: The ` +
      "key and token have been removed from the displayed url.)";
    super(message, "ApiCallResponseError");

    this.apiMessage = message;
    this.apiStatusCode = statusCode;
  }

  /**
   * Returns the URL associated with the API call with the key and token values removed.
   * @param url Full URL used for the API call.
   */
  public static getCleanUrl(url: string): string {
    // Get everything before the "key=" string.  Since the key and token are
    // always appended to the end of the URL, this ensures only the pertinent
    // section is kept.
    let cleanUrl = url.split("key=")[0];

    // If the last character represents the start of the query string or is an
    // ampersand, remove it.
    const lastChar = cleanUrl.slice(-1);
    if (lastChar === "?" || lastChar === "&") {
      cleanUrl = cleanUrl.slice(0, -1);
    }
    return cleanUrl;
  }
}

/**
 * Error thrown if a number is not between the specified minimum and maximum values.
 * @extends BaseError
 */
export class NumberBoundsError extends BaseError {
  /**
   * Create the Error and build a custom message.
   * @param fieldName Name of the field that is incorrect.
   * @param [minValue=-1] Minimum allowable number.
   * @param [maxValue=Infinity] Maximum allowable number.
   * @constructor
   */
  public constructor(
    fieldName: string,
    minValue: number = -1,
    maxValue: number = Infinity,
  ) {
    const message = `Parameter ${fieldName} must be between ${minValue} and ${maxValue}`;
    super(message, "NumberBoundsError");
  }
}

/**
 * Error thrown if a string value exceeds a maximum length.
 * @extends BaseError
 */
export class StringLengthError extends BaseError {
  /**
   * Create the Error and build a custom message.
   * @param fieldName Name of the field that is incorrect.
   * @param [maxLength=16384] Maximum allowable length of the string.
   * @param [minLength=0] Minimum allowable length of the string.
   * @constructor
   */
  public constructor(
    fieldName: string,
    minLength: number = 0,
    maxLength: number = 16384,
  ) {
    const message = `Length of parameter ${fieldName} must be between ${minLength} and ${maxLength}`;
    super(message, "StringLengthError");
  }
}

/**
 * Error thrown if the specified field name is of the incorrect type.
 * @extends BaseError
 */
export class InvalidTypeError extends BaseError {
  /**
   * Create the Error and build a custom message.
   * @param fieldName Name of the field that is incorrect.
   * @param typeName Name of the type that the field value is supposed to be.
   * @param helpUrl Link to the Trello API reference with a description of the endpoint.
   * @param [errorName='InvalidTypeError'] Name of the error being thrown.
   * @constructor
   */
  public constructor(
    fieldName: string,
    typeName: string,
    helpUrl: string,
    errorName: string = "InvalidTypeError",
  ) {
    const message =
      `Parameter ${fieldName} must be of type ${typeName}. ` +
      `See https://developers.trello.com/advanced-reference/${helpUrl}`;
    super(message, errorName);
  }
}

/**
 * Error thrown if the specified field's value is supposed to be a boolean, but isn't.
 * @extends InvalidTypeError
 */
export class InvalidBooleanError extends InvalidTypeError {
  /**
   * Create the Error, the custom message is built in the InvalidTypeError constructor.
   * @param fieldName Name of the field that is incorrect.
   * @param helpUrl Link to the Trello API reference with a description of the endpoint.
   * @constructor
   */
  public constructor(fieldName: string, helpUrl: string) {
    super(fieldName, "boolean", helpUrl, "InvalidBooleanError");
  }
}

/**
 * Error thrown if the specified field's value is supposed to be a number, but isn't.
 * @extends InvalidTypeError
 */
export class InvalidNumberError extends InvalidTypeError {
  /**
   * Create the Error, the custom message is built in the InvalidTypeError constructor.
   * @param fieldName Name of the field that is incorrect.
   * @param helpUrl Link to the Trello API reference with a description of the endpoint.
   * @constructor
   */
  public constructor(fieldName: string, helpUrl: string) {
    super(fieldName, "number", helpUrl, "InvalidNumberError");
  }
}

/**
 * Error thrown if the specified field's value is supposed to be a string, but isn't.
 * @extends InvalidTypeError
 */
export class InvalidStringError extends InvalidTypeError {
  /**
   * Create the Error, the custom message is built in the InvalidTypeError constructor.
   * @param fieldName Name of the field that is incorrect.
   * @param helpUrl Link to the Trello API reference with a description of the endpoint.
   * @constructor
   */
  public constructor(fieldName: string, helpUrl: string) {
    super(fieldName, "string", helpUrl, "InvalidStringError");
  }
}
