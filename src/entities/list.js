/* @flow */

/* Internal dependencies */
import Entity from './entity';

/* Types */
import type {
  ArgumentGroup,
  Auth,
  CardField,
  CardStatus,
  EntityInstance,
  Position,
} from '../types';

export type ListField = 'closed' | 'idBoard' | 'name' | 'pos' | 'subscribed';
export type ListStatus = 'all' | 'closed' | 'none' | 'open';

export default class List extends Entity {
  constructor(
    auth: Auth,
    listId?: string = '',
    parent?: ?EntityInstance,
  ) {
    super(auth, 'list', listId, parent);
  }

  getLists(urlArgs?: {
    cards?: CardStatus,
    card_fields?: ArgumentGroup<CardField>,
    filter?: ListStatus,
    fields?: ArgumentGroup<ListField>,
  } = {}): Promise<*> {
    return this.performRequest('get', { urlArgs });
  }

  getFilteredLists(filter: ListStatus): Promise<*> {
    return this.performRequest('get', { path: filter });
  }

  createList(
    name: string,
    urlArgs?: {
      pos?: Position,
    } = {},
  ): Promise<*> {
    const updatedArgs = { name, ...urlArgs };
    return this.performRequest('post', { urlArgs: updatedArgs });
  }
}
