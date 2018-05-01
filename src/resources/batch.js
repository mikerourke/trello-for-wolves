// @flow
import BaseResource from './baseResource';

/**
 * @namespace Batch
 */
export default class Batch extends BaseResource {
  /**
   * @api {get} /batch makeRequests
   * @apiVersion 1.0.0
   * @apiName makeRequests
   * @apiDescription Performs a batch of requests and returns the results.
   * @apiGroup batch
   * @apiPermission read
   *
   * @apiParam {String[]} urls
   *    List of API v1 <code>GET</code> routes. Maximum of 10 routes allowed.
   *    The routes should begin with a forward slash and should not include
   *    the API version number.
   * @apiExample {js} Example:
   * trello.batch().makeRequests([
   *   '/members/me',
   *   '/cards/cArDiD'
   * ]);
   */
  makeRequests(urls: Array<string>): Promise<any> {
    return this.httpGet('/', { urls });
  }
}
