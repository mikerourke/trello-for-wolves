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

export type BoardStarsFilter = "mine" | "none";

export type PowerUp = "calendar" | "cardAging" | "recap" | "voting";

export class Board extends BaseResource {
  public getBoards(params?: {
    actionFields?: ArgumentGroup<ActionField>;
    actions?: ArgumentGroup<ActionFilter>;
    actionsEntities?: boolean;
    actionsFormat?: Format;
    actionsLimit?: number;
    actionsSince?: FilterDate;
    fields?: ArgumentGroup<BoardField>;
    filter?: ArgumentGroup<BoardFilter>;
    lists?: ListFilter;
    memberships?: ArgumentGroup<MembershipFilter>;
    organization?: boolean;
    organizationFields?: ArgumentGroup<OrganizationField>;
  }): Promise<unknown> {
    return this.apiGet("/", params);
  }

  public getBoard(params?: {
    actionFields?: ArgumentGroup<ActionField>;
    actionMember?: boolean;
    actionMemberCreator?: boolean;
    actionMemberCreatorFields?: ArgumentGroup<MemberField>;
    actionMemberFields?: ArgumentGroup<MemberField>;
    actions?: ArgumentGroup<ActionFilter>;
    actionsDisplay?: boolean;
    actionsEntities?: boolean;
    actionsFormat?: Format;
    actionsLimit?: number;
    actionsSince?: FilterDate;
    boardStars?: BoardStarsFilter;
    cardAttachmentFields?: ArgumentGroup<AttachmentField>;
    cardAttachments?: AttachmentFilter;
    cardChecklists?: AllOrNone;
    cardFields?: ArgumentGroup<CardField>;
    cardPluginData?: boolean;
    cards?: CardFilter;
    cardStickers?: boolean;
    checklistFields?: ArgumentGroup<ChecklistField>;
    checklists?: AllOrNone;
    fields?: ArgumentGroup<BoardField>;
    labelFields?: ArgumentGroup<LabelField>;
    labels?: AllOrNone;
    labelsLimit?: number;
    listFields?: ArgumentGroup<ListField>;
    lists?: ListFilter;
    memberFields?: ArgumentGroup<MemberField>;
    members?: MemberFilter;
    memberships?: ArgumentGroup<MembershipFilter>;
    membershipsMember?: boolean;
    membershipsMemberFields?: ArgumentGroup<MemberField>;
    membersInvited?: MemberFilter;
    membersInvitedFields?: ArgumentGroup<MemberField>;
    myPrefs?: boolean;
    organization?: boolean;
    organizationFields?: ArgumentGroup<OrganizationField>;
    organizationMemberships?: ArgumentGroup<MembershipFilter>;
    organizationPluginData?: boolean;
    pluginData?: boolean;
    tags?: boolean;
  }): Promise<unknown> {
    return this.apiGet("/", params);
  }

  public getBoardsFilteredBy(
    filter: ArgumentGroup<BoardFilter>,
  ): Promise<unknown> {
    return this.apiGet("/", { filter });
  }

  public getFieldValue(field: BoardField): Promise<unknown> {
    return this.apiGet(`/${field}`);
  }

  public getBoardStars(params?: {
    filter?: BoardStarsFilter;
  }): Promise<unknown> {
    return this.apiGet("/boardStars", params);
  }

  public getBoardPlugins(): Promise<unknown> {
    return this.apiGet("/boardPlugins");
  }

  public getDeltas(params: {
    ixLastUpdate: number;
    tags: string;
  }): Promise<unknown> {
    return this.apiGet("/deltas", params);
  }

  public getTags(): Promise<unknown> {
    return this.apiGet("/idTags");
  }

  public addBoard(params: {
    name: string;
    defaultLabels?: boolean;
    defaultLists?: boolean;
    desc?: string;
    idBoardSource?: string;
    idOrganization?: string;
    keepFromSource?: ArgumentGroup<KeepFromSourceField>;
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
    powerUps?: ArgumentGroup<PowerUp>;
  }): Promise<unknown> {
    return this.apiPost("/", { ...params, separator: "_" });
  }

  public enableBoardPlugin(idPlugin: string): Promise<unknown> {
    return this.apiPost("/boardPlugins", { idPlugin });
  }

