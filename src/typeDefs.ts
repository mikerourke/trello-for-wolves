export interface Config {
  key: string;
  token: string;
  backoffTime?: number;
  maxRetryAttempts?: number;
}

export type AllOrNone = "all" | "none";

export type FieldOrListOf<T> = T | T[];

export type AllOfOrListOf<T> = FieldOrListOf<T> | "all";

export type FilterDate = Date | "lastView" | null;

export type Format = "count" | "list" | "minimal";

export type ColorName =
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

export type PositionOrFloat = Position | number;

export type ValidResourceFields<T> = Omit<keyof T, "limits" | "creationMethod">;

export interface TypedResponse<TPayload = unknown> extends Response {
  json<TResult = TPayload>(): Promise<TResult>;
}

export type TypedFetch<T> = Promise<TypedResponse<T>>;

export interface ValueResponse<T> {
  _value: T;
}

export type FileUpload = Blob | File | FormData;

export interface LimitRecord {
  status: string;
  disableAt: number;
  warnAt: number;
}

export interface Limits {
  attachments?: {
    perBoard?: LimitRecord;
    perCard?: LimitRecord;
  };
  boards?: {
    totalMembersPerBoard?: LimitRecord;
    totalPerMember?: LimitRecord;
  };
  cards?: {
    openPerBoard?: LimitRecord;
    openPerList?: LimitRecord;
    totalPerBoard?: LimitRecord;
    totalPerLimit?: LimitRecord;
  };
  checklists?: {
    perBoard?: LimitRecord;
    perCard?: LimitRecord;
  };
  checkItems?: {
    perChecklist?: LimitRecord;
  };
  customFields?: {
    perBoard?: LimitRecord;
  };
  customFieldOptions?: {
    perField?: LimitRecord;
  };
  labels?: {
    perBoard?: LimitRecord;
  };
  lists?: {
    openPerBoard?: LimitRecord;
    totalPerBoard?: LimitRecord;
  };
  orgs?: {
    totalPerMember?: LimitRecord;
    totalMembersPerOrg?: LimitRecord;
    freeBoardsPerOrg?: LimitRecord;
  };
  stickers?: {
    perCard?: LimitRecord;
  };
  reactions?: {
    perAction?: LimitRecord;
    uniquePerAction?: LimitRecord;
  };
}
