/* @flow */

/* Internal dependencies */
import BaseResource from '../base-resource';

/* Types */
import type {
  Auth,
  ResourceConstructorOptions,
} from '../types';

/**
 * Class representing a Type resource.
 * @extends BaseResource
 */
export default class Type extends BaseResource {
  constructor(
    auth: Auth,
    options?: ResourceConstructorOptions = {},
  ) {
    super(auth, 'type', options);
  }

  getType(teamOrUserId: string): Promise<*> {
    return this.httpGet(`/${teamOrUserId}`);
  }
}
