import { ApiCallResponseError } from './errors';
import RequestRateLimiter from './requestRateLimiter';
import { HttpMethod } from '../types';

const getRequestConfig = (
  httpMethod: HttpMethod,
  requestUrl: string,
  queryArgs: any = {},
): object => {
  let requestConfig: any = {
    method: httpMethod,
    url: `https://${requestUrl}`,
    json: true,
  };

  if (queryArgs.file && queryArgs.file.readable) {
    const fileName = queryArgs.name || 'file';
    let formData: any = {
      name: fileName,
      file: queryArgs.file,
    };
    if (queryArgs.mimeType) {
      formData = { ...formData, mimeType: queryArgs.mimeType };
    }
    requestConfig = { ...requestConfig, formData };
  }
  return requestConfig;
};

/**
 * Returns a resolved Promise with the results of the Trello API call.
 * @param {HttpMethod} httpMethod Method associated with the request.
 * @param {string} endpoint Endpoint for API request.
 * @param {number} backoffTime Seconds to wait before retrying API request.
 * @param {number} maxWaitingTime Seconds to wait before throwing error for API request.
 * @param {object} [queryArgs={}] Arguments for building the querystring.
 * @returns {Promise}
 * @private
 */
const performApiRequest = (
  httpMethod: HttpMethod,
  endpoint: string,
  backoffTime: number,
  maxWaitingTime: number,
  queryArgs?: object,
): Promise<any> =>
  new Promise((resolve, reject) => {
    // One more check is done to ensure there are no consecutive slashes.
    const requestUrl = `api.trello.com/1/${endpoint}`.replace(/\/+/g, '/');

    // Build the configuration object for sending the request.
    const requestConfig = getRequestConfig(httpMethod, requestUrl, queryArgs);

    const limiter = new RequestRateLimiter({
      backoffTime,
      maxWaitingTime,
    });

    limiter.request(requestConfig, (error: Error, response: any) => {
      if (error) reject(new Error(`Error performing request: ${error}`));

      if (!response) {
        reject(new Error('No response present when performing request.'));
      }

      const { statusCode = 400, body, ...responseData } = response;
      if (statusCode > 299 || statusCode < 200) {
        reject(
          new ApiCallResponseError(statusCode, httpMethod, requestUrl, body),
        );
      }
      // The "body" key is changed to "data" to maintain backwards compatibility with Axios
      resolve({ ...responseData, statusCode, data: body });
    });
  });

export default performApiRequest;
