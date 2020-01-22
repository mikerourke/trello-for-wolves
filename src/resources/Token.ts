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
  public getTokens(options?: {
    filter?: AllOrNone;
    webhooks?: boolean;
  }): Promise<unknown> {
    return this.httpGet("/", options);
  }

  public getToken(options?: {
    fields?: ArgumentGroup<TokenField>;
    webhooks?: boolean;
  }): Promise<unknown> {
    return this.httpGet("/", options);
  }

  public getFieldValue(field: TokenField): Promise<unknown> {
    return this.httpGet(`/${field}`);
  }

  public member(): Member {
    return new Member(this.config, `${this.routePath}/member`);
  }

  public webhooks(webhookId: string = ""): Webhook {
    return new Webhook(this.config, `${this.routePath}/webhooks/${webhookId}`);
  }

  public deleteToken(): Promise<unknown> {
    return this.httpDelete("/");
  }
}
