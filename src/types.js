/* @flow */

/* Types */
export type * from './action/types';
export type * from './attachment/types';
export type * from './base-resource/types';
export type * from './board/types';
export type * from './card/types';
export type * from './checklist/types';
export type * from './label/types';
export type * from './list/types';
export type * from './member/types';
export type * from './membership/types';
export type * from './notification/types';
export type * from './organization/types';
export type * from './search/types';
export type * from './token/types';
export type * from './type/types';
export type * from './webhook/types';

export type Auth = {
  key: string,
  token: string,
};

export type AllOrNone = 'all' | 'none';

export type ArgumentGroup<T> = T | Array<T> | 'all';

export type FilterDate = ?Date | 'lastView';

export type Format = 'count' | 'list' | 'minimal';

export type PermissionLevel = 'private' | 'public';

export type Position = 'bottom' | 'top';

export type PositionNumbered = Position | number;

/**
 * @apiDefine DeltasQueryArgs
 * @apiParam {String} tags A valid tag for subscribing.
 * @apiParam {Number{-1-Infinity}} ixLastUpdate Index of last update.
 */
export type DeltasQueryArgs = {
  tags: string,
  ixLastUpdate: number,
};

export type FieldsQueryArg<T> = {
  fields?: ArgumentGroup<T>,
};

export type FileQueryArg = {
  file: Object,
};

export type FilterQueryArg<T> = {
  filter?: T,
};

export type ValueQueryArg<T> = {
  value: T,
};

export type WithinLimitsQueryArgs = {
  before?: ?FilterDate,
  since?: ?FilterDate,
  limit?: number,
  format?: Format,
};
