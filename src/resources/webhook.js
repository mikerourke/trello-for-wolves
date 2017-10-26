/* @flow */

/* Internal dependencies */
import { generateTypeMap } from '../utils/type-mapper';
import BaseResource from './base-resource';

export const wehookFieldMap = generateTypeMap(
  'active',
  'callbackURL',
  'description',
  'idModel',
);
export type WebhookField = $Keys<typeof wehookFieldMap>;

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

  getFieldValue(field: WebhookField): Promise<*> {
    return this.httpGet(`/${field}`);
  }

  updateWebhook(
    queryArgs?: {
      description?: string,
      callbackURL?: string,
      idModel?: string,
      active?: boolean,
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
