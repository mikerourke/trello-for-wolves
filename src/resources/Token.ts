import { BaseResource } from "./BaseResource";
import { Member } from "./Member";
import { Webhook } from "./Webhook";
import { AllOrNone, ArgumentGroup } from "../typeDefs";

export type TokenField =
  | "dateCreated"
  | "dateExpires"
  | "idMember"
  | "identifier"
  | "permissions";

export class Token extends BaseResource {
  public getTokens(params?: {
    filter?: AllOrNone;
    webhooks?: boolean;
  }): Promise<unknown> {
    return this.httpGet("/", params);
  }

  public getToken(params?: {
    fields?: ArgumentGroup<TokenField>;
    webhooks?: boolean;
  }): Promise<unknown> {
    return this.httpGet("/", params);
  }

  public getFieldValue(field: TokenField): Promise<unknown> {
    return this.httpGet(`/${field}`);
  }

  public member(): Member {
    return new Member(this.config, `${this.baseEndpoint}/member`);
  }

  public webhooks(webhookId: string = ""): Webhook {
    return new Webhook(this.config, `${this.baseEndpoint}/webhooks/${webhookId}`);
  }

  public deleteToken(): Promise<unknown> {
    return this.httpDelete("/");
  }
}
