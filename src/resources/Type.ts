import { BaseResource } from "./BaseResource";

export class Type extends BaseResource {
  public getType(teamOrUserId: string): Promise<unknown> {
    return this.apiGet(`/${teamOrUserId}`);
  }
}
