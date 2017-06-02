/* @flow */

/* Internal dependencies */
import BaseResource from '../base-resource';

/* Types */
import type {
  Auth,
  BoardInclusionQueryArgs,
  CardInclusionQueryArgs,
  FieldsQueryArg,
  FilterQueryArg,
  ListField,
  PositionNumbered,
  ValueQueryArg,
} from '../types';

export default class Search extends BaseResource {
  constructor(auth: Auth) {
    super(auth, 'search');
  }

  performSearch(
    query: string,
    queryArgs?: {
      idBoards?: 'mine' | string,
      idOrganizations: string,
      idCards: string,
      modelTypes: string,
    } = {},
  ): Promise<*> {

  }
}
