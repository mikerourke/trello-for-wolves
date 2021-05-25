import {
  AllOrFieldOrListOf,
  AttachmentFilter,
  BoardField,
  CardField,
  MemberField,
  ModelType,
  OrganizationField,
  TypedFetch,
} from "../typeDefs";

import { BaseResource } from "./BaseResource";

/**
 * The Search API allows you to perform the same search that is available within
 * Trello at the top of the window. This means that you can use modifiers such
 * as edited:day within the query to modify the results you get back.
 *
 * Search operators help you find specific cards and create highly tailored
 * lists. You can add “-” to any operator to do a negative search, such
 * as -has:members to search for cards without any members assigned.
 * @see https://developers.trello.com/reference#search
 * @class
 */
export class Search extends BaseResource {
  /**
   * Performs a search using the required `query` param. All other params are
   * optional. See the {@link https://developers.trello.com/reference#search|Search documentation}
   * for how to write queries.
   * @param params Object containing params for performing the search.
   * @param params.query The search query with a length of 1 to 16384 characters.
   * @param [params.boardFields] Board fields to include in the response.
   * @param [params.boardsLimit] The maximum number of boards returned. Maximum: 1000.
   * @param [params.cardAttachments] Whether to include attachment objects with card results. A boolean
   *                                 value (true or false) or cover for only card cover attachments.
   * @param [params.cardBoard] Whether to include the parent board with card results.
   * @param [params.cardFields] Card fields to include in the response.
   * @param [params.cardList] Whether to include the parent list with card results.
   * @param [params.cardMembers] Whether to include member objects with card results.
   * @param [params.cardsLimit] The maximum number of cards to return. Maximum: 1000
   * @param [params.cardsPage] The page of results for cards. Maximum: 100
   * @param [params.cardStickers] Whether to include sticker objects with card results.
   * @param [params.idBoards] "mine" or a comma-separated list of board ids.
   * @param [params.idCards] A comma-separated list of card ids.
   * @param [params.idOrganizations] A comma-separated list of team ids.
   * @param [params.memberFields] Member fields to include in the response.
   * @param [params.membersLimit] The maximum number of members to return. Maximum 1000
   * @param [params.modelTypes] What type or types of Trello objects you want to search.
   * @param [params.organizationFields] Organization fields to include in the response.
   * @param [params.organizationsLimit] The maximum number of teams to return. Maximum 1000
   * @param [params.partial] By default, Trello searches for each word in your query against exactly matching words
   *                         within Member content. Specifying partial to be true means that we will look for content
   *                         that starts with any of the words in your query. If you are looking for a Card titled
   *                         "My Development Status Report", by default you would need to search for "Development".
   *                         If you have partial enabled, you will be able to search for "dev" but not "velopment".
   */
  public performSearch(params: {
    query: string;
    boardFields?: AllOrFieldOrListOf<BoardField>;
    boardsLimit?: number;
    cardAttachments?: AttachmentFilter;
    cardBoard?: boolean;
    cardFields?: AllOrFieldOrListOf<CardField>;
    cardList?: boolean;
    cardMembers?: boolean;
    cardsLimit?: number;
    cardsPage?: number;
    cardStickers?: boolean;
    idBoards?: "mine" | string[];
    idCards?: string[];
    idOrganizations?: string[];
    memberFields?: AllOrFieldOrListOf<MemberField>;
    membersLimit?: number;
    modelTypes?: AllOrFieldOrListOf<ModelType>;
    organizationFields?: AllOrFieldOrListOf<OrganizationField>;
    organizationsLimit?: number;
    partial?: boolean;
  }): TypedFetch<unknown> {
    return this.apiGet("/", params);
  }

  /**
   * Search for Trello members using the required `query` param. All other
   * params are optional.
   * @param params
   * @param params.query The search query with a length of 1 to 16384 characters.
   * @param [params.limit] The maximum number of results to return. Maximum of 20.
   * @param [params.idBoard] ID of the board for the associated members.
   * @param [params.idOrganization] ID of the organization for the associated members.
   * @param [params.onlyOrgMembers] Only return members in the organization.
   */
  public searchMembers(params: {
    query: string;
    limit?: number;
    idBoard?: string | null;
    idOrganization?: string | null;
    onlyOrgMembers?: boolean;
  }): TypedFetch<unknown> {
    return this.apiGet("/members", params);
  }
}
