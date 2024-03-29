import { TypedFetch, TypeRecord } from "../typeDefs";

import { BaseResource } from "./BaseResource";

/**
 * Because Trello teams and members are not prefixed differently, we need a way to
 * distinguish between the two. The `/types` route is how Trello figures out
 * which is which.
 * @see https://developers.trello.com/reference#types
 * @class
 */
export class Type extends BaseResource {
  public getType(): TypedFetch<TypeRecord> {
    return this.apiGet("/");
  }
}
