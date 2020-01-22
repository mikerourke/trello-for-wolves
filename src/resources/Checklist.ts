// @flow
import { generateTypeMap } from '../utils/type-mapper';
import BaseResource from './BaseResource';
import Board from './Board';
import Card from './Card';
import CheckItem from './CheckItem';
import type {
  AllOrNone,
  ArgumentGroup,
  CardField,
  CardFilter,
  CheckItemField,
  PositionNumbered,
} from '../typeDefs';

export const checklistFieldMap = generateTypeMap('idBoard', 'idCard', 'name', 'pos');
export type ChecklistField = $Keys<typeof checklistFieldMap>;

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
  ): Promise<any> {
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
  ): Promise<any> {
    return this.httpGet('/', queryArgs);
  }

  getFieldValue(field: ChecklistField): Promise<any> {
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
  ): Promise<any> {
    return this.httpPut('/', queryArgs);
  }

  updateName(value: string): Promise<any> {
    return this.httpPut('/name', { value });
  }

  updatePosition(value: PositionNumbered): Promise<any> {
    return this.httpPut('/pos', { value });
  }

  addChecklist(
    queryArgs: {
      idCard?: string,
      name?: string,
      pos?: PositionNumbered,
      idChecklistSource?: string,
    },
  ): Promise<any> {
    let updatedArgs = queryArgs;
    if (this.routePathElements[0] === 'cards') {
      updatedArgs = { ...queryArgs, idCard: this.routePathElements[1] };
    }
    return this.httpPost('/', updatedArgs);
  }

  deleteChecklist(): Promise<any> {
    return this.httpDelete('/');
  }
}
