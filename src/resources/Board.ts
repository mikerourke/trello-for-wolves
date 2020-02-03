import { TrelloForWolvesError } from "../TrelloForWolvesError";
import { BaseResource } from "./BaseResource";
import { Action } from "./Action";
import { BoardMyPrefs } from "./BoardMyPrefs";
import { BoardPref } from "./BoardPref";
import { BoardStar } from "./BoardStar";
import { Card } from "./Card";
import { Checklist } from "./Checklist";
import { CustomField } from "./CustomField";
import { Label } from "./Label";
import { List } from "./List";
import { Member } from "./Member";
import { Membership } from "./Membership";
import { Organization } from "./Organization";
import { Plugin } from "./Plugin";
import {
  AllOrFieldOrListOf,
  BoardActionType,
  BoardField,
  BoardFilter,
  BoardPermissionLevel,
  BoardPluginRecord,
  BoardRecord,
  BoardStarsFilter,
  CardAging,
  ColorName,
  GroupPermission,
  Invitation,
  KeepFromSourceField,
  NestedActionsParams,
  NestedCardsParams,
  NestedChecklistsParams,
  NestedCustomFieldsParams,
  NestedLabelsParams,
  NestedListsParams,
  NestedMembershipsParams,
  NestedMembersInvitedParams,
  NestedMembersParams,
  NestedNotificationsParams,
  NestedOrganizationParams,
  PermissionLevel,
  PowerUp,
  TypedFetch,
  ValueResponse,
} from "../typeDefs";

/**
 * Boards are fundamental to Trello. A board may belong to 0 or 1 teams and can
 * have 0 or more lists.
 * @see https://developers.trello.com/reference#boards-2
 * @class
 */
export class Board extends BaseResource {
  public getBoard(
    params?: {
      boardStars?: BoardStarsFilter;
      cardPluginData?: boolean;
      fields?: AllOrFieldOrListOf<BoardField>;
      pluginData?: boolean;
      organizationPluginData?: boolean;
      myPrefs?: boolean;
      tags?: boolean;
    } & NestedActionsParams &
      NestedCardsParams &
      NestedChecklistsParams &
      NestedCustomFieldsParams &
      NestedLabelsParams &
      NestedListsParams &
      NestedMembersParams &
      NestedMembersInvitedParams &
      NestedMembershipsParams &
      NestedNotificationsParams &
      NestedOrganizationParams,
  ): TypedFetch<BoardRecord> {
    return this.apiGet("/", params);
  }

  public getBoards(
    params?: {
      filter?: BoardFilter;
      fields?: AllOrFieldOrListOf<BoardField>;
    } & NestedActionsParams &
      NestedListsParams &
      NestedMembershipsParams &
      NestedOrganizationParams,
  ): TypedFetch<BoardRecord[]> {
    return this.apiGet("/", params);
  }

  public getBoardsFilteredBy(filter: BoardFilter): TypedFetch<unknown> {
    return this.apiGet("/", { filter });
  }

  public getFieldValue<T>(field: BoardField): TypedFetch<ValueResponse<T>> {
    return this.apiGet(`/${field}`);
  }

  public getBoardPlugins(): TypedFetch<BoardPluginRecord[]> {
    return this.apiGet("/boardPlugins");
  }

  public getTags(): TypedFetch<unknown> {
    return this.apiGet("/idTags");
  }

  /**
   * This method can be used before moving a board into a paid organization to
   * see if the board contains members that aren't already paid for in the
   * organization.
   * @see https://developers.trello.com/reference#organizationsidnewbillableguestsidboard
   */
  public getIfHasNewBillableGuests(): TypedFetch<unknown> {
    if (!this.isChildOf("organization")) {
      throw new TrelloForWolvesError(
        `You can only call getIfHasNewBillableGuests() from an organization`,
      );
    }

    this.pathElements = [
      ...this.parentElements,
      "newBillableGuests",
      this.identifier,
    ];
    return this.apiGet("/");
  }

  public addBoard(params: {
    name: string;
    defaultLabels?: boolean;
    defaultLists?: boolean;
    desc?: string;
    idOrganization?: string;
    idBoardSource?: string;
    keepFromSource?: AllOrFieldOrListOf<KeepFromSourceField>;
    powerUps?: AllOrFieldOrListOf<PowerUp>;
    prefs?: {
      permissionLevel?: PermissionLevel;
      voting?: GroupPermission;
      comments?: GroupPermission;
      invitations?: Invitation;
      selfJoin?: boolean;
      cardCovers?: boolean;
      background?: string;
      cardAging?: CardAging;
    };
  }): TypedFetch<BoardRecord> {
    return this.apiPost("/", { ...params, separator: "_" });
  }

