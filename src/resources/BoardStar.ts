import { BaseResource } from "./BaseResource";
import { PositionOrFloat, TypedFetch } from "../typeDefs";

export type BoardStarsFilter = "mine" | "none";

export type BoardStarRecord<T = { id: string }> = T & {
  idBoard: string;
  pos: number;
};

type GetBoardStarsForBoardResponse<TPayload> = TPayload & {
  boardStars: BoardStarRecord<{ _id: string }>;
};

export class BoardStar extends BaseResource {
  public getBoardStar(): TypedFetch<BoardStarRecord> {
    return this.apiGet("/");
  }

  public getBoardStars<TPayload extends object = {}>(params?: {
    filter: BoardStarsFilter;
  }): TypedFetch<GetBoardStarsForBoardResponse<TPayload> | BoardStarRecord[]> {
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
