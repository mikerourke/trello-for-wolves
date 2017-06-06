/* @flow */

/* Types */
import type {
  AllOrNone,
  ArgumentGroup,
} from '../types';

export type LabelColor =
  'blue'
  | 'green'
  | 'orange'
  | 'purple'
  | 'red'
  | 'yellow';

export type LabelField = 'color' | 'idBoard' | 'name' | 'uses';

export type LabelInclusionQueryArgs = {
  labels?: AllOrNone,
  labelFields?: ArgumentGroup<LabelField>,
};
