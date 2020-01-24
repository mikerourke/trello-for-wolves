import { BaseResource } from "./BaseResource";
import { Action, ActionField, ActionType } from "./Action";
import { AttachmentField, AttachmentFilter } from "./Attachment";
import { Board, BoardField, BoardFilter } from "./Board";
import { BoardBackground, BoardBackgroundFilter } from "./BoardBackground";
import { BoardStar } from "./BoardStar";
import { Card, CardField, CardFilter } from "./Card";
import { CustomEmoji } from "./CustomEmoji";
import { ListFilter } from "./List";
import { MemberPref } from "./MemberPref";
import { MembershipFilter } from "./Membership";
import {
  Notification,
  NotificationField,
  NotificationFilter,
} from "./Notification";
import {
  Organization,
  OrganizationField,
  OrganizationFilter,
} from "./Organization";
import { SavedSearch } from "./SavedSearch";
import { Sticker } from "./Sticker";
import { Token } from "./Token";
import {
  AllOfOrListOf,
  AllOrNone,
  FilterDate,
  Format,
  TypedFetch,
} from "../typeDefs";

export interface MemberCreatorRecord {
  id: string;
  activityBlocked: boolean;
  avatarHash: string;
  avatarUrl: string;
  fullName: string;
  idMemberReferrer: boolean;
  initials: string;
  nonPublic: unknown;
  nonPublicAvailable: boolean;
  username: string;
}

export type AvatarSourceField = "gravatar" | "none" | "upload";

export type MemberBasicField =
  | "avatarHash"
  | "fullName"
  | "initials"
  | "username";

type SingleMemberField =
  | "bio"
  | "bioData"
  | "confirmed"
  | "idPremOrgsAdmin"
  | "memberType"
  | "products"
  | "status"
  | "url";

export type MemberField = MemberBasicField & SingleMemberField;

export type MemberOtherField =
  | "avatarSource"
  | "email"
  | "gravatarHash"
  | "idBoards"
  | "idBoardsPinned"
  | "idOrganizations"
  | "loginTypes"
  | "oneTimeMessageDismissed"
  | "prefs"
  | "premiumFeatures"
  | "trophies"
  | "uploadedAvatarHash";

export type MemberEveryField = MemberField & MemberOtherField;

export type MemberFilter = "admins" | "all" | "none" | "normal" | "owners";

export type MemberType = "admin" | "normal";

export class Member extends BaseResource {
  public getMembers(params?: {
    fields?: AllOfOrListOf<MemberEveryField>;
    limit?: number;
  }): TypedFetch<unknown> {
    return this.apiGet("/", params);
  }

