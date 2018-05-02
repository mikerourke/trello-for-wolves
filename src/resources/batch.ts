import BaseResource from './baseResource';

/**
 * @namespace Batch
 */
export default class Batch extends BaseResource {
  public makeRequests = (urls: Array<string>): Promise<any> =>
    this.httpGet('/', { urls });
}
