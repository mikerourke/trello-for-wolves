// @flow
import BaseResource from './baseResource';

/**
 * @namespace Type
 */
export default class Type extends BaseResource {
  getType(teamOrUserId: string): Promise<any> {
    return this.httpGet(`/${teamOrUserId}`);
  }
}