  public getMember(params?: {
    actionBefore?: Date | null;
    actionFields?: AllOfOrListOf<ActionField>;
    actions?: AllOfOrListOf<ActionType>;
    actionsDisplay?: boolean;
    actionsEntities?: boolean;
    actionsLimit?: number;
    actionsSince?: FilterDate;
    boardActionFields?: AllOfOrListOf<ActionField>;
    boardActions?: AllOfOrListOf<ActionType>;
    boardActionsDisplay?: boolean;
    boardActionsEntities?: boolean;
    boardActionsFormat?: Format;
    boardActionsLimit?: number;
    boardActionsSince?: FilterDate;
    boardBackgrounds?: AllOfOrListOf<BoardBackgroundFilter>;
    boardFields?: AllOfOrListOf<BoardField>;
    boardLists?: AllOfOrListOf<ListFilter>;
    boardMemberships?: AllOfOrListOf<MembershipFilter>;
    boardOrganization?: boolean;
    boardOrganizationFields?: AllOfOrListOf<OrganizationField>;
    boards?: AllOfOrListOf<BoardFilter>;
    boardsInvited?: AllOfOrListOf<BoardFilter>;
    boardsInvitedFields?: AllOfOrListOf<BoardField>;
    boardStars?: boolean;
    cardAttachmentFields?: AllOfOrListOf<AttachmentField>;
    cardAttachments?: AttachmentFilter;
    cardFields?: AllOfOrListOf<CardField>;
    cardMemberFields?: AllOfOrListOf<MemberField>;
    cardMembers?: boolean;
    cards?: CardFilter;
    cardStickers?: boolean;
    customBoardBackgrounds?: AllOrNone;
    customEmoji?: AllOrNone;
    customStickers?: AllOrNone;
    fields?: AllOfOrListOf<MemberEveryField>;
    notificationBefore?: string | null;
    notificationFields?: AllOfOrListOf<NotificationField>;
    notificationMemberCreator?: boolean;
    notificationMemberCreatorFields?: AllOfOrListOf<MemberField>;
    notifications?: AllOfOrListOf<NotificationFilter>;
    notificationsDisplay?: boolean;
    notificationsEntities?: boolean;
    notificationSince?: string | null;
    notificationsLimit?: number;
    organizationFields?: AllOfOrListOf<OrganizationField>;
    organizationPaidAccount?: boolean;
    organizations?: AllOfOrListOf<OrganizationFilter>;
    organizationsInvited?: OrganizationFilter;
    organizationsInvitedFields?: AllOfOrListOf<OrganizationField>;
    paidAccount?: boolean;
    savedSearches?: boolean;
    tokens?: AllOrNone;
  }): TypedFetch<unknown> {
    return this.apiGet("/", params);
  }

  public getMembersFilteredBy(filter: MemberFilter): TypedFetch<unknown> {
    return this.apiGet("/", { filter });
  }

  public getFieldValue(field: MemberEveryField): TypedFetch<unknown> {
    return this.apiGet(`/${field}`);
  }

  public getDeltas(params: {
    ixLastUpdate: number;
    tags: string;
  }): TypedFetch<unknown> {
    return this.apiGet("/deltas", params);
  }

  /**
   * Adds a member to an Organization.
   * @example PUT /1/organizations/:organizationId/members
   * @see https://developers.trello.com/advanced-reference/organization#put-1-organizations-idorg-or-name-members
   */
  public addMember(params: {
    email: string;
    fullName: string;
    type?: MemberType;
  }): TypedFetch<unknown> {
    return this.apiPut("/", params);
  }

  public uploadAvatar(file: any): TypedFetch<unknown> {
    return this.apiPost("/avatar", { file });
  }

  public updateMember(params?: {
    avatarSource?: AvatarSourceField;
    bio?: string;
    fullName?: string;
    initials?: string;
    prefs?: {
      colorBlind?: boolean;
      locale?: string;
      minutesBetweenSummaries?: number;
    };
    username?: string;
  }): TypedFetch<unknown> {
    return this.apiPut("/", { ...params, separator: "/" });
  }

  public updateAvatarSource(value: AvatarSourceField): TypedFetch<unknown> {
    return this.apiPut("/avatarSource", { value });
  }

  public updateBio(value: string): TypedFetch<unknown> {
    return this.apiPut("/bio", { value });
  }

  public updateFullName(value: string): TypedFetch<unknown> {
    return this.apiPut("/fullName", { value });
  }

  public updateInitials(value: string): TypedFetch<unknown> {
    return this.apiPut("/initials", { value });
  }

  public updateUsername(value: string): TypedFetch<unknown> {
    return this.apiPut("/username", { value });
  }

  /**
   * Updates the deactivated status for a member associated with an Organization.
   * @example PUT /1/organizations/:organizationId/members/:memberId
   * @see https://developers.trello.com/advanced-reference/organization#put-1-organizations-idorg-or-name-members-idmember-deactivated
   */
  public updateDeactivatedStatus(value: boolean): TypedFetch<unknown> {
    return this.apiPut("/deactivated", { value });
  }

