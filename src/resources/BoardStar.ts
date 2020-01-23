import { BaseResource } from "./BaseResource";
import { PositionNumbered } from "../typeDefs";

export class BoardStar extends BaseResource {
  public getBoardStars(): Promise<unknown> {
    return this.apiGet("/");
  }

  public getBoardStar(): Promise<unknown> {
    return this.apiGet("/");
  }

  public addBoardStar(params: {
    idBoard: string;
    pos: PositionNumbered;
  }): Promise<unknown> {
    return this.apiPost("/", params);
  }

  public updateBoardStar(params?: {
    pos?: PositionNumbered;
  }): Promise<unknown> {
    return this.apiPut("/", params);
  }

  public moveBoardStarToBoard(idBoard: string): Promise<unknown> {
    return this.apiPut("/idBoard", { value: idBoard });
  }

  public updatePosition(value: PositionNumbered): Promise<unknown> {
    return this.apiPut("/pos", { value });
  }

  public deleteBoardStar(): Promise<unknown> {
    return this.apiDelete("/");
  }
}
