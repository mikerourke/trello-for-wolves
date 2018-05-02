import BaseResource from './baseResource';

export type WebhookField = 'active' | 'callbackURL' | 'description' | 'idModel';

/**
 * @namespace Webhook
 */
export default class Webhook extends BaseResource {
  public getWebhooks = (): Promise<any> => this.httpGet('/');

  public getWebhook = (): Promise<any> => this.httpGet('/');

  public getFieldValue = (field: WebhookField): Promise<any> =>
    this.httpGet(`/${field}`);

  public updateWebhook = (queryArgs?: {
    description?: string;
    callbackURL?: string;
    idModel?: string;
    active?: boolean;
  }): Promise<any> => this.httpPut('/', queryArgs);

  public updateActiveStatus = (value: boolean): Promise<any> =>
    this.httpPut('/active', { value });

  public updateCallbackUrl = (value: string): Promise<any> =>
    this.httpPut('/callbackURL', { value });

  public updateDescription = (value: string): Promise<any> =>
    this.httpPut('/description', { value });

  public associateWithModel = (value: string): Promise<any> =>
    this.httpPut('/idModel', { value });

  public addWebhook = (queryArgs: {
    description?: string;
    callbackURL: string;
    idModel: string;
  }): Promise<any> => this.httpPost('/', queryArgs);

  public deleteWebhook = (): Promise<any> => this.httpDelete('/');
}
