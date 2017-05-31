/* @flow */

/* Internal dependencies */
import BaseResource from '../base-resource';

/* Types */
import type { Auth } from '../types';

/**
 * Class representing a Batch resource.
 * @extends BaseResource
 */
export default class Batch extends BaseResource {
  constructor(auth: Auth) {
    super(auth, 'batch');
  }

  makeRequests(urls: Array<string>): Promise<*> {
    return this.httpGet('/', { urls });
  }
}
