import { BaseResource } from "./BaseResource";
import { PositionNumbered, TypedFetch } from "../typeDefs";

export type BoardStarRecord = {
  idBoard: string;
  pos: number;
};

export type BoardStarsFilter = "mine" | "none";

export class BoardStar extends BaseResource {
  public getBoardStars(): TypedFetch<unknown> {
    return this.apiGet("/");
  }

  public getBoardStar(): TypedFetch<unknown> {
    return this.apiGet("/");
  }

  public addBoardStar(params: {
    idBoard: string;
    pos: PositionNumbered;
  }): TypedFetch<unknown> {
    return this.apiPost("/", params);
  }

  public updateBoardStar(params?: {
    pos?: PositionNumbered;
  }): TypedFetch<unknown> {
    return this.apiPut("/", params);
  }

  public moveBoardStarToBoard(idBoard: string): TypedFetch<unknown> {
    return this.apiPut("/idBoard", { value: idBoard });
  }

  public updatePosition(value: PositionNumbered): TypedFetch<unknown> {
    return this.apiPut("/pos", { value });
  }

  public deleteBoardStar(): TypedFetch<unknown> {
    return this.apiDelete("/");
  }
}
