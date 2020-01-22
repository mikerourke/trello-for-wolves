import { BaseResource } from "./BaseResource";

export class MemberPref extends BaseResource {
  public updateColorBlind(value: boolean): Promise<unknown> {
    return this.httpPut("/colorBlind", { value });
  }

  public updateLocale(value: string): Promise<unknown> {
    return this.httpPut("/locale", { value });
  }

  public updateMinutesBetweenSummaries(value: number): Promise<unknown> {
    return this.httpPut("/minutesBetweenSummaries", { value });
  }
}
