/* @flow */

/* Internal dependencies */
import { generateTypeMap } from '../utils/type-mapper';
import BaseResource from './base-resource';
import Board from './board';

/* Types */
import type { ArgumentGroup } from '../types';

export const labelColorMap = generateTypeMap(
  'blue',
  'green',
  'orange',
  'purple',
  'red',
  'yellow',
  // These colors are also available, they're just not documented:
  'sky',
  'lime',
  'pink',
  'black',
);
export type LabelColor = $Keys<typeof labelColorMap>;

export const labelFieldMap = generateTypeMap('color', 'idBoard', 'name', 'uses');
export type LabelField = $Keys<typeof labelFieldMap>;

/**
 * @namespace Label
 */
export default class Label extends BaseResource {
  getLabels(
    queryArgs?: {
      fields?: ArgumentGroup<LabelField>,
    },
  ): Promise<*> {
    return this.httpGet('/', queryArgs);
  }

  getLabel(
    queryArgs?: {
      fields?: ArgumentGroup<LabelField>,
    },
  ): Promise<*> {
    return this.httpGet('/', queryArgs);
  }

  board() {
    return new Board(this.config, `${this.routePath}/board`);
  }

  updateLabel(
    queryArgs?: {
      name?: string,
      color?: ?LabelColor,
    },
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
      idBoard?: string,
    },
  ): Promise<*> {
    let updatedArgs = queryArgs;
    if (this.routePathElements[0] === 'boards') {
      updatedArgs = { ...queryArgs, idBoard: this.routePathElements[1] };
    }
    return this.httpPost('/', updatedArgs);
  }

  deleteLabel(): Promise<*> {
    return this.httpDelete('/');
  }
}
