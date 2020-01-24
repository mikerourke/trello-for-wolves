export type Config = {
  key: string;
  token: string;
  backoffTime?: number;
  maxRetryAttempts?: number;
};

export type AllOrNone = "all" | "none";

export type FieldOrListOf<T> = T | T[];

export type AllOfOrListOf<T> = FieldOrListOf<T> | "all";

export type FilterDate = Date | "lastView" | null;

export type Format = "count" | "list" | "minimal";

export type KeepFromSourceField =
  | "attachments"
  | "checklists"
  | "comments"
  | "due"
  | "labels"
  | "members"
  | "stickers";

export type PermissionLevel = "private" | "public";

export type Position = "bottom" | "top";

export type PositionNumbered = Position | number;

export type QueryParamsByName = Record<string, unknown>;

export interface TypedResponse<TPayload = unknown> extends Response {
  json<TResult = TPayload>(): Promise<TResult>;
}

export type TypedFetch<T> = Promise<TypedResponse<T>>;

export type ValueResponse<T> = {
  _value: T;
};
