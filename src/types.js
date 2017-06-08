/* @flow */

/* Types */
export type * from './resources/action';
export type * from './resources/attachment';
export type * from './resources/base-resource';
export type * from './resources/board';
export type * from './resources/board-background';
export type * from './resources/card';
export type * from './resources/check-item';
export type * from './resources/checklist';
export type * from './resources/custom-emoji';
export type * from './resources/label';
export type * from './resources/list';
export type * from './resources/member';
export type * from './resources/membership';
export type * from './resources/notification';
export type * from './resources/organization';
export type * from './resources/search';
export type * from './resources/sticker';
export type * from './resources/token';
export type * from './resources/type';
export type * from './resources/webhook';

export type Auth = {
  key: string,
  token: string,
};

export type AllOrNone = 'all' | 'none';

export type ArgumentGroup<T> = T | Array<T> | 'all';

export type FilterDate = ?Date | 'lastView';

export type Format = 'count' | 'list' | 'minimal';

export type KeepFromSourceField =
  'attachments'
  | 'checklists'
  | 'comments'
  | 'due'
  | 'labels'
  | 'members'
  | 'stickers';

export type PermissionLevel = 'private' | 'public';

export type Position = 'bottom' | 'top';

export type PositionNumbered = Position | number;
