/* @flow */

/* External dependencies */
import Promise from 'bluebird';

/* Internal dependencies */
import Entity from './entity';

/* Types */
import type {
  ActionDate,
  ActionFields,
  Actions,
  Auth,
  EntityInstance,
  Format,
  MemberFields,
} from '../types';

type GetOptions = {
  display?: boolean,
  entities?: boolean,
  fields?: ActionFields,
  member?: boolean,
  memberFields?: MemberFields,
  memberCreator?: boolean,
  memberCreatorFields?: MemberFields,
};

type FilterOptions = {
  filter?: Actions,
  limit?: number,
  format?: Format,
  since?: ActionDate,
  before?: ActionDate,
  page?: number,
  idModels?: string,
};

export default class Action extends Entity {
  constructor(auth: Auth, actionId: string = '', parent?: ?EntityInstance) {
    super(auth, 'action', actionId, parent);
  }

  getAction(urlArgs?: GetOptions): Promise<*> {
    return this.performRequest('get', { urlArgs });
  }

  getActions(urlArgs?: GetOptions & FilterOptions): Promise<*> {
    return this.performRequest('get', { urlArgs });
  }
}
