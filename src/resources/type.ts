import BaseResource from './baseResource';

/**
 * @namespace Type
 */
export default class Type extends BaseResource {
  public getType = (teamOrUserId: string): Promise<any> =>
    this.httpGet(`/${teamOrUserId}`);
}