  public enableBoardPlugin(idPlugin: string): TypedFetch<unknown> {
    return this.apiPost("/boardPlugins", { idPlugin });
  }

  public enablePowerUp(value: PowerUp): TypedFetch<unknown> {
    return this.apiPost("/powerUps", { value });
  }

  public addTag(value: string): TypedFetch<unknown> {
    return this.apiPost("/idTags", { value });
  }

  public generateCalendarKey(): TypedFetch<unknown> {
    return this.apiPost("/calendarKey/generate");
  }

  public generateEmailKey(): TypedFetch<unknown> {
    return this.apiPost("/emailKey/generate");
  }

  public markAsViewed(): TypedFetch<unknown> {
    return this.apiPost("/markAsViewed");
  }

  public updateBoard(params: {
    name?: string;
    desc?: string;
    closed?: boolean;
    subscribed?: boolean;
    idOrganization?: string;
    prefs?: {
      permissionLevel?: BoardPermissionLevel;
      selfJoin?: boolean;
      cardCovers?: boolean;
      hideVotes?: boolean;
      invitations?: Invitation;
      voting?: GroupPermission;
      comments?: GroupPermission;
      background?: string;
      cardAging?: CardAging;
      calendarFeedEnabled?: boolean;
    };
    labelNames?: {
      green?: string;
      yellow?: string;
      orange?: string;
      red?: string;
      purple?: string;
      blue?: string;
    };
  }): TypedFetch<unknown> {
    return this.apiPut("/", { ...params, separator: "/" });
  }

  public updateClosedStatus(value: boolean): TypedFetch<unknown> {
    return this.apiPut("/closed", { value });
  }

  public updateDescription(value: string): TypedFetch<unknown> {
    return this.apiPut("/desc", { value });
  }

  public moveToOrganization(organizationId: string): TypedFetch<unknown> {
    return this.apiPut("/idOrganization", { value: organizationId });
  }

  public updateLabelNameForColor(
    labelColor: ColorName,
    labelName: string,
  ): TypedFetch<unknown> {
    return this.apiPut(`/labelNames/${labelColor}`, {
      value: labelName,
    });
  }

  public updateName(value: string): TypedFetch<unknown> {
    return this.apiPut("/name", { value });
  }

  public updateSubscribed(value: boolean): TypedFetch<unknown> {
    return this.apiPut("/subscribed", { value });
  }

  public deleteBoard(): TypedFetch<unknown> {
    return this.apiDelete("/");
  }

  public disableBoardPlugin(idPlugin: string): TypedFetch<unknown> {
    return this.apiDelete(`/boardPlugins/${idPlugin}`);
  }

  public disablePowerUp(powerUp: PowerUp): TypedFetch<unknown> {
    return this.apiDelete(`/powerUps/${powerUp}`);
  }

  public actions(idAction: string = ""): Action<BoardActionType> {
    return new Action<BoardActionType>(
      this.config,
      this.pathElements,
      "actions",
      {
        identifier: idAction,
      },
    );
  }

  public boardStars(idBoardStar: string = ""): BoardStar {
    return new BoardStar(this.config, this.pathElements, "boardStars", {
      identifier: idBoardStar,
    });
  }

  public cards(idCard: string = ""): Card {
    return new Card(this.config, this.pathElements, "cards", {
      identifier: idCard,
    });
  }

  public checklists(idChecklist: string = ""): Checklist {
    return new Checklist(this.config, this.pathElements, "checklists", {
      identifier: idChecklist,
    });
  }

  public customFields(): CustomField {
    return new CustomField(this.config, this.pathElements, "customFields");
  }

  public labels(idLabel: string = ""): Label {
    return new Label(this.config, this.pathElements, "labels", {
      identifier: idLabel,
    });
  }

  public lists(idList: string = ""): List {
    return new List(this.config, this.pathElements, "lists", {
      identifier: idList,
    });
  }

  public members(idMember: string = ""): Member {
    return new Member(this.config, this.pathElements, "members", {
      identifier: idMember,
    });
  }

  public membersInvited(): Member {
    return new Member(this.config, this.pathElements, "membersInvited");
  }

  public memberships(idMembership: string = ""): Membership {
    return new Membership(this.config, this.pathElements, "memberships", {
      identifier: idMembership,
    });
  }

  public myPrefs(): BoardMyPrefs {
    return new BoardMyPrefs(this.config, this.pathElements, "myPrefs");
  }

  public organization(): Organization {
    return new Organization(this.config, this.pathElements, "organization");
  }

  public plugins(): Plugin {
    return new Plugin(this.config, this.pathElements, "plugins");
  }

  public prefs(): BoardPref {
    return new BoardPref(this.config, this.pathElements, "prefs");
  }
}
