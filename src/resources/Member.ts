import { TrelloForWolvesError } from "../TrelloForWolvesError";
import { isEmpty } from "../utils/isEmpty";
import { BaseResource } from "./BaseResource";
import { Action } from "./Action";
import { Board } from "./Board";
import { BoardBackground, CustomBoardBackground } from "./BoardBackgrounds";
import { BoardStar } from "./BoardStar";
import { Card } from "./Card";
import { CustomEmoji } from "./CustomEmoji";
import { Enterprise } from "./Enterprise";
import { Notification } from "./Notification";
import { Organization } from "./Organization";
import { SavedSearch } from "./SavedSearch";
import { CustomSticker } from "./Stickers";
import { Token } from "./Token";
import {
  AllOrFieldOrListOf,
  AllOrNone,
  AnyParams,
  AvatarSourceField,
  BoardBackgroundFilter,
  BoardField,
  BoardFilter,
  BoardMemberType,
  FileUpload,
  MemberField,
  MemberFilter,
  MemberRecord,
  MemberType,
  NestedActionsParams,
  NestedBoardsParams,
  NestedCardsParams,
  NestedEnterprisesParams,
  NestedNotificationsParams,
  NestedOrganizationsParams,
  OrganizationField,
  OrganizationFilter,
  SortOrder,
  TypedFetch,
  ValueResponse,
} from "../typeDefs";

/**
 * Everyone with a Trello account is called a member.
 * @se https://developers.trello.com/reference#member
 * @class
 */
export class Member extends BaseResource {
  public getMember(
    params?: {
      boardBackgrounds?: AllOrFieldOrListOf<BoardBackgroundFilter>;
      boardsInvited?: BoardFilter;
      boardsInvitedFields?: AllOrFieldOrListOf<BoardField>;
      boardStars?: boolean;
      customBoardBackgrounds?: AllOrNone;
      customEmoji?: AllOrNone;
      customStickers?: AllOrNone;
      fields?: AllOrFieldOrListOf<MemberField>;
      organizationPaidAccount?: boolean;
      organizationsInvited?: OrganizationFilter;
      organizationsInvitedFields?: AllOrFieldOrListOf<OrganizationField>;
      paidAccount?: boolean;
      savedSearches?: boolean;
      tokens?: AllOrNone;
    } & NestedActionsParams &
      NestedBoardsParams &
      NestedCardsParams &
      NestedEnterprisesParams &
      NestedNotificationsParams &
      NestedOrganizationsParams,
  ): TypedFetch<MemberRecord> {
    return this.apiGet("/", params as Record<string, unknown>);
  }

  /**
   * @param [params] Options for data to return.
   * @param [params.fields]
   * @param [params.filter] Pass a SCIM-style query to filter members. This takes precedence over the
   *                        all/normal/admins value of members. If any of the below member_* args are set,
   *                        the member array will be paginated.
   * @param [params.sort] This parameter expects a SCIM-style sorting value prefixed by a - to sort
   *                      descending. If no - is prefixed, it will be sorted ascending. Note that the
   *                      members array returned will be paginated if members is "normal" or "admins".
   *                      Pagination can be controlled with member_startIndex, etc, but the API
   *                      response will not contain the total available result count or pagination status data.
   * @param [params.sortBy] This parameter expects a SCIM-style sorting value. Note that the members array
   *                        returned will be paginated if members is "normal" or "admins". Pagination
   *                        can be controlled with member_startIndex, etc, but the API response will not
   *                        contain the total available result count or pagination status data.
   * @param [params.sortOrder] Order to sort records by.
   * @param [params.startIndex] Any integer between 0 and 9999.
   * @param [params.count] SCIM-style filter.
   * @param [params.organizationFields] Organization fields to include in response.
   * @param [params.boardFields] Board fields to include in response.
   */
  public getMembers(params?: {
    fields?: AllOrFieldOrListOf<MemberField>;
    filter?: string | "none";
    sort?: string;
    sortBy?: string;
    sortOrder?: SortOrder;
    startIndex?: number;
    count?: string | "none";
    organizationFields?: AllOrFieldOrListOf<OrganizationField>;
    boardFields?: AllOrFieldOrListOf<BoardField>;
  }): TypedFetch<MemberRecord[]> {
    return this.apiGet("/", params as AnyParams);
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
      throw new TrelloForWolvesError(
        "You can only call associateMember() from a board, card, or organization",
      );
    }

    if (this.isChildOf("card")) {
      if (!this.identifier) {
        throw new TrelloForWolvesError(
          `You must pass a member ID into the members() instance when calling associateMember()`,
        );
      }

      if (!isEmpty(params)) {
        throw new TrelloForWolvesError(
          "No params are allowed when calling associateMember() from a card",
        );
      }

      this.pathElements = [...this.parentElements, "idMembers"];
      return this.apiPost("/", { value: this.identifier });
    }

    if (!params?.email && !this.identifier) {
      throw new TrelloForWolvesError(
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
      throw new TrelloForWolvesError(
        "You can only call associateMembers() from a card",
      );
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
      throw new TrelloForWolvesError(
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
      throw new TrelloForWolvesError(
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
      throw new TrelloForWolvesError(
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
      throw new TrelloForWolvesError(
        "You can only call dissociateMember() on a board, card, or organization",
      );
    }

    if (this.isChildOf("card")) {
      if (!this.identifier) {
        throw new TrelloForWolvesError(
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
      throw new TrelloForWolvesError(
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
