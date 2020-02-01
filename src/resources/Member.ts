import { isEmpty } from "../utils/isEmpty";
import { BaseResource } from "./BaseResource";
import { Action, ActionType } from "./Action";
import { Board, BoardField, BoardFilter, BoardMemberType } from "./Board";
import {
  CustomBoardBackground,
  BoardBackground,
  BoardBackgroundFilter,
} from "./BoardBackgrounds";
import { BoardStar } from "./BoardStar";
import { Card, CardFilter } from "./Card";
import { CustomEmoji } from "./CustomEmoji";
import { Enterprise, SortOrder } from "./Enterprise";
import { Notification, NotificationType } from "./Notification";
import {
  Organization,
  OrganizationField,
  OrganizationFilter,
} from "./Organization";
import { SavedSearch } from "./SavedSearch";
import { CustomSticker } from "./Stickers";
import { Token } from "./Token";
import {
  AllOrFieldOrListOf,
  AllOrNone,
  FileUpload,
  Limits,
  TypedFetch,
  ValueResponse,
} from "../typeDefs";

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

/**
 * @typedef {Object} NestedMemberRecord
 * @property id The ID of the member.
 * @property avatarHash Member profile image.
 * @property avatarUrl The URL of the current avatar being used, regardless of
 *                     whether it is a gravatar or uploaded avatar.
 * @property initials The member's initials, used for display when there isn't an avatar set.
 * @property fullName The full display name for the member.
 * @property username The username for the member. What is shown in @mentions for example.
 * @property confirmed Whether the member has confirmed their email address after signing up.
 * @property memberType Type of member ("ghost" has been invited to join but has not
 *                      created a Trello account.
 */
export interface NestedMemberRecord {
  id: string;
  avatarHash: string | null;
  avatarUrl: string;
  initials: string;
  fullName: string;
  username: string;
  confirmed: boolean;
  memberType: "normal" | "ghost";
}

export type NestedMemberField = keyof NestedMemberRecord;

/**
 * Member data associated with an invited member. It builds upon the properties
 * of the {@link NestedMemberRecord}.
 * @typedef {Object} MemberInvitedRecord
 * @property bio Optional bio for the member.
 * @property bioData If the bio includes custom emoji, this object will contain the
 *                   information necessary to display them.
 * @property idPremOrgsAdmin An array of organization IDs this member is an admin of.
 * @property products Array of numbers that represent premium features.
 *                    10: member has Trello Gold as a result of being in a Business Class team.
 *                    37: member has monthly Trello Gold.
 *                    38: member has annual Trello Gold.
 * @property status Status of the member.
 * @property url The URL to the member's profile page.
 * @property idEnterprisesDeactivated
 */
export interface MemberInvitedRecord extends NestedMemberRecord {
  bio: string;
  bioData: { emoji: unknown } | null;
  idPremOrgsAdmin: string[];
  products: number[] | MemberProduct[];
  status: string;
  url: string;
  idEnterprisesDeactivated?: string[];
}

export type MemberInvitedField = keyof MemberInvitedRecord;

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

/**
 * The data corresponding to a member. The fields that are present in the
 * record are contingent on the `fields`/`memberFields` param passed to
 * the method used to retrieve the member data. This contains the most
 * comprehensive data. It includes all of the fields in {@link NestedMemberRecord}
 * and {@link MemberInvitedRecord}.
 * @typedef {Object} MemberRecord
 * @property avatarSource The source of the user's avatar - either via "upload" or "gravatar".
 * @property email The primary email address for the member. You can only read your own.
 * @property gravatarHash Same as avatarHash.
 * @property idBoards An array of board IDs this member is on.
 * @property idBoardsPinned An array of pinned board IDs.
 * @property idOrganizations An array of organization IDs this member is in.
 * @property idEnterprisesAdmin An array of enterprise IDs this member is an admin of.
 * @property loginTypes The types of logins a user can use.
 * @property oneTimeMessagesDismissed Array of message IDs that were dismissed.
 * @property prefs Preferences associated with the member.
 * @property premiumFeatures Array of premium feature details.
 * @property trophies Array of trophies.
 * @property uploadedAvatarHash Same as avatar hash.
 * @property uploadedAvatarUrl The URL of the uploaded avatar if one has been uploaded.
 */
