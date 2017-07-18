/* @flow */

/* Internal dependencies */
import BaseResource from './base-resource';
import Board from './board';
import Card from './card';
import CheckItem from './check-item';

/* Types */
import type {
  AllOrNone,
  ArgumentGroup,
  CardField,
  CardFilter,
  CheckItemField,
  PositionNumbered,
} from '../types';

export type ChecklistField = 'idBoard' | 'idCard' | 'name' | 'pos';

/**
 * @namespace Checklist
 */
export default class Checklist extends BaseResource {
  getChecklists(
    queryArgs?: {
      cards?: CardFilter,
      cardFields?: ArgumentGroup<CardField>,
      checkItems?: AllOrNone,
      checkItemFields?: ArgumentGroup<CheckItemField>,
      filter?: AllOrNone,
      fields?: ArgumentGroup<ChecklistField>,
    },
  ): Promise<*> {
    return this.httpGet('/', queryArgs);
  }

  getChecklist(
    queryArgs?: {
      cards?: CardFilter,
      cardFields?: ArgumentGroup<CardField>,
      checkItems?: AllOrNone,
      checkItemFields?: ArgumentGroup<CheckItemField>,
      fields?: ArgumentGroup<ChecklistField>,
    },
  ): Promise<*> {
    return this.httpGet('/', queryArgs);
  }

  getFieldValue(field: ChecklistField): Promise<*> {
    return this.httpGet(`/${field}`);
  }

  board() {
    return new Board(this.config, `${this.routePath}/board`);
  }

  cards() {
    return new Card(this.config, `${this.routePath}/cards`);
  }

  checkItem(checkItemId?: string = '') {
    return new CheckItem(this.config, `${this.routePath}/checkItem/${checkItemId}`);
  }

  checkItems(checkItemId?: string = '') {
    return new CheckItem(this.config, `${this.routePath}/checkItems/${checkItemId}`);
  }

  updateChecklist(
    queryArgs?: {
      name?: string,
      pos?: PositionNumbered,
    },
  ): Promise<*> {
    return this.httpPut('/', queryArgs);
  }

  updateName(value: string): Promise<*> {
    return this.httpPut('/name', { value });
  }

  updatePosition(value: PositionNumbered): Promise<*> {
    return this.httpPut('/pos', { value });
  }

  addChecklist(
    queryArgs: {
      idCard?: string,
      name?: string,
      pos?: PositionNumbered,
      idChecklistSource?: string,
    },
  ): Promise<*> {
    let updatedArgs = queryArgs;
    if (this.routePathElements[0] === 'cards') {
      updatedArgs = { ...queryArgs, idCard: this.routePathElements[1] };
    }
    return this.httpPost('/', updatedArgs);
  }

  deleteChecklist(): Promise<*> {
    return this.httpDelete('/');
  }
}
