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
  Auth,
  CardField,
  CardFilter,
  CheckItemField,
  ChecklistField,
  PositionNumbered,
  ResourceConstructorOptions,
} from '../types';

export type ChecklistField = 'idBoard' | 'idCard' | 'name' | 'pos';

export default class Checklist extends BaseResource {
  constructor(
    auth: Auth,
    options?: ResourceConstructorOptions = {},
  ) {
    super(auth, 'checklist', options);
  }

  getChecklist(
    queryArgs?: {
      cards?: CardFilter,
      cardFields?: ArgumentGroup<CardField>,
      checkItems?: AllOrNone,
      checkItemFields?: ArgumentGroup<CheckItemField>,
      fields?: ArgumentGroup<ChecklistField>,
    } = {},
  ): Promise<*> {
    return this.httpGet('/', queryArgs);
  }

  getChecklists(
    queryArgs?: {
      cards?: CardFilter,
      cardFields?: ArgumentGroup<CardField>,
      checkItems?: AllOrNone,
      checkItemFields?: ArgumentGroup<CheckItemField>,
      filter?: AllOrNone,
      fields?: ArgumentGroup<ChecklistField>,
    } = {},
  ): Promise<*> {
    return this.httpGet('/', queryArgs);
  }

  getChecklistFieldValue(field: ChecklistField): Promise<*> {
    return this.httpGet(`/${field}`);
  }

  board() {
    return new Board(this.auth, this.getOptionsForChild('', '/board'))
  }

  cards() {
    return new Card(this.auth, this.getOptionsForChild())
  }

  checkItems(checkItemId?: string = '') {
    return new CheckItem(this.auth, this.getOptionsForChild(checkItemId))
  }

  updateChecklist(
    queryArgs?: {
      name?: string,
      pos?: PositionNumbered,
    } = {},
  ): Promise<*> {
    return this.httpPut('/', queryArgs);
  }

  updateName(value: string): Promise<*> {
    return this.httpPut('/name', { value });
  }

  updatePosition(value: PositionNumbered): Promise<*> {
    return this.httpPut('/name', { value });
  }

  addChecklist(
    queryArgs: {
      idCard: string,
      name?: string,
      pos?: PositionNumbered,
      idChecklistSource?: string,
    }
  ): Promise<*> {
    return this.httpPost('/', queryArgs);
  }

  deleteChecklist() {
    return this.httpDelete('/');
  }
}
