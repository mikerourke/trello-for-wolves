import { BaseResource } from "./BaseResource";
import { PositionNumbered } from "../typeDefs";

export class BoardStar extends BaseResource {
  public getBoardStars(): Promise<unknown> {
    return this.httpGet("/");
  }

  public getBoardStar(): Promise<unknown> {
    return this.httpGet("/");
  }

  public updateBoardStar(options?: {
    pos?: PositionNumbered;
  }): Promise<unknown> {
    return this.httpPut("/", options);
  }

  public moveBoardStarToBoard(idBoard: string): Promise<unknown> {
    return this.httpPut("/idBoard", { value: idBoard });
  }

  public updatePosition(value: PositionNumbered): Promise<unknown> {
    return this.httpPut("/pos", { value });
  }

  public addBoardStar(options: {
    idBoard: string;
    pos: PositionNumbered;
  }): Promise<unknown> {
    return this.httpPost("/", options);
  }

  public deleteBoardStar(): Promise<unknown> {
    return this.httpDelete("/");
  }
}
