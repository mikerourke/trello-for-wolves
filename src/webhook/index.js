/* @flow */

/* Internal dependencies */
import BaseResource from '../base-resource';

/* Types */
import type {
  Auth,
  ResourceConstructorOptions,
  WehookField,
  ValueQueryArg,
} from '../types';

type CreationQueryArgs = {
  description?: string,
  callbackURL: string,
  idModel: string,
};

export default class Webhook extends BaseResource {
  constructor(
    auth: Auth,
    options?: ResourceConstructorOptions = {},
  ) {
    super(auth, 'webhook', options);
  }

  getWebhook(): Promise<*> {
    return this.httpGet('/');
  }

  getWebhooks(): Promise<*> {
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
  updateWebhooks(queryArgs: CreationQueryArgs): Promise<*> {
    return this.httpPut('/', queryArgs);
  }

  updateActiveStatus(queryArgs: ValueQueryArg<boolean>): Promise<*> {
    return this.httpPut('/active', queryArgs);
  }

  updateCallbackUrl(queryArgs: ValueQueryArg<string>): Promise<*> {
    return this.httpPut('/callbackURL', queryArgs);
  }

  updateDescription(queryArgs: ValueQueryArg<string>): Promise<*> {
    return this.httpPut('/description', queryArgs);
  }

  updateIdModel(queryArgs: ValueQueryArg<string>): Promise<*> {
    return this.httpPut('/idModel', queryArgs);
  }

  createWebhook(queryArgs: CreationQueryArgs): Promise<*> {
    return this.httpPost('/', queryArgs);
  }

  deleteWebhook(): Promise<*> {
    return this.httpDelete('/');
  }
}