  public addPowerUp(value: PowerUp): Promise<unknown> {
    return this.apiPost("/powerUps", { value });
  }

  public addTags(value: string): Promise<unknown> {
    return this.apiPost("/tags", { value });
  }

  public generateCalendarKey(): Promise<unknown> {
    return this.apiPost("/calendarKey/generate");
  }

  public generateEmailKey(): Promise<unknown> {
    return this.apiPost("/emailKey/generate");
  }

  public updateBoard(params?: {
    closed?: boolean;
    desc?: string;
    idOrganization?: string;
    labelNames?: {
      blue?: string;
      green?: string;
      orange?: string;
      purple?: string;
      red?: string;
      yellow?: string;
    };
    name?: string;
    prefs?: {
      background?: string;
      calendarFeedEnabled?: boolean;
      cardAging?: CardAging;
      cardCovers?: boolean;
      comments?: GroupPermission;
      invitations?: Invitation;
      permissionLevel?: BoardPermissionLevel;
      selfJoin?: boolean;
      voting?: GroupPermission;
    };
    subscribed?: boolean;
  }): Promise<unknown> {
    return this.apiPut("/", { ...params, separator: "/" });
  }

  public updateClosedStatus(value: boolean): Promise<unknown> {
    return this.apiPut("/closed", { value });
  }

  public updateDescription(value: string): Promise<unknown> {
    return this.apiPut("/desc", { value });
  }

  public moveToOrganization(organizationId: string): Promise<unknown> {
    return this.apiPut("/idOrganization", { value: organizationId });
  }

  public updateLabelNameForColor(
    labelColor: LabelColor,
    value: string,
  ): Promise<unknown> {
    return this.apiPut(`/labelNames/${labelColor}`, { value });
  }

  public updateName(value: string): Promise<unknown> {
    return this.apiPut("/name", { value });
  }

  public updateSubscribed(value: boolean): Promise<unknown> {
    return this.apiPut("/subscribed", { value });
  }

  public markAsViewed(): Promise<unknown> {
    return this.apiPost("/markAsViewed");
  }

  public deleteBoard(id: string): Promise<unknown> {
    return this.apiDelete("/", { id });
  }

  public disableBoardPlugin(idPlugin: string): Promise<unknown> {
    return this.apiDelete("/boardPlugins", { idPlugin });
  }

  public deletePowerUp(powerUp: PowerUp): Promise<unknown> {
    return this.apiDelete(`/powerUps/${powerUp}`);
  }

  public actions(): Action {
    return new Action(this.config, `${this.baseEndpoint}/actions`);
  }

  public cards(cardId: string = ""): Card {
    return new Card(this.config, `${this.baseEndpoint}/cards/${cardId}`);
  }

  public checklists(): Checklist {
    return new Checklist(this.config, `${this.baseEndpoint}/checklists`);
  }

  public customFields(): CustomField {
    return new CustomField(this.config, `${this.baseEndpoint}/customFields`);
  }

  public labels(labelId: string = ""): Label {
    return new Label(this.config, `${this.baseEndpoint}/labels/${labelId}`);
  }

  public lists(): List {
    return new List(this.config, `${this.baseEndpoint}/lists`);
  }

  public members(memberId: string = ""): Member {
    return new Member(this.config, `${this.baseEndpoint}/members/${memberId}`);
  }

  public membersInvited(): Member {
    return new Member(this.config, `${this.baseEndpoint}/membersInvited`);
  }

  public memberships(membershipId: string = ""): Membership {
    return new Membership(
      this.config,
      `${this.baseEndpoint}/memberships/${membershipId}`,
    );
  }

  public myPrefs(): BoardMyPref {
    return new BoardMyPref(this.config, `${this.baseEndpoint}/myPrefs`);
  }

  public organization(): Organization {
    return new Organization(this.config, `${this.baseEndpoint}/organization`);
  }

  public plugins(): Plugin {
    return new Plugin(this.config, `${this.baseEndpoint}/plugins`);
  }

  public prefs(): BoardPref {
    return new BoardPref(this.config, `${this.baseEndpoint}/prefs`);
  }
}
