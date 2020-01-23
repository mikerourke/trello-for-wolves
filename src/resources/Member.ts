import { BaseResource } from "./BaseResource";
import { Action, ActionField, ActionFilter } from "./Action";
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
import { AllOrNone, ArgumentGroup, FilterDate, Format } from "../typeDefs";

export type AvatarSourceField = "gravatar" | "none" | "upload";

export type MemberEnterpriseOnlyField =
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

export type MemberField = MemberEnterpriseOnlyField & SingleMemberField;

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
    fields?: ArgumentGroup<MemberEveryField>;
    limit?: number;
  }): Promise<unknown> {
    return this.apiGet("/", params);
  }

  public getMember(params?: {
    actionBefore?: Date | null;
    actionFields?: ArgumentGroup<ActionField>;
    actions?: ArgumentGroup<ActionFilter>;
    actionsDisplay?: boolean;
    actionsEntities?: boolean;
    actionsLimit?: number;
    actionsSince?: FilterDate;
    boardActionFields?: ArgumentGroup<ActionField>;
    boardActions?: ArgumentGroup<ActionFilter>;
    boardActionsDisplay?: boolean;
    boardActionsEntities?: boolean;
    boardActionsFormat?: Format;
    boardActionsLimit?: number;
    boardActionsSince?: FilterDate;
    boardBackgrounds?: ArgumentGroup<BoardBackgroundFilter>;
    boardFields?: ArgumentGroup<BoardField>;
    boardLists?: ArgumentGroup<ListFilter>;
    boardMemberships?: ArgumentGroup<MembershipFilter>;
    boardOrganization?: boolean;
    boardOrganizationFields?: ArgumentGroup<OrganizationField>;
    boards?: ArgumentGroup<BoardFilter>;
    boardsInvited?: ArgumentGroup<BoardFilter>;
    boardsInvitedFields?: ArgumentGroup<BoardField>;
    boardStars?: boolean;
    cardAttachmentFields?: ArgumentGroup<AttachmentField>;
    cardAttachments?: AttachmentFilter;
    cardFields?: ArgumentGroup<CardField>;
    cardMemberFields?: ArgumentGroup<MemberField>;
    cardMembers?: boolean;
    cards?: CardFilter;
    cardStickers?: boolean;
    customBoardBackgrounds?: AllOrNone;
    customEmoji?: AllOrNone;
    customStickers?: AllOrNone;
    fields?: ArgumentGroup<MemberEveryField>;
    notificationBefore?: string | null;
    notificationFields?: ArgumentGroup<NotificationField>;
    notificationMemberCreator?: boolean;
    notificationMemberCreatorFields?: ArgumentGroup<MemberField>;
    notifications?: ArgumentGroup<NotificationFilter>;
    notificationsDisplay?: boolean;
    notificationsEntities?: boolean;
    notificationSince?: string | null;
    notificationsLimit?: number;
    organizationFields?: ArgumentGroup<OrganizationField>;
    organizationPaidAccount?: boolean;
    organizations?: ArgumentGroup<OrganizationFilter>;
    organizationsInvited?: OrganizationFilter;
    organizationsInvitedFields?: ArgumentGroup<OrganizationField>;
    paidAccount?: boolean;
    savedSearches?: boolean;
    tokens?: AllOrNone;
  }): Promise<unknown> {
    return this.apiGet("/", params);
  }

  public getMembersFilteredBy(filter: MemberFilter): Promise<unknown> {
    return this.apiGet("/", { filter });
  }

  public getFieldValue(field: MemberEveryField): Promise<unknown> {
    return this.apiGet(`/${field}`);
  }

  public getDeltas(params: {
    ixLastUpdate: number;
    tags: string;
  }): Promise<unknown> {
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
  }): Promise<unknown> {
    return this.apiPut("/", params);
  }

  public uploadAvatar(file: any): Promise<unknown> {
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
  }): Promise<unknown> {
    return this.apiPut("/", { ...params, separator: "/" });
  }

  public updateAvatarSource(value: AvatarSourceField): Promise<unknown> {
    return this.apiPut("/avatarSource", { value });
  }

  public updateBio(value: string): Promise<unknown> {
    return this.apiPut("/bio", { value });
  }

  public updateFullName(value: string): Promise<unknown> {
    return this.apiPut("/fullName", { value });
  }

  public updateInitials(value: string): Promise<unknown> {
    return this.apiPut("/initials", { value });
  }

  public updateUsername(value: string): Promise<unknown> {
    return this.apiPut("/username", { value });
  }

  /**
   * Updates the deactivated status for a member associated with an Organization.
   * @example PUT /1/organizations/:organizationId/members/:memberId
   * @see https://developers.trello.com/advanced-reference/organization#put-1-organizations-idorg-or-name-members-idmember-deactivated
   */
  public updateDeactivatedStatus(value: boolean): Promise<unknown> {
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
  public updateMemberType(type: MemberType): Promise<unknown> {
    return this.apiPut("/", { type });
  }

  public dismissOneTimeMessages(value: string): Promise<unknown> {
    return this.apiPost("/oneTimeMessagesDismissed", { value });
  }

  /**
   * Deletes a member created for a Board.
   * @example DELETE /1/boards/:boardId/members/:memberId
   * @see https://developers.trello.com/advanced-reference/board#delete-1-boards-board-id-members-idmember
   */
  public deleteMember(): Promise<unknown> {
    return this.apiDelete("/");
  }

  /**
   * Removes a member's association with an Organization, doesn't actually delete it.
   * @example DELETE /1/organizations/:organizationId/members/:memberId
   * @see https://developers.trello.com/advanced-reference/organization#delete-1-organizations-idorg-or-name-members-idmember
   */
  public dissociateMember(): Promise<unknown> {
    return this.apiDelete("/");
  }

  /**
   * This will remove a member from your Organization AND remove the member from
   * all Boards associated with an Organization.
   * @example DELETE /1/organizations/:organizationId/members/:memberId/all
   * @see https://developers.trello.com/advanced-reference/organization#delete-1-organizations-idorg-or-name-members-idmember-all
   */
  public dissociateMemberFromAll(): Promise<unknown> {
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
