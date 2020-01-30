import { BaseResource } from "./BaseResource";
import { TypedFetch, ValueResponse } from "../typeDefs";

/**
 * The data corresponding to a webhook.
 * @typedef {Object} WebhookRecord
 * @property id ID of the webhook.
 * @property description Description provided when creating webhook.
 * @property idModel ID of the Trello object the webhook is watching. This can be
 *                   any Trello object ID (list, board, card, member, etc.).
 * @property callbackURL The URL that the webhook will POST information to.
 * @property active Determines whether the webhook is active or not.
 */
export interface WebhookRecord {
  id: string;
  description: string;
  idModel: string;
  callbackURL: string;
  active: boolean;
}

export type WebhookField =
  | "id"
  | "description"
  | "idModel"
  | "callbackURL"
  | "active";

/**
 * Webhooks allow developers to receive updates regarding actions that have
 * occurred in Trello.
 * @see https://developers.trello.com/reference#webhooks
 * @see https://developers.trello.com/page/webhooks
 */
export class Webhook extends BaseResource {
  public getWebhook(): TypedFetch<WebhookRecord> {
    return this.apiGet("/");
  }

  public getWebhooks(): TypedFetch<WebhookRecord[]> {
    return this.apiGet("/");
  }

  public getFieldValue<T>(
    field: Omit<WebhookField, "id">,
  ): TypedFetch<ValueResponse<T>> {
    return this.apiGet(`/${field}`);
  }

  public addWebhook(params: {
    callbackURL: string;
    idModel: string;
    description?: string;
    active?: boolean;
  }): TypedFetch<WebhookRecord[]> {
    return this.apiPost("/", params);
  }

  public updateWebhook(params: {
    callbackURL?: string;
    idModel?: string;
    description?: string;
    active?: boolean;
  }): TypedFetch<WebhookRecord[]> {
    return this.apiPut("/", params);
  }

  public deleteWebhook(): TypedFetch<ValueResponse<null>> {
    return this.apiDelete("/");
  }
}
