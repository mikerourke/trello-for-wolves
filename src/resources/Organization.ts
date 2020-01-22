import { BaseResource } from "./BaseResource";
import { Action, ActionField, ActionFilter } from "./Action";
import { Board, BoardField, BoardFilter } from "./Board";
import { ListFilter } from "./List";
import { Member, MemberField, MemberFilter } from "./Member";
import { Membership, MembershipFilter } from "./Membership";
import { BoardVisibilityFilter, OrganizationPref } from "./OrganizationPref";
import {
  ArgumentGroup,
  FilterDate,
  Format,
  PermissionLevel,
} from "../typeDefs";

export type OrganizationField =
  | "billableMemberCount"
  | "desc"
  | "descData"
  | "displayName"
  | "idBoards"
  | "invitations"
  | "invited"
  | "logoHash"
  | "memberships"
  | "name"
  | "powerUps"
  | "prefs"
  | "premiumFeatures"
  | "products"
  | "url"
  | "website";

export type OrganizationFilter = "all" | "members" | "none" | "public";

export class Organization extends BaseResource {
  public getOrganizations(params?: {
    filter?: ArgumentGroup<OrganizationFilter>;
    fields?: ArgumentGroup<OrganizationField>;
    paidAccount?: boolean;
  }): Promise<unknown> {
    return this.httpGet("/", params);
  }

  public getOrganization(params?: {
    actions?: ArgumentGroup<ActionFilter>;
    actionsEntities?: boolean;
    actionsDisplay?: boolean;
    actionsLimit?: number;
    actionFields?: ArgumentGroup<ActionField>;
    memberships?: ArgumentGroup<MembershipFilter>;
    membershipsMember?: boolean;
    membershipsMemberFields?: ArgumentGroup<MemberField>;
    members?: MemberFilter;
    memberFields?: ArgumentGroup<MemberField>;
    memberActivity?: boolean;
    membersInvited?: MemberFilter;
    membersInvitedFields?: ArgumentGroup<MemberField>;
    pluginData?: boolean;
    boards?: ArgumentGroup<BoardFilter>;
    boardFields?: ArgumentGroup<BoardField>;
    boardActions?: ArgumentGroup<ActionFilter>;
    boardActionsEntities?: boolean;
    boardActionsDisplay?: boolean;
    boardActionsFormat?: Format;
    boardActionsSince?: FilterDate;
    boardActionsLimit?: number;
    boardActionFields?: ArgumentGroup<ActionField>;
    boardLists?: ArgumentGroup<ListFilter>;
    boardPluginData?: boolean;
    paidAccount?: boolean;
    fields?: ArgumentGroup<OrganizationField>;
  }): Promise<unknown> {
    return this.httpGet("/", params);
  }

  public getOrganizationsFilteredBy(
    filter: ArgumentGroup<OrganizationFilter>,
  ): Promise<unknown> {
    return this.httpGet("/", { filter });
  }

  public getFieldValue(field: OrganizationField): Promise<unknown> {
    return this.httpGet(`/${field}`);
  }

  public actions(): Action {
    return new Action(this.config, `${this.routePath}/actions`);
  }

  public boards(): Board {
    return new Board(this.config, `${this.routePath}/boards`);
  }

  public getDeltas(params: {
    tags: string;
    ixLastUpdate: number;
  }): Promise<unknown> {
    return this.httpGet("/deltas", params);
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

  public getPluginData(): Promise<unknown> {
    return this.httpGet("/pluginData");
  }

  public getTags(): Promise<unknown> {
    return this.httpGet("/tags");
  }

  public addOrganization(params?: {
    name?: string;
    displayName?: string;
    desc?: string;
    website?: string;
  }): Promise<unknown> {
    return this.httpPost("/", { ...params, separator: "/" });
  }

  public uploadLogo(file: Record<string, any>): Promise<unknown> {
    return this.httpPost("/logo", { file });
  }

  public addTags(name: string): Promise<unknown> {
    return this.httpPost("/tags", { name });
  }

  public updateOrganization(params?: {
    prefs?: {
      associatedDomain?: string;
      externalMembersDisabled?: boolean;
      googleAppsVersion?: number;
      orgInviteRestrict?: string;
      permissionLevel?: PermissionLevel;
      boardVisibilityRestrict?: {
        orgRestriction?: BoardVisibilityFilter;
        privateRestriction?: BoardVisibilityFilter;
        publicRestriction?: BoardVisibilityFilter;
      };
    };
    name?: string;
    displayName?: string;
    desc?: string;
    website?: string | null;
  }): Promise<unknown> {
    return this.httpPut("/", { ...params, separator: "/" });
  }

  public updateDescription(value: string): Promise<unknown> {
    return this.httpPut("/desc", { value });
  }

  public updateDisplayName(value: string): Promise<unknown> {
    return this.httpPut("/displayName", { value });
  }

  public updateName(value: string): Promise<unknown> {
    return this.httpPut("/name", { value });
  }

  public prefs(): OrganizationPref {
    return new OrganizationPref(this.config, `${this.routePath}/prefs`);
  }

  public updateWebsite(value: string | null): Promise<unknown> {
    return this.httpPut("/website", { value });
  }

  public deleteOrganization(): Promise<unknown> {
    return this.httpDelete("/");
  }

  public deleteLogo(): Promise<unknown> {
    return this.httpDelete("/logo");
  }
}
