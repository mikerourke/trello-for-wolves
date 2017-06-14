/* @flow */

/* Internal dependencies */
import BaseResource from './base-resource';
import Member from './member';
import Webhook from './webhook';

/* Types */
import type {
  AllOrNone,
  ArgumentGroup,
} from '../types';

type TokenField =
  'dateCreated'
  | 'dateExpires'
  | 'idMember'
  | 'identifier'
  | 'permissions';

/**
 * @namespace Token
 */
export default class Token extends BaseResource {
  getTokens(
    queryArgs?: {
      filter?: AllOrNone,
      webhooks?: boolean,
    } = {},
  ): Promise<*> {
    return this.httpGet('/', queryArgs);
  }

  getToken(
    queryArgs?: {
      fields?: ArgumentGroup<TokenField>,
      webhooks?: boolean,
    } = {},
  ): Promise<*> {
    return this.httpGet('/', queryArgs);
  }

  getFieldValue(field: TokenField): Promise<*> {
    return this.httpGet(`/${field}`);
  }

  member() {
    return new Member(this.auth, `${this.routePath}/member`);
  }

  webhook(webhookId?: string = '') {
    return new Webhook(this.auth, `${this.routePath}/webhook/${webhookId}`);
  }

  deleteToken(): Promise<*> {
    return this.httpDelete('/');
  }
}