export interface MemberRecord extends MemberCreatorRecord {
  avatarSource: Omit<AvatarSourceField, "none"> | null;
  email: string | null;
  gravatarHash: string | null;
  idBoards: string[];
  idBoardsPinned: string[];
  idOrganizations: string[];
  idEnterprisesAdmin: string[];
  loginTypes: MemberLoginType[];
  oneTimeMessagesDismissed: string[];
  prefs: MemberPrefsRecord;
  premiumFeatures: unknown[];
  trophies: unknown[];
  uploadedAvatarHash: unknown | null;
  uploadedAvatarUrl: string;
}

export type MemberField = keyof MemberRecord;

/**
 * @typedef {Object} GetMembersForEnterpriseParams
 * @property fields
 * @property filter Pass a SCIM-style query to filter members. This takes precedence over the
 *                  all/normal/admins value of members. If any of the below member_* args are set,
 *                  the member array will be paginated.
 * @property sort This parameter expects a SCIM-style sorting value prefixed by a - to sort
 *                descending. If no - is prefixed, it will be sorted ascending. Note that the
 *                members array returned will be paginated if members is "normal" or "admins".
 *                Pagination can be controlled with member_startIndex, etc, but the API
 *                response will not contain the total available result count or pagination status data.
 * @property sortBy This parameter expects a SCIM-style sorting value. Note that the members array
 *                  returned will be paginated if members is "normal" or "admins". Pagination
 *                  can be controlled with member_startIndex, etc, but the API response will not
 *                  contain the total available result count or pagination status data.
 * @property sortOrder Order to sort records by.
 * @property startIndex Any integer between 0 and 9999.
 * @property count SCIM-style filter.
 * @property organizationFields Organization fields to include in response.
 * @property boardFields Board fields to include in response.
 */
export interface GetMembersForEnterpriseParams {
  fields?: AllOrFieldOrListOf<MemberInvitedRecord>;
  filter?: string | "none";
  sort?: string;
  sortBy?: string;
  sortOrder?: SortOrder;
  startIndex?: number;
  count?: string | "none";
  organizationFields?: AllOrFieldOrListOf<OrganizationField>;
  boardFields?: AllOrFieldOrListOf<BoardField>;
}

/**
 * Everyone with a Trello account is called a member.
 * @se https://developers.trello.com/reference#member
 * @class
 */
export class Member extends BaseResource {
  public getMember(params?: {
    actions?: AllOrFieldOrListOf<ActionType>;
    boards?: BoardFilter;
    boardFields?: AllOrFieldOrListOf<BoardField>;
    boardBackgrounds?: AllOrFieldOrListOf<BoardBackgroundFilter>;
    boardsInvited?: BoardFilter;
    boardsInvitedFields?: AllOrFieldOrListOf<BoardField>;
    boardStars?: boolean;
    cards?: CardFilter;
    customBoardBackgrounds?: AllOrNone;
    customEmoji?: AllOrNone;
    customStickers?: AllOrNone;
    fields?: AllOrFieldOrListOf<MemberField>;
    notifications?: AllOrFieldOrListOf<NotificationType>;
    organizations?: AllOrFieldOrListOf<OrganizationFilter>;
    organizationFields?: AllOrFieldOrListOf<OrganizationField>;
    organizationPaidAccount?: boolean;
    organizationsInvited?: OrganizationFilter;
    organizationsInvitedFields?: AllOrFieldOrListOf<OrganizationField>;
    paidAccount?: boolean;
    savedSearches?: boolean;
    tokens?: AllOrNone;
  }): TypedFetch<MemberRecord> {
    return this.apiGet("/", params);
  }

  public getMembers(
    params?:
      | {
          fields: AllOrFieldOrListOf<MemberField>;
        }
      | GetMembersForEnterpriseParams,
  ): TypedFetch<MemberRecord[]> {
    if (!isEmpty(params) && !params?.fields && !this.isChildOf("enterprise")) {
      throw new Error(
        `Only the "fields" param is allowed when calling getMembers() from a non-enterprise resource`,
      );
    }

    return this.apiGet("/", params);
  }

  public getNestedMembers<TPayload extends object>(params?: {
    members?: MemberFilter;
    memberFields?: AllOrFieldOrListOf<MemberField>;
  }): TypedFetch<TPayload & { members: MemberRecord[] }> {
    return this.apiGetNested(params);
  }

