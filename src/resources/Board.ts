import { BaseResource } from "./BaseResource";
import { Action, ActionField, ActionFilter } from "./Action";
import { AttachmentField, AttachmentFilter } from "./Attachment";
import {
  BoardPermissionLevel,
  BoardPref,
  GroupPermission,
  Invitation,
} from "./BoardPref";
import { BoardMyPref } from "./BoardMyPref";
import { Card, CardAging, CardField, CardFilter } from "./Card";
import { Checklist, ChecklistField } from "./Checklist";
import { CustomField } from "./CustomField";
import { Label, LabelColor, LabelField } from "./Label";
import { List, ListField, ListFilter } from "./List";
import { Member, MemberField, MemberFilter } from "./Member";
import { Membership, MembershipFilter } from "./Membership";
import { Organization, OrganizationField } from "./Organization";
import { Plugin } from "./Plugin";
import {
  AllOrNone,
  ArgumentGroup,
  FilterDate,
  Format,
  KeepFromSourceField,
  PermissionLevel,
} from "../typeDefs";

export type BoardField =
  | "closed"
  | "dateLastActivity"
  | "dateLastView"
  | "desc"
  | "descData"
  | "idOrganization"
  | "invitations"
  | "invited"
  | "labelNames"
  | "memberships"
  | "name"
  | "pinned"
  | "powerUps"
  | "prefs"
  | "shortLink"
  | "shortUrl"
  | "starred"
  | "subscribed"
  | "url";

export type BoardFilter =
  | "closed"
  | "members"
  | "open"
  | "organization"
  | "pinned"
  | "public"
  | "starred"
  | "unpinned";

export type BoardMemberType = "admin" | "normal" | "observer";

export type BoardStarsFilter = "none" | "mine";

export type PowerUp = "calendar" | "cardAging" | "recap" | "voting";

export class Board extends BaseResource {
  public getBoards(params?: {
    filter?: ArgumentGroup<BoardFilter>;
    fields?: ArgumentGroup<BoardField>;
    actions?: ArgumentGroup<ActionFilter>;
    actionsEntities?: boolean;
    actionsLimit?: number;
    actionsFormat?: Format;
    actionsSince?: FilterDate;
    actionFields?: ArgumentGroup<ActionField>;
    memberships?: ArgumentGroup<MembershipFilter>;
    organization?: boolean;
    organizationFields?: ArgumentGroup<OrganizationField>;
    lists?: ListFilter;
  }): Promise<unknown> {
    return this.httpGet("/", params);
  }

  public getBoard(
    params?:
      | {
          actions?: ArgumentGroup<ActionFilter>;
          actionsEntities?: boolean;
          actionsDisplay?: boolean;
          actionsFormat?: Format;
          actionsSince?: FilterDate;
          actionsLimit?: number;
          actionFields?: ArgumentGroup<ActionField>;
          actionMember?: boolean;
          actionMemberFields?: ArgumentGroup<MemberField>;
          actionMemberCreator?: boolean;
          actionMemberCreatorFields?: ArgumentGroup<MemberField>;
          cards?: CardFilter;
          cardFields?: ArgumentGroup<CardField>;
          cardAttachments?: AttachmentFilter;
          cardAttachmentFields?: ArgumentGroup<AttachmentField>;
          cardChecklists?: AllOrNone;
          cardPluginData?: boolean;
          cardStickers?: boolean;
          boardStars?: BoardStarsFilter;
          labels?: AllOrNone;
          labelFields?: ArgumentGroup<LabelField>;
          labelsLimit?: number;
          lists?: ListFilter;
          listFields?: ArgumentGroup<ListField>;
          memberships?: ArgumentGroup<MembershipFilter>;
          membershipsMember?: boolean;
          membershipsMemberFields?: ArgumentGroup<MemberField>;
          members?: MemberFilter;
          memberFields?: ArgumentGroup<MemberField>;
          membersInvited?: MemberFilter;
          membersInvitedFields?: ArgumentGroup<MemberField>;
          pluginData?: boolean;
          checklists?: AllOrNone;
          checklistFields?: ArgumentGroup<ChecklistField>;
          organization?: boolean;
          organizationFields?: ArgumentGroup<OrganizationField>;
          organizationMemberships?: ArgumentGroup<MembershipFilter>;
          organizationPluginData?: boolean;
          myPrefs?: boolean;
          tags?: boolean;
          fields?: ArgumentGroup<BoardField>;
        }
      | {
          // This is the only option if calling from a different resource.
          fields?: ArgumentGroup<BoardField>;
        },
  ): Promise<unknown> {
    return this.httpGet("/", params);
  }

  public getBoardsFilteredBy(
    filter: ArgumentGroup<BoardFilter>,
  ): Promise<unknown> {
    return this.httpGet("/", { filter });
  }

