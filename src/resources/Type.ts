import { BaseResource } from "./BaseResource";
import { TypedFetch } from "../typeDefs";

export interface TypeRecord {
  id: string;
  type: string;
}

export class Type extends BaseResource {
  public getType(teamOrUserId: string): TypedFetch<TypeRecord> {
    return this.apiGet(`/${teamOrUserId}`);
  }
}
