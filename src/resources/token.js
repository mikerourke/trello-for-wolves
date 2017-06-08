/* @flow */

/* Internal dependencies */
import BaseResource from './base-resource';
import Member from './member';
import Webhook from './webhook';

/* Types */
import type {
  AllOrNone,
  ArgumentGroup,
  Auth,
  ResourceConstructorOptions,
} from '../types';

type TokenField =
  'dateCreated'
  | 'dateExpires'
  | 'idMember'
  | 'identifier'
  | 'permissions';

export default class Token extends BaseResource {
  constructor(
    auth: Auth,
    options?: ResourceConstructorOptions = {},
  ) {
    super(auth, 'token', options);
  }

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
    return new Member(this.auth, this.getOptionsForChild('', '/member'));
  }

  webhook(webhookId?: string = '') {
    return new Webhook(this.auth, this.getOptionsForChild(webhookId));
  }

  deleteToken(): Promise<*> {
    return this.httpDelete('/');
  }
}
