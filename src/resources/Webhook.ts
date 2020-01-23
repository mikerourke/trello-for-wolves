import { BaseResource } from "./BaseResource";

export type WebhookField = "active" | "callbackURL" | "description" | "idModel";

export class Webhook extends BaseResource {
  public getWebhooks(): Promise<unknown> {
    return this.apiGet("/");
  }

  public getWebhook(): Promise<unknown> {
    return this.apiGet("/");
  }

  public getFieldValue(field: WebhookField): Promise<unknown> {
    return this.apiGet(`/${field}`);
  }

  public addWebhook(params: {
    description?: string;
    callbackURL: string;
    idModel: string;
  }): Promise<unknown> {
    return this.apiPost("/", params);
  }

  public updateWebhook(params?: {
    description?: string;
    callbackURL?: string;
    idModel?: string;
    active?: boolean;
  }): Promise<unknown> {
    return this.apiPut("/", params);
  }

  public updateActiveStatus(value: boolean): Promise<unknown> {
    return this.apiPut("/active", { value });
  }

  public updateCallbackUrl(value: string): Promise<unknown> {
    return this.apiPut("/callbackURL", { value });
  }

  public updateDescription(value: string): Promise<unknown> {
    return this.apiPut("/description", { value });
  }

  public associateWithModel(value: string): Promise<unknown> {
    return this.apiPut("/idModel", { value });
  }

  public deleteWebhook(): Promise<unknown> {
    return this.apiDelete("/");
  }
}