  public getFieldValue(field: BoardField): Promise<unknown> {
    return this.httpGet(`/${field}`);
  }

  public actions(): Action {
    return new Action(this.config, `${this.routePath}/actions`);
  }

  public getBoardStars(params?: {
    filter?: BoardStarsFilter;
  }): Promise<unknown> {
    return this.httpGet("/boardStars", params);
  }

  public getBoardPlugins(): Promise<unknown> {
    return this.httpGet("/boardPlugins");
  }

  public cards(cardId: string = ""): Card {
    return new Card(this.config, `${this.routePath}/cards/${cardId}`);
  }

  public checklists(): Checklist {
    return new Checklist(this.config, `${this.routePath}/checklists`);
  }

  public customFields(): CustomField {
    return new CustomField(this.config, `${this.routePath}/customFields`);
  }

  public getDeltas(params: {
    tags: string;
    ixLastUpdate: number;
  }): Promise<unknown> {
    return this.httpGet("/deltas", params);
  }

  public getTags(): Promise<unknown> {
    return this.httpGet("/idTags");
  }

  public labels(labelId: string = ""): Label {
    return new Label(this.config, `${this.routePath}/labels/${labelId}`);
  }

  public lists(): List {
    return new List(this.config, `${this.routePath}/lists`);
  }

  public members(memberId: string = ""): Member {
    return new Member(this.config, `${this.routePath}/members/${memberId}`);
  }

  public membersInvited(): Member {
    return new Member(this.config, `${this.routePath}/membersInvited`);
  }

  public memberships(membershipId: string = ""): Membership {
    return new Membership(
      this.config,
      `${this.routePath}/memberships/${membershipId}`,
    );
  }

  public myPrefs(): BoardMyPref {
    return new BoardMyPref(this.config, `${this.routePath}/myPrefs`);
  }

  public organization(): Organization {
    return new Organization(this.config, `${this.routePath}/organization`);
  }

  public plugins(): Plugin {
    return new Plugin(this.config, `${this.routePath}/plugins`);
  }

  public addBoard(params: {
    name: string;
    defaultLabels?: boolean;
    defaultLists?: boolean;
    desc?: string;
    idOrganization?: string;
    idBoardSource?: string;
    keepFromSource?: ArgumentGroup<KeepFromSourceField>;
    powerUps?: ArgumentGroup<PowerUp>;
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
  }): Promise<unknown> {
    return this.httpPost("/", { ...params, separator: "_" });
  }

  public enableBoardPlugin(idPlugin: string): Promise<unknown> {
    return this.httpPost("/boardPlugins", { idPlugin });
  }

  public addPowerUp(value: PowerUp): Promise<unknown> {
    return this.httpPost("/powerUps", { value });
  }

  public addTags(value: string): Promise<unknown> {
    return this.httpPost("/tags", { value });
  }

  public generateCalendarKey(): Promise<unknown> {
    return this.httpPost("/calendarKey/generate");
  }

  public generateEmailKey(): Promise<unknown> {
    return this.httpPost("/emailKey/generate");
  }

  public updateBoard(params?: {
    name?: string;
    desc?: string;
    closed?: boolean;
    subscribed?: boolean;
    idOrganization?: string;
    prefs?: {
      permissionLevel?: BoardPermissionLevel;
      selfJoin?: boolean;
      cardCovers?: boolean;
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
  }): Promise<unknown> {
    return this.httpPut("/", { ...params, separator: "/" });
  }

  public updateClosedStatus(value: boolean): Promise<unknown> {
    return this.httpPut("/closed", { value });
  }

  public updateDescription(value: string): Promise<unknown> {
    return this.httpPut("/desc", { value });
  }

  public moveToOrganization(organizationId: string): Promise<unknown> {
    return this.httpPut("/idOrganization", { value: organizationId });
  }

  public updateLabelNameForColor(
    labelColor: LabelColor,
    value: string,
  ): Promise<unknown> {
    return this.httpPut(`/labelNames/${labelColor}`, { value });
  }

  public updateName(value: string): Promise<unknown> {
    return this.httpPut("/name", { value });
  }

  public prefs(): BoardPref {
    return new BoardPref(this.config, `${this.routePath}/prefs`);
  }

  public updateSubscribed(value: boolean): Promise<unknown> {
    return this.httpPut("/subscribed", { value });
  }

  public markAsViewed(): Promise<unknown> {
    return this.httpPost("/markAsViewed");
  }

  public deleteBoard(id: string): Promise<unknown> {
    return this.httpDelete("/", { id });
  }

  public disableBoardPlugin(idPlugin: string): Promise<unknown> {
    return this.httpDelete("/boardPlugins", { idPlugin });
  }

  public deletePowerUp(powerUp: PowerUp): Promise<unknown> {
    return this.httpDelete(`/powerUps/${powerUp}`);
  }
}