  public getMembersFilteredBy(
    filter: MemberFilter,
  ): TypedFetch<MemberRecord[]> {
    return this.apiGet("/", { filter });
  }

  public getFieldValue<T>(field: MemberField): TypedFetch<ValueResponse<T>> {
    return this.apiGet(`/${field}`);
  }

  public getDeltas(params?: {
    ixLastUpdate?: number;
    tags?: string;
  }): TypedFetch<unknown> {
    return this.apiGet("/deltas", params);
  }

  /**
   * Associates a member with a board, card, or organization.
   * @see https://developers.trello.com/reference#boardsidlabelnamesmembers
   * @see https://developers.trello.com/reference#boardsidlabelnamesmembersidmember
   * @see https://developers.trello.com/reference#cardsididmembers
   * @see https://developers.trello.com/reference#organizationsidmembers-1
   * @see https://developers.trello.com/reference#organizationsidmembersidmember
   */
  public associateMember(params?: {
    email?: string;
    type?: BoardMemberType;
    allowBillableGuest?: boolean;
    fullName?: string;
  }): TypedFetch<MemberRecord> {
    if (!this.isChildOf(["board", "card", "organization"])) {
      throw new Error(
        "You can only call associateMember() from a board, card, or organization",
      );
    }

    if (this.isChildOf("card")) {
      if (!this.identifier) {
        throw new Error(
          `You must pass a member ID into the members() instance when calling associateMember()`,
        );
      }

      if (!isEmpty(params)) {
        throw new Error(
          "No params are allowed when calling associateMember() from a card",
        );
      }

      this.pathElements = [...this.parentElements, "idMembers"];
      return this.apiPost("/", { value: this.identifier });
    }

    if (!params?.email && !this.identifier) {
      throw new Error(
        `You must specify the "email" param or pass a member ID into the members() instance when calling associateMember()`,
      );
    }

    if (this.isChildOf("board")) {
      const body = {} as { fullName?: string };
      if (params?.fullName) {
        body.fullName = params.fullName;
        delete params.fullName;
      }

      return this.apiPut("/", params, body);
    }

    return this.apiPut("/", params);
  }

  public associateMembers(idMembers: string[]): TypedFetch<unknown> {
    if (!this.isChildOf("card")) {
      throw new Error("You can only call associateMembers() from a card");
    }

    this.pathElements = [...this.parentElements, "idMembers"];
    return this.apiPut("/", { value: idMembers });
  }

  public uploadAvatar(file: FileUpload): TypedFetch<unknown> {
    return this.apiPost("/avatar", { file });
  }

