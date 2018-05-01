// @flow
import BaseResource from './baseResource';

export type WebhookField = 'active' | 'callbackURL' | 'description' | 'idModel';

/**
 * @namespace Webhook
 */
export default class Webhook extends BaseResource {
  getWebhooks(): Promise<any> {
    return this.httpGet('/');
  }

  getWebhook(): Promise<any> {
    return this.httpGet('/');
  }

  getFieldValue(field: WebhookField): Promise<any> {
    return this.httpGet(`/${field}`);
  }

  updateWebhook(queryArgs?: {
    description?: string,
    callbackURL?: string,
    idModel?: string,
    active?: boolean,
  }): Promise<any> {
    return this.httpPut('/', queryArgs);
  }

  updateActiveStatus(value: boolean): Promise<any> {
    return this.httpPut('/active', { value });
  }

  updateCallbackUrl(value: string): Promise<any> {
    return this.httpPut('/callbackURL', { value });
  }

  updateDescription(value: string): Promise<any> {
    return this.httpPut('/description', { value });
  }

  associateWithModel(value: string): Promise<any> {
    return this.httpPut('/idModel', { value });
  }

  addWebhook(queryArgs: {
    description?: string,
    callbackURL: string,
    idModel: string,
  }): Promise<any> {
    return this.httpPost('/', queryArgs);
  }

  deleteWebhook(): Promise<any> {
    return this.httpDelete('/');
  }
}
