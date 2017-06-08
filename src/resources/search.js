/* @flow */

/* Internal dependencies */
import BaseResource from './base-resource';

/* Types */
import type {
  ArgumentGroup,
  Auth,
  BoardField,
  CardField,
  MemberField,
  OrganizationField,
} from '../types';

export type ModelType =
  'actions'
  | 'boards'
  | 'cards'
  | 'members'
  | 'organizations';

export default class Search extends BaseResource {
  constructor(auth: Auth) {
    super(auth, 'search');
  }

  performSearch(
    queryArgs: {
      query: string,
      idBoards?: 'mine' | Array<string>,
      idOrganizations?: Array<string>,
      idCards?: Array<string>,
      modelTypes?: ArgumentGroup<ModelType>,
      boardFields?: ArgumentGroup<BoardField>,
      boardsLimit?: number,
      cardFields?: ArgumentGroup<CardField>,
      cardsLimit?: number,
      cardsPage?: number,
      cardBoard?: boolean,
      cardList?: boolean,
      cardMembers?: boolean,
      cardStickers?: boolean,
      cardAttachments?: boolean | 'cover',
      organizationFields?: ArgumentGroup<OrganizationField>,
      organizationsLimit?: number,
      memberFields?: ArgumentGroup<MemberField>,
      membersLimit?: number,
      partial?: boolean,
    },
  ): Promise<*> {
    return this.httpGet('/', queryArgs);
  }

  searchMembers(
    queryArgs: {
      query: string,
      limit?: number,
      idBoard?: ?string,
      idOrganization?: ?string,
      onlyOrgMembers?: boolean,
    },
  ): Promise<*> {
    return this.httpGet('/members', queryArgs);
  }
}
