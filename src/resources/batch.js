/* @flow */

/* Internal dependencies */
import BaseResource from './base-resource';

/* Types */
import type { Auth } from '../types';

/**
 * @namespace Batch
 */
export default class Batch extends BaseResource {
  constructor(auth: Auth) {
    super(auth, 'batch', { resourcePath: '/batch' });
  }

  makeRequests(urls: Array<string>): Promise<*> {
    return this.httpGet('/', { urls });
  }
}
