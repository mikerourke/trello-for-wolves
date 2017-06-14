/* @flow */

/* Internal dependencies */
import BaseResource from './base-resource';
import Board from './board';

/* Types */
import type { ArgumentGroup } from '../types';

export type LabelColor =
  'blue'
  | 'green'
  | 'orange'
  | 'purple'
  | 'red'
  | 'yellow'
  // These colors are also available, they're just not documented:
  | 'sky'
  | 'lime'
  | 'pink'
  | 'black';

export type LabelField = 'color' | 'idBoard' | 'name' | 'uses';

/**
 * @namespace Label
 */
export default class Label extends BaseResource {
  getLabels(
    queryArgs?: {
      fields?: ArgumentGroup<LabelField>,
    } = {},
  ): Promise<*> {
    return this.httpGet('/', queryArgs);
  }

  getLabel(
    queryArgs?: {
      fields?: ArgumentGroup<LabelField>,
    } = {},
  ): Promise<*> {
    return this.httpGet('/', queryArgs);
  }

  board() {
    return new Board(this.auth, `${this.routePath}/board`);
  }

  updateLabel(
    queryArgs?: {
      name?: string,
      color?: ?LabelColor,
    } = {},
  ): Promise<*> {
    return this.httpPut('/', queryArgs);
  }

  updateColor(value: ?LabelColor): Promise<*> {
    return this.httpPut('/color', { value });
  }

  updateName(value: string): Promise<*> {
    return this.httpPut('/name', { value });
  }

  addLabel(
    queryArgs: {
      name: string,
      color: ?LabelColor,
      idBoard: string,
    },
  ): Promise<*> {
    return this.httpPost('/', queryArgs);
  }

  deleteLabel(): Promise<*> {
    return this.httpDelete('/');
  }
}
