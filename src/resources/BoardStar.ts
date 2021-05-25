import {
  BoardStarRecord,
  BoardStarsFilter,
  PositionOrFloat,
  TypedFetch,
} from "../typeDefs";

import { BaseResource } from "./BaseResource";

export class BoardStar extends BaseResource {
  public getBoardStar(): TypedFetch<BoardStarRecord> {
    return this.apiGet("/");
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  public getBoardStars(params?: {
    filter: BoardStarsFilter;
  }): TypedFetch<BoardStarRecord[]> {
    return this.apiGet("/", params);
  }

  public addBoardStar(params: {
    idBoard: string;
    pos: PositionOrFloat;
  }): TypedFetch<BoardStarRecord> {
    return this.apiPost("/", params);
  }

  public updateBoardStar(params: {
    pos: PositionOrFloat;
  }): TypedFetch<BoardStarRecord> {
    return this.apiPut("/", params);
  }

  public moveToBoard(idBoard: string): TypedFetch<unknown> {
    return this.apiPut("/idBoard", { value: idBoard });
  }

  public updatePosition(value: PositionOrFloat): TypedFetch<BoardStarRecord> {
    return this.apiPut("/pos", { value });
  }

  public deleteBoardStar(): TypedFetch<unknown> {
    return this.apiDelete("/");
  }
}
