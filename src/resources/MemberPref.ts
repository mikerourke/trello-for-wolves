import { BaseResource } from "./BaseResource";

export class MemberPref extends BaseResource {
  public updateColorBlind(value: boolean): Promise<unknown> {
    return this.apiPut("/colorBlind", { value });
  }

  public updateLocale(value: string): Promise<unknown> {
    return this.apiPut("/locale", { value });
  }

  public updateMinutesBetweenSummaries(value: number): Promise<unknown> {
    return this.apiPut("/minutesBetweenSummaries", { value });
  }
}
