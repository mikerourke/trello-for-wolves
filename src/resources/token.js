/* @flow */

/* Internal dependencies */
import BaseResource from '../base-resource';

/* Types */
import type {
  AllOrNone,
  ArgumentGroup,
  Auth,
  ResourceConstructorOptions,
} from '../types';

export type TokenField =
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

  getToken(
    queryArgs?: {
      fields?: ArgumentGroup<TokenField>,
      webhooks?: boolean,
    } = {},
  ): Promise<*> {
    return this.httpGet('/', queryArgs);
  }

  getTokens(
    queryArgs?: {
      filter?: AllOrNone,
      webhooks?: boolean,
    } = {},
  ): Promise<*> {
    return this.httpGet('/', queryArgs);
  }

  getFieldValue(field: TokenField): Promise<*> {
    return this.httpGet(`/${field}`);
  }

  deleteToken(): Promise<*> {
    return this.httpDelete('/');
  }
}
