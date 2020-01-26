import { BaseResource } from "./BaseResource";
import { Action, ActionType } from "./Action";
import { Board, BoardField, BoardFilter } from "./Board";
import { BoardBackground, BoardBackgroundFilter } from "./BoardBackground";
import { BoardStar } from "./BoardStar";
import { Card, CardFilter } from "./Card";
import { CustomEmoji } from "./CustomEmoji";
import { Notification, NotificationType } from "./Notification";
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
  FileUpload,
  Limits,
  TypedFetch,
  ValueResponse,
} from "../typeDefs";
import { SortOrder } from "./Enterprise";

export type AvatarSourceField = "gravatar" | "none" | "upload";

export type MemberType = "admin" | "normal";

export type MemberLoginType = "password" | "saml" | "google" | "android";

export type MemberFilter = "admins" | "all" | "none" | "normal" | "owners";

export enum MemberProduct {
  BusinessClass = 10,
  GoldMonthly = 37,
  GoldAnnual = 38,
}

export interface MemberPrefsRecord {
  sendSummaries: boolean;
  minutesBetweenSummaries: number;
  minutesBeforeDeadlineToNotify: number;
  colorBlind: boolean;
  locale: string;
  timezoneInfo: {
    timezoneNext: string;
    dateNext: string;
    offsetNext: number;
    timezoneCurrent: string;
    offsetCurrent: number;
  };
  twoFactor: {
    enabled: boolean;
    needsNewBackups: false;
  };
  privacy: {
    fullName: string;
    avatar: string;
  };
}

export interface MessageDismissedRecord {
  _id: string;
  name: string;
  count: number;
  lastDismissed: string;
}

export interface NestedMemberRecord {
  /** The ID of the member. */
  id: string;
  /** Member profile image. */
  avatarHash: string | null;
  /**
   * The URL of the current avatar being used, regardless of whether it is a
   * gravatar or uploaded avatar.
   */
  avatarUrl: string;
  /** The member's initials, used for display when there isn't an avatar set. */
  initials: string;
  /** The full display name for the member. */
  fullName: string;
  /** The username for the member. What is shown in @mentions for example. */
  username: string;
  /** Whether the member has confirmed their email address after signing up. */
  confirmed: boolean;
  /**
   * Type of member ("ghost" has been invited to join but has not created a
   * Trello account.
   */
  memberType: "normal" | "ghost";
}

export interface MemberInvitedRecord extends NestedMemberRecord {
  /** Optional bio for the member. */
  bio: string;
  /**
   * If the bio includes custom emoji, this object will contain the information
   * necessary to display them.
   */
  bioData: { emoji: unknown } | null;
  /** An array of organization IDs this member is an admin of. */
  idPremOrgsAdmin: string[];
  /**
   * Array of numbers that represent premium features.
   * 10: member has Trello Gold as a result of being in a Business Class team
   * 37: member has monthly Trello Gold
   * 38: member has annual Trello Gold
   */
  products: number[] | MemberProduct[];
  /** @deprecated */
  status: string;
  /** The URL to the member's profile page. */
  url: string;
  idEnterprisesDeactivated?: string[];
}

export interface MemberCreatorRecord extends MemberInvitedRecord {
  activityBlocked: boolean;
  nonPublic: unknown;
  nonPublicAvailable: boolean;
  aaEmail: string | null;
  aaEnrolledDate: string | null;
  aaId: string | null;
  idMemberReferrer: string | null;
  isAaMastered: boolean;
  ixUpdate: string;
  limits: Limits;
  messagesDismissed?: MessageDismissedRecord[];
  marketingOptIn?: { optedIn: boolean; date: string };
  idEnterprise?: string | null;
}

export interface MemberRecord extends MemberCreatorRecord {
  /** The source of the user's avatar - either via "upload" or "gravatar". */
  avatarSource: Omit<AvatarSourceField, "none"> | null;
  /** The primary email address for the member. You can only read your own. */
  email: string | null;
  /** Same as avatarHash. */
  gravatarHash: string | null;
  /** An array of board IDs this member is on. */
  idBoards: string[];
  /**
   * An array of pinned board IDs.
   * @deprecated
   */
  idBoardsPinned: string[];
  /** An array of organization IDs this member is in. */
  idOrganizations: string[];
  /** An array of enterprise IDs this member is an admin of. */
  idEnterprisesAdmin: string[];
  /** The types of logins a user can use. */
  loginTypes: MemberLoginType[];
  oneTimeMessagesDismissed: string[];
  prefs: MemberPrefsRecord;
  premiumFeatures: unknown[];
  /** @deprecated */
  trophies: unknown[];
  /** Same as avatar hash. */
  uploadedAvatarHash: unknown | null;
  /** The URL of the uploaded avatar if one has been uploaded. */
  uploadedAvatarUrl: string;
}

export type NestedMemberField = keyof NestedMemberRecord;

export type MemberInvitedField = keyof MemberInvitedRecord;

export type MemberField = keyof MemberRecord;

export interface GetMembersViaQueryParams {
  members?: MemberFilter;
  memberFields?: AllOfOrListOf<MemberField>;
}

