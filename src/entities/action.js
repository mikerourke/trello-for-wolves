/* @flow */

/* External dependencies */
import Promise, { resolve } from 'bluebird';

/* Internal dependencies */
import request from '../lib/request';
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
    return resolve(request(this.auth, 'get', this.endpoint, urlArgs));
  }

  getAllInParent(urlArgs?: GetOptions & FilterOptions): Promise<*> {
    return resolve(request(this.auth, 'get', this.endpoint, urlArgs));
  }
}
