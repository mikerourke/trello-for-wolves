import { BaseResource } from "./BaseResource";
import { Board } from "./Board";
import { ArgumentGroup } from "../typeDefs";

export type LabelColor =
  | "blue"
  | "green"
  | "orange"
  | "purple"
  | "red"
  | "yellow"
  // These colors are also available, they're just not documented:
  | "sky"
  | "lime"
  | "pink"
  | "black";

export type LabelField = "color" | "idBoard" | "name" | "uses";

export class Label extends BaseResource {
  public getLabels(params?: {
    fields?: ArgumentGroup<LabelField>;
  }): Promise<unknown> {
    return this.apiGet("/", params);
  }

  public getLabel(params?: {
    fields?: ArgumentGroup<LabelField>;
  }): Promise<unknown> {
    return this.apiGet("/", params);
  }

  public board(): Board {
    return new Board(this.config, `${this.baseEndpoint}/board`);
  }

  public addLabel(params: {
    name: string;
    color: LabelColor | null;
    idBoard?: string;
  }): Promise<unknown> {
    let updatedArgs = params;
    if (this.endpointElements[0] === "boards") {
      updatedArgs = { ...params, idBoard: this.endpointElements[1] };
    }
    return this.apiPost("/", updatedArgs);
  }

  public updateLabel(params?: {
    name?: string;
    color?: LabelColor | null;
  }): Promise<unknown> {
    return this.apiPut("/", params);
  }

  public updateColor(value: LabelColor | null): Promise<unknown> {
    return this.apiPut("/color", { value });
  }

  public updateName(value: string): Promise<unknown> {
    return this.apiPut("/name", { value });
  }

  public deleteLabel(): Promise<unknown> {
    return this.apiDelete("/");
  }
}
