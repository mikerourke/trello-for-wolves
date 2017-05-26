/* @flow */

/* External dependencies */
import Promise, { resolve } from 'bluebird';

/* Internal dependencies */
import { buildEndpointString } from '../lib/string-builder';
import request from '../lib/request';

/* Types */
import type {
  ActionDate,
  ActionFields,
  Actions,
  Auth,
  Entity,
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

export default class Action {
  auth: Auth;
  endpoint: string;

  constructor(auth: Auth, actionId: string = '', parent?: ?Entity) {
    this.auth = auth;
    this.endpoint = buildEndpointString('actions', actionId, parent);
  }

  getAction(options?: GetOptions): Promise<*> {
    return resolve(request(this.auth, 'get', this.endpoint, options));
  }

  getAllInParent(options?: GetOptions & FilterOptions): Promise<*> {
    return resolve(request(this.auth, 'get', this.endpoint, options));
  }
}
