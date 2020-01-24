import { BaseResource } from "./BaseResource";
import { TypedFetch } from "../typeDefs";

export type TypeRecord = {
  id: string;
  type: string;
};

export class Type extends BaseResource {
  public getType(teamOrUserId: string): TypedFetch<unknown> {
    return this.apiGet(`/${teamOrUserId}`);
  }
}
