/* @flow */

/* Types */
import type {
  AllOrNone,
  ArgumentGroup,
} from '../types';

export type ChecklistField = 'idBoard' | 'idCard' | 'name' | 'pos';

export type CheckItemField = 'name' | 'nameData' | 'pos' | 'state' | 'value';

export type CheckItemState = 'complete' | 'false' | 'incomplete' | 'true';

export type CheckItemStateField = 'idCheckItem' | 'state';

export type ChecklistInclusionQueryArgs = {
  checklists?: AllOrNone,
  checklistFields?: ArgumentGroup<ChecklistField>,
};

export type CheckItemInclusionQueryArgs = {
  checkItems?: AllOrNone,
  checkItemFields?: ArgumentGroup<CheckItemField>,
};

export type CheckItemStateInclusionQueryArgs = {
  checkItemStates?: boolean,
  checkItemStateFields?: ArgumentGroup<CheckItemStateField>,
};
