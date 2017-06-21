/* @flow */

/* Internal dependencies */
import BaseResource from './base-resource';

type WehookField =
  'active'
  | 'callbackURL'
  | 'description'
  | 'idModel';

/**
 * @namespace Webhook
 */
export default class Webhook extends BaseResource {
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

  updateActiveStatus(value: boolean): Promise<*> {
    return this.httpPut('/active', { value });
  }

  updateCallbackUrl(value: string): Promise<*> {
    return this.httpPut('/callbackURL', { value });
  }

  updateDescription(value: string): Promise<*> {
    return this.httpPut('/description', { value });
  }

  associateWithModel(value: string): Promise<*> {
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
