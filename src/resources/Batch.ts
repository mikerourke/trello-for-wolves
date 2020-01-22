// @flow
import BaseResource from './BaseResource';

/**
 * @namespace Batch
 */
export default class Batch extends BaseResource {
  makeRequests(urls: Array<string>): Promise<any> {
    return this.httpGet('/', { urls });
  }
}
