import { BaseResource } from "./BaseResource";

export type WebhookField = "active" | "callbackURL" | "description" | "idModel";

export class Webhook extends BaseResource {
  public getWebhooks(): Promise<unknown> {
    return this.httpGet("/");
  }

  public getWebhook(): Promise<unknown> {
    return this.httpGet("/");
  }

  public getFieldValue(field: WebhookField): Promise<unknown> {
    return this.httpGet(`/${field}`);
  }

  public updateWebhook(options?: {
    description?: string;
    callbackURL?: string;
    idModel?: string;
    active?: boolean;
  }): Promise<unknown> {
    return this.httpPut("/", options);
  }

  public updateActiveStatus(value: boolean): Promise<unknown> {
    return this.httpPut("/active", { value });
  }

  public updateCallbackUrl(value: string): Promise<unknown> {
    return this.httpPut("/callbackURL", { value });
  }

  public updateDescription(value: string): Promise<unknown> {
    return this.httpPut("/description", { value });
  }

  public associateWithModel(value: string): Promise<unknown> {
    return this.httpPut("/idModel", { value });
  }

  public addWebhook(options: {
    description?: string;
    callbackURL: string;
    idModel: string;
  }): Promise<unknown> {
    return this.httpPost("/", options);
  }

  public deleteWebhook(): Promise<unknown> {
    return this.httpDelete("/");
  }
}
