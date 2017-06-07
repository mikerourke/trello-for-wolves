/* @flow */

/* Internal dependencies */
import BaseResource from './base-resource';

/* Types */
import type {
  Auth,
  PositionNumbered,
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

  updateName(value: string): Promise<*> {
    return this.httpPut('/name', { value });
  }

  updatePosition(value: PositionNumbered): Promise<*> {
    return this.httpPut('/pos', { value });
  }

  updateQuery(value: string): Promise<*> {
    return this.httpPut('/query', { value });
  }

  addSavedSearch(queryArgs: {
    name: string,
    query: string,
    pos: PositionNumbered,
  }): Promise<*> {
    return this.httpPost('/', queryArgs);
  }
}
