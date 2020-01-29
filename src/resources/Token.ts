import { BaseResource } from "./BaseResource";
import { Member } from "./Member";
import { Webhook } from "./Webhook";
import {
  AllOfOrListOf,
  AllOrNone,
  TypedFetch,
  ValueResponse,
} from "../typeDefs";

export interface TokenPermissionRecord {
  idModel: string;
  modelType: string;
  read: boolean;
  write: boolean;
}

export interface TokenRecord {
  id: string;
  identifier: string;
  idMember: string;
  dateCreated: string;
  dateExpires: string | null;
  permissions: TokenPermissionRecord[];
}

export interface TokenDeletedRecord extends Omit<TokenRecord, "permissions"> {
  token: string;
  idApplication: string;
  origin: string;
  permissions: TokenPermissionRecord & { _id: string }[];
}

export type TokenField = keyof TokenRecord;

export class Token extends BaseResource {
  public getToken(params?: {
    fields?: AllOfOrListOf<TokenField>;
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
    return new Member(this.config, this.pathElements, "member", {
      isReturnUrl: this.isReturnUrl,
    });
  }

  public webhooks(webhookId: string = ""): Webhook {
    return new Webhook(this.config, this.pathElements, "webhooks", {
      identifier: webhookId,
      isReturnUrl: this.isReturnUrl,
    });
  }
}