  /**
   * Updates the member type for a member associated with a Board or Organization.
   * @example PUT /1/boards/:boardId/members/:memberId
   * @see https://developers.trello.com/advanced-reference/board#put-1-boards-board-id-members-idmember
   *
   * @example PUT /1/organizations/:organizationId/members/:memberId
   * @see https://developers.trello.com/advanced-reference/organization#put-1-organizations-idorg-or-name-members-idmember
   */
  public updateMemberType(type: MemberType): TypedFetch<unknown> {
    return this.apiPut("/", { type });
  }

  public dismissOneTimeMessages(value: string): TypedFetch<unknown> {
    return this.apiPost("/oneTimeMessagesDismissed", { value });
  }

  /**
   * Deletes a member created for a Board.
   * @example DELETE /1/boards/:boardId/members/:memberId
   * @see https://developers.trello.com/advanced-reference/board#delete-1-boards-board-id-members-idmember
   */
  public deleteMember(): TypedFetch<unknown> {
    return this.apiDelete("/");
  }

  /**
   * Removes a member's association with an Organization, doesn't actually delete it.
   * @example DELETE /1/organizations/:organizationId/members/:memberId
   * @see https://developers.trello.com/advanced-reference/organization#delete-1-organizations-idorg-or-name-members-idmember
   */
  public dissociateMember(): TypedFetch<unknown> {
    return this.apiDelete("/");
  }

  /**
   * This will remove a member from your Organization AND remove the member from
   * all Boards associated with an Organization.
   * @example DELETE /1/organizations/:organizationId/members/:memberId/all
   * @see https://developers.trello.com/advanced-reference/organization#delete-1-organizations-idorg-or-name-members-idmember-all
   */
  public dissociateMemberFromAll(): TypedFetch<unknown> {
    return this.apiDelete("/all");
  }

  public actions(): Action {
    return new Action(this.config, `${this.baseEndpoint}/actions`);
  }

  public boardBackgrounds(backgroundId: string = ""): BoardBackground {
    return new BoardBackground(
      this.config,
      `${this.baseEndpoint}/boardBackgrounds/${backgroundId}`,
    );
  }

  public boardStars(boardStarId: string = ""): BoardStar {
    return new BoardStar(
      this.config,
      `${this.baseEndpoint}/boardStars/${boardStarId}`,
    );
  }

  public boards(): Board {
    return new Board(this.config, `${this.baseEndpoint}/boards`);
  }

  public boardsInvited(): Board {
    return new Board(this.config, `${this.baseEndpoint}/boardsInvited`);
  }

  public cards(): Card {
    return new Card(this.config, `${this.baseEndpoint}/cards`);
  }

  public customBoardBackgrounds(backgroundId: string = ""): BoardBackground {
    return new BoardBackground(
      this.config,
      `${this.baseEndpoint}/customBoardBackgrounds/${backgroundId}`,
    );
  }

  public customEmoji(customEmojiId: string = ""): CustomEmoji {
    return new CustomEmoji(
      this.config,
      `${this.baseEndpoint}/customEmoji/${customEmojiId}`,
    );
  }

  public customStickers(customStickerId: string = ""): Sticker {
    return new Sticker(
      this.config,
      `${this.baseEndpoint}/customStickers/${customStickerId}`,
    );
  }

  public notifications(): Notification {
    return new Notification(this.config, `${this.baseEndpoint}/notifications`);
  }

  public organizations(): Organization {
    return new Organization(this.config, `${this.baseEndpoint}/organizations`);
  }

  public organizationsInvited(): Organization {
    return new Organization(
      this.config,
      `${this.baseEndpoint}/organizationsInvited`,
    );
  }

  public prefs(): MemberPref {
    return new MemberPref(this.config, `${this.baseEndpoint}/prefs`);
  }

  public savedSearches(savedSearchId: string = ""): SavedSearch {
    return new SavedSearch(
      this.config,
      `${this.baseEndpoint}/savedSearches/${savedSearchId}`,
    );
  }

  public tokens(): Token {
    return new Token(this.config, `${this.baseEndpoint}/tokens`);
  }
}
