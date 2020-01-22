// @flow
import { generateTypeMap } from '../utils/type-mapper';
import BaseResource from './BaseResource';
import type {
  ArgumentGroup,
  AttachmentFilter,
  BoardField,
  CardField,
  MemberField,
  OrganizationField,
} from '../typeDefs';

export const modelTypeMap = generateTypeMap(
  'actions',
  'boards',
  'cards',
  'members',
  'organizations',
);
export type ModelType = $Keys<typeof modelTypeMap>;

/**
 * @namespace Search
 */
export default class Search extends BaseResource {
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
      cardAttachments?: AttachmentFilter,
      organizationFields?: ArgumentGroup<OrganizationField>,
      organizationsLimit?: number,
      memberFields?: ArgumentGroup<MemberField>,
      membersLimit?: number,
      partial?: boolean,
    },
  ): Promise<any> {
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
  ): Promise<any> {
    return this.httpGet('/members', queryArgs);
  }
}
