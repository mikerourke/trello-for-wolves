import { BaseResource } from "./BaseResource";
import { AttachmentFilter } from "./Attachment";
import { BoardField } from "./Board";
import { CardField } from "./Card";
import { MemberField } from "./Member";
import { OrganizationField } from "./Organization";
import { AllOfOrListOf, TypedFetch } from "../typeDefs";

export type ModelType =
  | "actions"
  | "boards"
  | "cards"
  | "members"
  | "organizations";

export type PerformSearchParams = {
  /** The search query with a length of 1 to 16384 characters. */
  query: string;
  boardFields?: AllOfOrListOf<BoardField>;
  /** The maximum number of boards returned. Maximum: 1000 */
  boardsLimit?: number;
  /**
   * Whether to include attachment objects with card results. A boolean
   * value (true or false) or cover for only card cover attachments.
   */
  cardAttachments?: AttachmentFilter;
  /** Whether to include the parent board with card results. */
  cardBoard?: boolean;
  cardFields?: AllOfOrListOf<CardField>;
  /** Whether to include the parent list with card results. */
  cardList?: boolean;
  /** Whether to include member objects with card results. */
  cardMembers?: boolean;
  /** The maximum number of cards to return. Maximum: 1000 */
  cardsLimit?: number;
  /** The page of results for cards. Maximum: 100 */
  cardsPage?: number;
  /** Whether to include sticker objects with card results. */
  cardStickers?: boolean;
  /** "mine" or a comma-separated list of board ids. */
  idBoards?: "mine" | string[];
  /** A comma-separated list of card ids. */
  idCards?: string[];
  /** A comma-separated list of team ids. */
  idOrganizations?: string[];
  memberFields?: AllOfOrListOf<MemberField>;
  /** The maximum number of members to return. Maximum 1000 */
  membersLimit?: number;
  /**
   * What type or types of Trello objects you want to search. all or a
   * comma-separated list of: actions, boards, cards, members, organizations.
   */
  modelTypes?: AllOfOrListOf<ModelType>;
  organizationFields?: AllOfOrListOf<OrganizationField>;
  /** The maximum number of teams to return. Maximum 1000 */
  organizationsLimit?: number;
  /**
   * By default, Trello searches for each word in your query against exactly
   * matching words within Member content. Specifying partial to be true means
   * that we will look for content that starts with any of the words in your
   * query. If you are looking for a Card titled "My Development Status Report",
   * by default you would need to search for "Development". If you have
   * partial enabled, you will be able to search for "dev" but not "velopment".
   */
  partial?: boolean;
};

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
