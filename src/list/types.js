/* @flow */

/* Types */
import type { ArgumentGroup } from '../types';

export type ListFilter = 'all' | 'closed' | 'none' | 'open';

export type ListField = 'closed' | 'idBoard' | 'name' | 'pos' | 'subscribed';

export type ListInclusionQueryArgs = {
  list?: ListFilter,
  listFields?: ArgumentGroup<ListField>,
};
