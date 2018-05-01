// @flow
import { generateTypeMap } from '../utils/typeMapper';
import BaseResource from './baseResource';
import Member from './member';
import Webhook from './webhook';
import type { AllOrNone, ArgumentGroup } from '../types';

export const tokenFieldMap = generateTypeMap(
  'dateCreated',
  'dateExpires',
  'idMember',
  'identifier',
  'permissions',
);
export type TokenField = $Keys<typeof tokenFieldMap>;

/**
 * @namespace Token
 */
export default class Token extends BaseResource {
  getTokens(queryArgs?: {
    filter?: AllOrNone,
    webhooks?: boolean,
  }): Promise<any> {
    return this.httpGet('/', queryArgs);
  }

  getToken(queryArgs?: {
    fields?: ArgumentGroup<TokenField>,
    webhooks?: boolean,
  }): Promise<any> {
    return this.httpGet('/', queryArgs);
  }

  getFieldValue(field: TokenField): Promise<any> {
    return this.httpGet(`/${field}`);
  }

  member() {
    return new Member(this.config, `${this.routePath}/member`);
  }

  webhooks(webhookId?: string = '') {
    return new Webhook(this.config, `${this.routePath}/webhooks/${webhookId}`);
  }

  /* istanbul ignore next: This should pass, but if I delete my token, I can't keep testing. */
  deleteToken(): Promise<any> {
    return this.httpDelete('/');
  }
}
