import { BaseResource } from "./BaseResource";
import {
  TypedFetch,
  ValueResponse,
  WebhookField,
  WebhookRecord,
} from "../typeDefs";

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
