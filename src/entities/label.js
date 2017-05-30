/* @flow */

/* Internal dependencies */
import Entity from './entity';

/* Types */
import type {
  ArgumentGroup,
  Auth,
  EntityInstance,
} from '../types';

export type LabelColor =
  'blue'
  | 'green'
  | 'orange'
  | 'purple'
  | 'red'
  | 'yellow';
export type LabelField = 'color' | 'idBoard' | 'name' | 'uses';

export default class Label extends Entity {
  constructor(
    auth: Auth,
    labelId?: string = '',
    parent?: ?EntityInstance,
  ) {
    super(auth, 'label', labelId, parent);
  }

  getLabel(urlArgs?: {
    fields?: ArgumentGroup<LabelField>,
  } = {}): Promise<*> {
    const updatedArgs = (this.parent)
      ? { idLabel: this.entity.id, ...urlArgs }
      : urlArgs;
    return this.performRequest('get', { urlArgs: updatedArgs });
  }

  getLabels(urlArgs?: {
    fields?: ArgumentGroup<LabelField>,
    limit?: number,
  } = {}): Promise<*> {
    return this.performRequest('get', { urlArgs });
  }

  createLabel(
    name: string,
    color: string,
  ): Promise<*> {
    return this.performRequest('post', { urlArgs: { name, color } });
  }
}
