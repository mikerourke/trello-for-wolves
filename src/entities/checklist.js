/* @flow */

/* Internal dependencies */
import Entity from './entity';

/* Types */
import type {
  AllOrNone,
  ArgumentGroup,
  Auth,
  CardField,
  CardStatus,
  EntityInstance,
  Position,
} from '../types';

export type ChecklistField = 'idBoard' | 'idCard' | 'name' | 'pos';
export type CheckItemField = 'name' | 'nameData' | 'pos' | 'state' | 'value';
export type CheckItemState = 'complete' | 'false' | 'incomplete' | 'true';
export type CheckItemStateField = 'idCheckItem' | 'state';

export default class Checklist extends Entity {
  constructor(
    auth: Auth,
    checklistId?: string = '',
    parent?: ?EntityInstance,
  ) {
    super(auth, 'checklist', checklistId, parent);
  }

  getChecklists(urlArgs?: {
    cards?: CardStatus,
    card_fields?: ArgumentGroup<CardField>,
    checkItems?: AllOrNone,
    checkItem_fields?: ArgumentGroup<CheckItemField>,
    filter?: AllOrNone,
    fields?: ArgumentGroup<ChecklistField>,
  } = {}): Promise<*> {
    return this.performRequest('get', { urlArgs });
  }

  getCheckItemStates(fields?: ArgumentGroup<CheckItemStateField>): Promise<*> {
    return this.performRequest('get', {
      urlArgs: { fields },
      entityNameOverride: 'checkItemStates',
    });
  }

  getCheckItem(
    idCheckItem: string,
    urlArgs?: {
      fields?: ArgumentGroup<CheckItemField>,
    } = {},
  ): Promise<*> {
    return this.performRequest('get', {
      urlArgs,
      path: idCheckItem,
      entityNameOverride: 'checkItem',
    });
  }

  updateCheckItem(
    idCheckItem: string,
    urlArgs?: {
      name?: string,
      state?: CheckItemState,
      idChecklist?: string,
      pos?: Position,
    } = {},
  ): Promise<*> {
    return this.performRequest('put', {
      urlArgs,
      path: `checkItem/${idCheckItem}`,
      entityNameOverride: 'checklist',
    });
  }

  updateCheckItemField(
    field: CheckItemField,
    idCheckItem: string,
    value: string | Position | CheckItemState,
  ): Promise<*> {
    const urlArgs = { idChecklist: this.entity.id, idCheckItem, value };
    return this.performRequest('put', {
      urlArgs,
      path: `checkItem/${idCheckItem}/${field}`,
      entityNameOverride: 'checklist',
    });
  }

  createChecklist(name: string): Promise<*> {
    return this.performRequest('post', { urlArgs: { name } });
  }
}
