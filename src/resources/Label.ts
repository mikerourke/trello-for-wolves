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
  public getLabels(options?: {
    fields?: ArgumentGroup<LabelField>;
  }): Promise<unknown> {
    return this.httpGet("/", options);
  }

  public getLabel(options?: {
    fields?: ArgumentGroup<LabelField>;
  }): Promise<unknown> {
    return this.httpGet("/", options);
  }

  public board(): Board {
    return new Board(this.config, `${this.routePath}/board`);
  }

  public updateLabel(options?: {
    name?: string;
    color?: LabelColor | null;
  }): Promise<unknown> {
    return this.httpPut("/", options);
  }

  public updateColor(value: LabelColor | null): Promise<unknown> {
    return this.httpPut("/color", { value });
  }

  public updateName(value: string): Promise<unknown> {
    return this.httpPut("/name", { value });
  }

  public addLabel(options: {
    name: string;
    color: LabelColor | null;
    idBoard?: string;
  }): Promise<unknown> {
    let updatedArgs = options;
    if (this.routePathElements[0] === "boards") {
      updatedArgs = { ...options, idBoard: this.routePathElements[1] };
    }
    return this.httpPost("/", updatedArgs);
  }

  public deleteLabel(): Promise<unknown> {
    return this.httpDelete("/");
  }
}
