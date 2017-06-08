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
  PositionNumbered,
  ResourceConstructorOptions,
} from '../types';

export type ChecklistField = 'idBoard' | 'idCard' | 'name' | 'pos';

/**
 * @namespace Checklist
 */
export default class Checklist extends BaseResource {
  constructor(
    auth: Auth,
    options?: ResourceConstructorOptions = {},
  ) {
    super(auth, 'checklist', options);
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

  getFieldValue(field: ChecklistField): Promise<*> {
    return this.httpGet(`/${field}`);
  }

  board() {
    return new Board(this.auth, this.getOptionsForChild('', '/board'));
  }

  cards() {
    return new Card(this.auth, this.getOptionsForChild());
  }

  checkItems(checkItemId?: string = '') {
    return new CheckItem(this.auth, this.getOptionsForChild(checkItemId));
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
    return this.httpPut('/pos', { value });
  }

  addChecklist(
    queryArgs: {
      idCard: string,
      name?: string,
      pos?: PositionNumbered,
      idChecklistSource?: string,
    },
  ): Promise<*> {
    return this.httpPost('/', queryArgs);
  }

  deleteChecklist(): Promise<*> {
    return this.httpDelete('/');
  }
}