  public updateMember(params: {
    fullName?: string;
    initials?: string;
    username?: string;
    bio?: string;
    avatarSource?: AvatarSourceField;
    prefs?: {
      colorBlind?: boolean;
      locale?: string;
      minutesBetweenSummaries?: number;
    };
  }): TypedFetch<MemberRecord> {
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

  public makeAdminForEnterprise(): TypedFetch<unknown> {
    if (!this.isChildOf("enterprise")) {
      throw new Error(
        "You can only call makeAdminForEnterprise() on an enterprise",
      );
    }

    this.pathElements = [...this.parentElements, "admins", this.identifier];
    return this.apiPut("/");
  }

  /**
   * Updates the deactivated status for a member associated with an enterprise
   * or organization.
   * @see https://developers.trello.com/reference#enterprisesidmembersidmemberdeactivated-1
   * @see https://developers.trello.com/reference#organizationsidmembersidmemberdeactivated
   */
  public updateDeactivatedStatus(value: boolean): TypedFetch<unknown> {
    if (!this.isChildOf(["enterprise", "organization"])) {
      throw new Error(
        "You can only call updateDeactivatedStatus() on an enterprise or organization",
      );
    }

    return this.apiPut("/deactivated", { value });
  }

  /**
   * Updates the member type for a member associated with a board or organization.
   * @see https://developers.trello.com/reference/#boardsidlabelnamesmembers
   * @see https://developers.trello.com/reference/#organizationsidmembers-1
   */
  public updateMemberType(type: MemberType): TypedFetch<unknown> {
    if (!this.isChildOf(["board", "organization"])) {
      throw new Error(
        "You can only call updateMemberType() on a board or organization",
      );
    }

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

  public voteOnCard(): TypedFetch<unknown> {
    // Remove the identifier from the path elements, we pass the member ID to
    // the request via the `value` param:
    this.pathElements.pop();
    return this.apiPost("/", { value: this.identifier });
  }

  public dismissOneTimeMessages(value: string): TypedFetch<unknown> {
    return this.apiPost("/oneTimeMessagesDismissed", { value });
  }

  /**
   * Removes a member's association with a board, card, or organization (and
   * optionally all team boards), doesn't actually delete it.
   * @param [isRemovedFromBoards=false] Removes the member from all of the boards
   *                                    for an organization as well.
   * @see https://developers.trello.com/reference#boardsidmembersidmember
   * @see https://developers.trello.com/reference#organizationsidmembersidmember-1
   * @see https://developers.trello.com/reference#organizationsidmembersidmember-1
   */
  public dissociateMember(
    isRemovedFromBoards: boolean = false,
  ): TypedFetch<unknown> {
    if (!this.isChildOf(["board", "card", "organization"])) {
      throw new Error(
        "You can only call dissociateMember() on a board, card, or organization",
      );
    }

    if (this.isChildOf("card")) {
      if (!this.identifier) {
        throw new Error(
          `You must pass a member ID into the members() instance when calling dissociateMember()`,
        );
      }

      this.pathElements = [
        ...this.parentElements,
        "idMembers",
        this.identifier,
      ];

      return this.apiDelete("/");
    }

    const endpoint = isRemovedFromBoards ? "/all" : "/";
    return this.apiDelete(endpoint);
  }

  public removeAdminForEnterprise(): TypedFetch<unknown> {
    if (!this.isChildOf("enterprise")) {
      throw new Error(
        "You can only call removeAdminForEnterprise() on an enterprise",
      );
    }

    this.pathElements = [...this.parentElements, "admins", this.identifier];
    return this.apiDelete("/");
  }

  public removeVoteFromCard(): TypedFetch<unknown> {
    return this.apiDelete("/");
  }

  public actions(): Action {
    return new Action(this.config, this.pathElements, "actions");
  }

  public boardBackgrounds(idBoardBackground: string = ""): BoardBackground {
    return new BoardBackground(
      this.config,
      this.pathElements,
      "boardBackgrounds",
      {
        identifier: idBoardBackground,
      },
    );
  }

  public boardStars(idBoardStar: string = ""): BoardStar {
    return new BoardStar(this.config, this.pathElements, "boardStars", {
      identifier: idBoardStar,
    });
  }

  public boards(): Board {
    return new Board(this.config, this.pathElements, "boards");
  }

  public boardsInvited(): Board {
    return new Board(this.config, this.pathElements, "boardsInvited");
  }

  public cards(): Card {
    return new Card(this.config, this.pathElements, "cards");
  }

  public customBoardBackgrounds(
    idCustomBoardBackground: string = "",
  ): CustomBoardBackground {
    return new CustomBoardBackground(
      this.config,
      this.pathElements,
      "customBoardBackgrounds",
      {
        identifier: idCustomBoardBackground,
      },
    );
  }

  public customEmojis(idCustomEmoji: string = ""): CustomEmoji {
    return new CustomEmoji(this.config, this.pathElements, "customEmoji", {
      identifier: idCustomEmoji,
    });
  }

  public customStickers(idCustomSticker: string = ""): CustomSticker {
    return new CustomSticker(this.config, this.pathElements, "customStickers", {
      identifier: idCustomSticker,
    });
  }

  public enterprises(): Enterprise {
    return new Enterprise(this.config, this.pathElements, "enterprises");
  }

  public notifications(): Notification {
    return new Notification(this.config, this.pathElements, "notifications");
  }

  public organizations(): Organization {
    return new Organization(this.config, this.pathElements, "organizations");
  }

  public organizationsInvited(): Organization {
    return new Organization(
      this.config,
      this.pathElements,
      "organizationsInvited",
    );
  }

  public savedSearches(idSavedSearch: string = ""): SavedSearch {
    return new SavedSearch(this.config, this.pathElements, "savedSearches", {
      identifier: idSavedSearch,
    });
  }

  public tokens(): Token {
    return new Token(this.config, this.pathElements, "tokens");
  }
}
