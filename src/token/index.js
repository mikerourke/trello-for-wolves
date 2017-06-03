/* @flow */

/* Internal dependencies */
import BaseResource from '../base-resource';

/* Types */
import type {
  Auth,
  FieldsQueryArg,
  ResourceConstructorOptions,
  TokenField,
} from '../types';

/**
 * Class representing a Token resource.
 * @extends BaseResource
 */
export default class Token extends BaseResource {
  constructor(
    auth: Auth,
    options?: ResourceConstructorOptions = {},
  ) {
    super(auth, 'token', options);
  }

  getToken(
    queryArgs?: FieldsQueryArg<TokenField> &
      {
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
