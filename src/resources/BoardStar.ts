import { BaseResource } from "./BaseResource";
import { PositionNumbered, TypedFetch } from "../typeDefs";

export type BoardStarsFilter = "mine" | "none";

export type BoardStarRecord = {
  _id?: string;
  id?: string;
  idBoard: string;
  pos: number;
};

export class BoardStar extends BaseResource {
  public getBoardStar(): TypedFetch<BoardStarRecord> {
    return this.apiGet("/");
  }

  public getBoardStars(params?: {
    filter: BoardStarsFilter;
  }): TypedFetch<BoardStarRecord[]> {
    return this.apiGet("/", params);
  }

  public addBoardStar(params: {
    idBoard: string;
    pos: PositionNumbered;
  }): TypedFetch<BoardStarRecord> {
    return this.apiPost("/", params);
  }

  public updateBoardStar(params?: {
    pos?: PositionNumbered;
  }): TypedFetch<BoardStarRecord> {
    return this.apiPut("/", params);
  }

  public moveBoardStarToBoard(idBoard: string): TypedFetch<unknown> {
    return this.apiPut("/idBoard", { value: idBoard });
  }

  public updatePosition(value: PositionNumbered): TypedFetch<BoardStarRecord> {
    return this.apiPut("/pos", { value });
  }

  public deleteBoardStar(): TypedFetch<unknown> {
    return this.apiDelete("/");
  }
}
