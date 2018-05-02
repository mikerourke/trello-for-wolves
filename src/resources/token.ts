import BaseResource from './baseResource';
import Member from './member';
import Webhook from './webhook';
import { AllOrNone, ArgumentGroup } from '../types';

export type TokenField =
  | 'dateCreated'
  | 'dateExpires'
  | 'idMember'
  | 'identifier'
  | 'permissions';

/**
 * @namespace Token
 */
export default class Token extends BaseResource {
  public getTokens = (queryArgs?: {
    filter?: AllOrNone;
    webhooks?: boolean;
  }): Promise<any> => this.httpGet('/', queryArgs);

  public getToken = (queryArgs?: {
    fields?: ArgumentGroup<TokenField>;
    webhooks?: boolean;
  }): Promise<any> => this.httpGet('/', queryArgs);

  public getFieldValue = (field: TokenField): Promise<any> =>
    this.httpGet(`/${field}`);

  public member = () => new Member(this.config, `${this.routePath}/member`);

  public webhooks = (webhookId: string = '') =>
    new Webhook(this.config, `${this.routePath}/webhooks/${webhookId}`);

  public deleteToken = (): Promise<any> => this.httpDelete('/');
}
