// @flow
import BaseResource from './baseResource';

/**
 * @namespace Batch
 */
export default class Batch extends BaseResource {
  makeRequests(urls: Array<string>): Promise<any> {
    return this.httpGet('/', { urls });
  }
}
