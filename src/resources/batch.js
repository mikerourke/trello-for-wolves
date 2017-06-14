/* @flow */

/* Internal dependencies */
import BaseResource from './base-resource';

/**
 * @namespace Batch
 */
export default class Batch extends BaseResource {
  makeRequests(urls: Array<string>): Promise<*> {
    return this.httpGet('/', { urls });
  }
}
