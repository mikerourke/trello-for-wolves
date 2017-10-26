/* @flow */

/**
 * This code was taken from the request-rate-limiter library on npm.  I added Flow
 *    typing and removed some of the logging functionality.  I copied it over because
 *    the library is using an old version of the request library that is insecure.
 * @see https://www.npmjs.com/package/request-rate-limiter
 */

/* External dependencies */
import asyncMethod from 'async-method';
import request from 'request';
import LeakyBucket from 'leaky-bucket';

export default class RequestRateLimiter {
  bucket: Object;
  backoffTime: number;
  backoffTimer: any;
  request: Function;

  constructor(
    options: {
      backoffTime: number,
      maxWaitingTime: number,
    },
  ) {
    const { backoffTime, maxWaitingTime } = options;
    this.backoffTime = backoffTime;
    this.bucket = new LeakyBucket({
      capacity: 100,
      interval: 10,
      maxWaitingTime,
    });
    this.assignRequest();
  }

  /* istanbul ignore next */
  isConfigAFunction(config: Object | Function): boolean {
    return !!(config && config.constructor && config.call && config.apply);
  }

  assignRequest(): void {
    this.request = asyncMethod((requestConfig, callback) => {
      const executeRequest = (error, executeCallback) => {
        const config = executeCallback || requestConfig;
        /* istanbul ignore if */
        if (error) {
          this.handleError(config, callback);
        } else {
          /* istanbul ignore if */
          if ((typeof config !== 'object') && (this.isConfigAFunction(config))) { // eslint-disable-line
            config(null, () => {
              this.backoff(() => executeRequest(null, config));
            });
          } else {
            this.performRequest(config, callback);
          }
        }
      };
      this.bucket.throttle(executeRequest);
    });
  }

  /* istanbul ignore next */
  handleError(config: Object | Function, callback: Function): void {
    const errorMessage = 'The request was not executed because it would not be scheduled within ' +
      'the max waiting time!';
    /* istanbul ignore if */
    if (typeof config !== 'object' && this.isConfigAFunction(config)) {
      config(new Error(errorMessage));
      /* istanbul ignore else */
    } else {
      callback(new Error(errorMessage));
    }
  }

  backoff(
    /* istanbul ignore next */
    config?: Object | Function = {},
    /* istanbul ignore next */
    callback?: Function = () => {},
  ): void {
    if (!this.backoffTimer) {
      this.backoffTimer = setTimeout(() => {
        this.backoffTimer = null;
      }, this.backoffTime * 1000);

      this.bucket.pause(this.backoffTime);
    }
    this.bucket.reAdd((error) => {
      /* istanbul ignore if */
      if (error) {
        this.handleError(config, callback);
      } else {
        /* istanbul ignore if */
        if ((typeof config !== 'object') && (this.isConfigAFunction(config))) { // eslint-disable-line
          config();
        } else {
          this.performRequest(config, callback);
        }
      }
    });
  }

  performRequest(
    config: Object | Function,
    callback: Function,
  ): void {
    request(config, (error, response) => {
      /* istanbul ignore if */
      if (error) {
        callback(error);
      } else if (response.statusCode === 429) {
        this.backoff(config, callback);
      } else {
        callback(null, response);
      }
    });
  }
}
