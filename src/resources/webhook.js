/* @flow */

/* Internal dependencies */
import BaseResource from './base-resource';

/* Types */
import type {
  Auth,
  ResourceConstructorOptions,
} from '../types';

type WehookField =
  'active'
  | 'callbackURL'
  | 'description'
  | 'idModel';

/**
 * @namespace Webhook
 */
export default class Webhook extends BaseResource {
  constructor(
    auth: Auth,
    options?: ResourceConstructorOptions = {},
  ) {
    super(auth, 'webhook', options);
  }

  getWebhooks(): Promise<*> {
    return this.httpGet('/');
  }

  getWebhook(): Promise<*> {
    return this.httpGet('/');
  }

  getFieldValue(field: WehookField): Promise<*> {
    return this.httpGet(`/${field}`);
  }

  updateWebhook(
    queryArgs?: {
      description?: string,
      callbackURL?: string,
      idModel?: string,
      active?: boolean,
    } = {},
  ): Promise<*> {
    return this.httpPut('/', queryArgs);
  }

  // TODO: Find out how this is different from the POST request.
  updateWebhooks(
    queryArgs: {
      description?: string,
      callbackURL: string,
      idModel: string,
    },
  ): Promise<*> {
    return this.httpPut('/', queryArgs);
  }

  updateActiveStatus(value: boolean): Promise<*> {
    return this.httpPut('/active', { value });
  }

  updateCallbackUrl(value: string): Promise<*> {
    return this.httpPut('/callbackURL', { value });
  }

  updateDescription(value: string): Promise<*> {
    return this.httpPut('/description', { value });
  }

  updateIdModel(value: string): Promise<*> {
    return this.httpPut('/idModel', { value });
  }

  addWebhook(
    queryArgs: {
      description?: string,
      callbackURL: string,
      idModel: string,
    },
  ): Promise<*> {
    return this.httpPost('/', queryArgs);
  }

  deleteWebhook(): Promise<*> {
    return this.httpDelete('/');
  }
}
