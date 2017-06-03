/* @flow */

/* Internal dependencies */
import BaseResource from '../base-resource';

/* Types */
import type { Auth } from '../types';

/**
 * @api {path} /batch batch
 * @apiVersion 1.0.0
 * @apiName batch
 * @apiGroup overview
 * @apiDescription The batch endpoint allows you to make multiple
 * <code>GET</code> requests to the Trello API in a single request. By batching
 * <code>GET</code> requests together, you can reduce the volume of calls you
 * are making to the API and more easily stay within your API rate limit.
 * The batch endpoint can not be called recursively; requests containing the
 * batch url will be ignored.
 */
export default class Batch extends BaseResource {
  constructor(auth: Auth) {
    super(auth, 'batch', { resourcePath: '/batch' });
  }

  /**
   * @api {get} /batch makeRequests
   * @apiVersion 1.0.0
   * @apiName makeRequests
   * @apiDescription Performs a batch of requests and returns the results.
   * @apiGroup batch
   * @apiPermission read
   *
   * @apiParam {String[]} urls
   * List of API v1 <code>GET</code> routes. Maximum of 10 routes allowed.
   * The routes should begin with a forward slash and should not include the
   * API version number.
   * @apiExample {js} Example:
   trello.batch().makeRequests([
     '/members/trello',
     '/cards/:cardId'
   ]);
   */
  makeRequests(urls: Array<string>): Promise<*> {
    return this.httpGet('/', { urls });
  }
}
