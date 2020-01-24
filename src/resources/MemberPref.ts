import { BaseResource } from "./BaseResource";
import { TypedFetch } from "../typeDefs";

export class MemberPref extends BaseResource {
  public updateColorBlind(value: boolean): TypedFetch<unknown> {
    return this.apiPut("/colorBlind", { value });
  }

  public updateLocale(value: string): TypedFetch<unknown> {
    return this.apiPut("/locale", { value });
  }

  public updateMinutesBetweenSummaries(value: number): TypedFetch<unknown> {
    return this.apiPut("/minutesBetweenSummaries", { value });
  }
}
