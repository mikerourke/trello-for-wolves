/* @flow */

/* Types */
import type { ArgumentGroup } from '../types';

export type LabelColor =
  'blue'
  | 'green'
  | 'orange'
  | 'purple'
  | 'red'
  | 'yellow';

export type LabelField = 'color' | 'idBoard' | 'name' | 'uses';

export type LabelFieldsQueryArgs = {
  labels?: boolean,
  labelFields?: ArgumentGroup<LabelField>,
};
