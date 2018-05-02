import BaseResource from './baseResource';
import { AttachmentFilter } from './attachment';
import { BoardField } from './board';
import { CardField } from './card';
import { MemberField } from './member';
import { OrganizationField } from './organization';
import { ArgumentGroup } from '../types';

export type ModelType =
  | 'actions'
  | 'boards'
  | 'cards'
  | 'members'
  | 'organizations';

/**
 * @namespace Search
 */
export default class Search extends BaseResource {
  public performSearch = (queryArgs: {
    query: string;
    idBoards?: 'mine' | Array<string>;
    idOrganizations?: Array<string>;
    idCards?: Array<string>;
    modelTypes?: ArgumentGroup<ModelType>;
    boardFields?: ArgumentGroup<BoardField>;
    boardsLimit?: number;
    cardFields?: ArgumentGroup<CardField>;
    cardsLimit?: number;
    cardsPage?: number;
    cardBoard?: boolean;
    cardList?: boolean;
    cardMembers?: boolean;
    cardStickers?: boolean;
    cardAttachments?: AttachmentFilter;
    organizationFields?: ArgumentGroup<OrganizationField>;
    organizationsLimit?: number;
    memberFields?: ArgumentGroup<MemberField>;
    membersLimit?: number;
    partial?: boolean;
  }): Promise<any> => this.httpGet('/', queryArgs);

  public searchMembers = (queryArgs: {
    query: string;
    limit?: number;
    idBoard?: string | null;
    idOrganization?: string | null;
    onlyOrgMembers?: boolean;
  }): Promise<any> => this.httpGet('/members', queryArgs);
}