export interface GetMembersViaUrlParams {
  fields: AllOfOrListOf<MemberInvitedRecord>;
}

export interface GetMembersForEnterpriseParams extends GetMembersViaUrlParams {
  /**
   * Pass a SCIM-style query to filter members. This takes precedence over the
   * all/normal/admins value of members. If any of the below member_* args are
   * set, the member array will be paginated.
   */
  filter?: string | "none";
  /**
   * This parameter expects a SCIM-style sorting value prefixed by a - to sort
   * descending. If no - is prefixed, it will be sorted ascending. Note that
   * the members array returned will be paginated if members is "normal" or
   * "admins". Pagination can be controlled with member_startIndex, etc, but
   * the API response will not contain the total available result count or
   * pagination status data.
   */
  sort?: string;
  /**
   * This parameter expects a SCIM-style sorting value. Note that the members
   * array returned will be paginated if members is "normal" or "admins".
   * Pagination can be controlled with member_startIndex, etc, but the API
   * response will not contain the total available result count or pagination
   * status data.
   * @deprecated Use the "sort" param instead.
   */
  sortBy: string;
  /** @deprecated Use the "sort" param instead. */
  sortOrder: SortOrder;
  /** Any integer between 0 and 9999. */
  startIndex?: number;
  /** SCIM-style filter. */
  count?: string | "none";
  organizationFields?: AllOfOrListOf<OrganizationField>;
  boardFields?: AllOfOrListOf<BoardField>;
}

export type GetMembersReturnType<
  TParams,
  TPayload
> = TParams extends GetMembersViaUrlParams
  ? MemberRecord[]
  : TParams extends GetMembersForEnterpriseParams
  ? MemberRecord[]
  : TPayload & { members: MemberRecord[] };

export type AnyGetMembersParams =
  | GetMembersViaQueryParams
  | GetMembersViaUrlParams
  | GetMembersForEnterpriseParams;

export interface UpdateMemberParams {
  avatarSource?: AvatarSourceField;
  bio?: string;
  /** New name for the member. Cannot begin or end with a space. */
  fullName?: string;
  /** New initials for the member. 1-4 characters long. */
  initials?: string;
  prefs?: {
    colorBlind?: boolean;
    locale?: string;
    /** -1 for disabled, 1, or 60. */
    minutesBetweenSummaries?: number;
  };
  /**
   * New username for the member. At least 3 characters long, only lowercase
   * letters, underscores, and numbers. Must be unique.
   */
  username?: string;
}

export class Member extends BaseResource {
  public getMember(params?: {
    actions?: AllOfOrListOf<ActionType>;
    boards?: AllOfOrListOf<BoardFilter>;
    boardFields?: AllOfOrListOf<BoardField>;
    boardBackgrounds?: AllOfOrListOf<BoardBackgroundFilter>;
    boardsInvited?: AllOfOrListOf<BoardFilter>;
    boardsInvitedFields?: AllOfOrListOf<BoardField>;
    boardStars?: boolean;
    cards?: CardFilter;
    customBoardBackgrounds?: AllOrNone;
    customEmoji?: AllOrNone;
    customStickers?: AllOrNone;
    fields?: AllOfOrListOf<MemberField>;
    notifications?: AllOfOrListOf<NotificationType>;
    organizations?: AllOfOrListOf<OrganizationFilter>;
    organizationFields?: AllOfOrListOf<OrganizationField>;
    organizationPaidAccount?: boolean;
    organizationsInvited?: OrganizationFilter;
    organizationsInvitedFields?: AllOfOrListOf<OrganizationField>;
    paidAccount?: boolean;
    savedSearches?: boolean;
    tokens?: AllOrNone;
  }): TypedFetch<MemberRecord> {
    return this.apiGet("/", params);
  }

  public getMembers<
    TPayload extends object,
    TParams extends AnyGetMembersParams = {}
  >(params?: TParams): TypedFetch<GetMembersReturnType<TParams, TPayload>> {
    return this.apiGet("/", params);
  }

  public getMembersFilteredBy(
    filter: MemberFilter,
  ): TypedFetch<MemberRecord[]> {
    return this.apiGet("/", { filter });
  }

  public getFieldValue<T>(field: MemberField): TypedFetch<ValueResponse<T>> {
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
  }): TypedFetch<MemberRecord> {
    return this.apiPut("/", params);
  }

  public uploadAvatar(file: FileUpload): TypedFetch<unknown> {
    return this.apiPost("/avatar", { file });
  }

  public updateMember(params?: UpdateMemberParams): TypedFetch<MemberRecord> {
    const body = {} as { fullName?: string };

    if (/board/gi.test(this.endpointElements[0])) {
      body.fullName = params?.fullName;
      delete params?.fullName;
    }

    return this.apiPut("/", { ...params, separator: "/" }, body);
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

  public updateColorBlind(value: boolean): TypedFetch<unknown> {
    return this.apiPut("/prefs/colorBlind", { value });
  }

  public updateLocale(value: string): TypedFetch<unknown> {
    return this.apiPut("/prefs/locale", { value });
  }

  public updateMinutesBetweenSummaries(value: number): TypedFetch<unknown> {
    return this.apiPut("/prefs/minutesBetweenSummaries", { value });
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
