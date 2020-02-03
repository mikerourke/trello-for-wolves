import { BaseResource } from "./BaseResource";
import { Member } from "./Member";
import { Webhook } from "./Webhook";
import {
  AllOrFieldOrListOf,
  AllOrNone,
  TokenDeletedRecord,
  TokenField,
  TokenRecord,
  TypedFetch,
  ValueResponse,
} from "../typeDefs";

export class Token extends BaseResource {
  public getToken(params?: {
    fields?: AllOrFieldOrListOf<TokenField>;
    webhooks?: boolean;
  }): TypedFetch<TokenRecord> {
    return this.apiGet("/", params);
  }

  public getTokens(params?: {
    filter?: AllOrNone;
    webhooks?: boolean;
  }): TypedFetch<TokenRecord[]> {
    return this.apiGet("/", params);
  }

  public getFieldValue<T>(field: TokenField): TypedFetch<ValueResponse<T>> {
    return this.apiGet(`/${field}`);
  }

  public deleteToken(): TypedFetch<TokenDeletedRecord> {
    return this.apiDelete("/");
  }

  public member(): Member {
    return new Member(this.config, this.pathElements, "member");
  }

  public webhooks(webhookId: string = ""): Webhook {
    return new Webhook(this.config, this.pathElements, "webhooks", {
      identifier: webhookId,
    });
  }
}
