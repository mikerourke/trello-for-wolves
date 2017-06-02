/* @flow */

/* Internal dependencies */
import {
  InvalidBooleanError,
  InvalidNumberError,
} from '../utils/errors';
import BaseResource from '../base-resource';

/* Types */
import type {
  Auth,
  PositionNumbered,
  ValueQueryArg,
} from '../types';

export default class SavedSearch extends BaseResource {
  constructor(
    auth: Auth,
    memberId: string,
    instanceId?: string = '',
  ) {
    super(auth, 'savedSearches', {
      instanceId,
      parentPath: `members/${memberId}`,
    });
  }

  getSavedSearch(): Promise<*> {
    return this.httpGet('/');
  }

  getSavedSearches(): Promise<*> {
    return this.httpGet('/');
  }

  updateSavedSearch(queryArgs?: {
    name?: string,
    query?: string,
    pos?: PositionNumbered,
  } = {}): Promise<*> {
    return this.httpPut('/', queryArgs);
  }

  updateName(queryArgs: ValueQueryArg<string>): Promise<*> {
    return this.httpPut('/name', queryArgs);
  }

  updatePosition(queryArgs: ValueQueryArg<PositionNumbered>): Promise<*> {
    return this.httpPut('/pos', queryArgs);
  }

  updateQuery(queryArgs: ValueQueryArg<string>): Promise<*> {
    return this.httpPut('/query', queryArgs);
  }

  addSavedSearch(queryArgs: {
    name: string,
    query: string,
    pos: PositionNumbered,
  }): Promise<*> {
    return this.httpPost('/', queryArgs);
  }
}
