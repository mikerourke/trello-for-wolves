/* @flow */

/* Internal dependencies */
import BaseResource from './base-resource';

/**
 * @namespace Type
 */
export default class Type extends BaseResource {
  getType(teamOrUserId: string): Promise<*> {
    return this.httpGet(`/${teamOrUserId}`);
  }
}
