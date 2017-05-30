/* @flow */

/**
 * Represents the base error for the application that other Errors inherit
 *    from.
 * @extends Error
 */
class BaseError extends Error {
  /**
   * Assigns the message to the Error object and initiates the StackTrace.
   * @param {string} message Error message to display to the user.
   */
  constructor(message: string) {
    super(message);
    this.name = 'BaseError';
    this.message = message;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Error thrown if a number is not between the specified minimum and maximum
 *    values.
 * @extends BaseError
 */
export class NumberBoundsError extends BaseError {
  /**
   * Create the Error and build a custom message.
   * @param {string} fieldName Name of the field that is incorrect.
   * @param {number} [minValue=-1] Minimum allowable number.
   * @param {number} [maxValue=Infinity] Maximum allowable number.
   */
  constructor(
    fieldName: string,
    minValue?: number = -1,
    maxValue?: number = Infinity,
  ) {
    const message =
      `Parameter ${fieldName} must be between ${minValue} and ${maxValue}.`;
    super(message);
    this.name = 'NumberBoundsError';
  }
}

/**
 * Error thrown if a string value exceeds a maximum length.
 * @extends BaseError
 */
export class StringLengthError extends BaseError {
  /**
   * Create the Error and build a custom message.
   * @param {string} fieldName Name of the field that is incorrect.
   * @param {number} [maxLength=16384] Maximum allowable length of the string.
   * @param {number} [minLength=0] Minimum allowable length of the string.
   */
  constructor(
    fieldName: string,
    minLength?: number = 0,
    maxLength?: number = 16384,
  ) {
    const message =
      `Length of parameter ${fieldName} must be between ` +
      `${minLength} and ${maxLength}.`;
    super(message);
    this.name = 'StringLengthError';
  }
}

/**
 * Error thrown if the specified field name is of the incorrect type.
 * @extends BaseError
 */
export class InvalidTypeError extends BaseError {
  /**
   * Create the Error and build a custom message.
   * @param {string} fieldName Name of the field that is incorrect.
   * @param {string} typeName Name of the type that the field value is
   *    supposed to be.
   * @param {string} helpUrl Link to the Trello API reference with a
   *    description of the endpoint.
   */
 constructor(
   fieldName: string,
   typeName: string,
   helpUrl: string,
 ) {
   const message =
     `Parameter ${fieldName} must be of type ${typeName}.  ` +
     `See https://developers.trello.com/advanced-reference/${helpUrl}`;
   super(message);
   this.name = 'InvalidTypeError';
 }
}

/**
 * Error thrown if the specified field's value is supposed to be a boolean, but
 *    isn't.
 * @extends InvalidTypeError
 */
export class InvalidBooleanError extends InvalidTypeError {
  /**
   * Create the Error, the custom message is built in the InvalidTypeError
   *    constructor.
   * @param {string} fieldName Name of the field that is incorrect.
   * @param {string} helpUrl Link to the Trello API reference with a
   *    description of the endpoint.
   */
  constructor(
    fieldName: string,
    helpUrl: string,
  ) {
    super(fieldName, 'boolean', helpUrl);
    this.name = 'InvalidBooleanError';
  }
}

/**
 * Error thrown if the specified field's value is supposed to be a number, but
 *    isn't.
 * @extends InvalidTypeError
 */
export class InvalidNumberError extends InvalidTypeError {
  /**
   * Create the Error, the custom message is built in the InvalidTypeError
   *    constructor.
   * @param {string} fieldName Name of the field that is incorrect.
   * @param {string} helpUrl Link to the Trello API reference with a
   *    description of the endpoint.
   */
  constructor(
    fieldName: string,
    helpUrl: string,
  ) {
    super(fieldName, 'number', helpUrl);
    this.name = 'InvalidBooleanError';
  }
}

/**
 * Error thrown if the specified field's value is supposed to be a string, but
 *    isn't.
 * @extends InvalidTypeError
 */
export class InvalidStringError extends InvalidTypeError {
  /**
   * Create the Error, the custom message is built in the InvalidTypeError
   *    constructor.
   * @param {string} fieldName Name of the field that is incorrect.
   * @param {string} helpUrl Link to the Trello API reference with a
   *    description of the endpoint.
   */
  constructor(
    fieldName: string,
    helpUrl: string,
  ) {
    super(fieldName, 'string', helpUrl);
    this.name = 'InvalidStringError';
  }
}
