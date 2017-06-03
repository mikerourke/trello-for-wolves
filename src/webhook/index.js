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

/**
 * @api {path} /webhooks webhook
 * @apiVersion 1.0.0
 * @apiName webhook
 * @apiGroup overview
 * @apiDescription
 * A developer could theoretically parse a user's Boards, Lists, and Cards in
 * order to get all of the information, but this would mean loading a lot of
 * data that doesn't change very often, using more bandwidth, CPU, and RAM
 * for both you and for our servers. To mitigate this we have built a system
 * that allows your application to hook into updates on various members such
 * as Boards, Lists, and Cards. Whenever a member with a Webhook is changed,
 * we make an HTTP request to the endpoint of your choosing.
 */
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
