import { BaseResource } from "./BaseResource";
import { AttachmentFilter } from "./Attachment";
import { BoardField } from "./Board";
import { CardField } from "./Card";
import { MemberInvitedField } from "./Member";
import { OrganizationField } from "./Organization";
import { AllOfOrListOf, TypedFetch } from "../typeDefs";

export type ModelType =
  | "actions"
  | "boards"
  | "cards"
  | "members"
  | "organizations";

/**
 * Params passed when performing search actions. All params except for `query`
 * are optional.
 * @typedef {Object} PerformSearchParams
 * @property query The search query with a length of 1 to 16384 characters.
 * @property boardFields
 * @property boardsLimit The maximum number of boards returned. Maximum: 1000
 * @property cardAttachments Whether to include attachment objects with card results. A boolean
 *                           value (true or false) or cover for only card cover attachments.
 * @property cardBoard Whether to include the parent board with card results.
 * @property cardFields
 * @property cardList Whether to include the parent list with card results.
 * @property cardMembers Whether to include member objects with card results.
 * @property cardsLimit The maximum number of cards to return. Maximum: 1000
 * @property cardsPage The page of results for cards. Maximum: 100
 * @property cardStickers Whether to include sticker objects with card results.
 * @property idBoards "mine" or a comma-separated list of board ids.
 * @property idCards A comma-separated list of card ids.
 * @property idOrganizations A comma-separated list of team ids.
 * @property memberFields
 * @property membersLimit The maximum number of members to return. Maximum 1000
 * @property modelTypes What type or types of Trello objects you want to search.
 * @property organizationFields
 * @property organizationsLimit The maximum number of teams to return. Maximum 1000
 * @property partial By default, Trello searches for each word in your query against exactly matching words
 *                   within Member content. Specifying partial to be true means that we will look for content
 *                   that starts with any of the words in your query. If you are looking for a Card titled
 *                   "My Development Status Report", by default you would need to search for "Development".
 *                   If you have partial enabled, you will be able to search for "dev" but not "velopment".
 */
export interface PerformSearchParams {
  query: string;
  boardFields?: AllOfOrListOf<BoardField>;
  boardsLimit?: number;
  cardAttachments?: AttachmentFilter;
  cardBoard?: boolean;
  cardFields?: AllOfOrListOf<CardField>;
  cardList?: boolean;
  cardMembers?: boolean;
  cardsLimit?: number;
  cardsPage?: number;
  cardStickers?: boolean;
  idBoards?: "mine" | string[];
  idCards?: string[];
  idOrganizations?: string[];
  memberFields?: AllOfOrListOf<MemberInvitedField>;
  membersLimit?: number;
  modelTypes?: AllOfOrListOf<ModelType>;
  organizationFields?: AllOfOrListOf<OrganizationField>;
  organizationsLimit?: number;
  partial?: boolean;
}

export class Search extends BaseResource {
  public performSearch(params: PerformSearchParams): TypedFetch<unknown> {
    return this.apiGet("/", params);
  }

  public searchMembers(params: {
    query: string;
    idBoard?: string | null;
    idOrganization?: string | null;
    limit?: number;
    onlyOrgMembers?: boolean;
  }): TypedFetch<unknown> {
    return this.apiGet("/members", params);
  }
}
