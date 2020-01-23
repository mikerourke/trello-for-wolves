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
    return this.apiGet("/", params);
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
    return this.apiGet("/", params);
  }

  public getOrganizationsFilteredBy(
    filter: ArgumentGroup<OrganizationFilter>,
  ): Promise<unknown> {
    return this.apiGet("/", { filter });
  }

  public getFieldValue(field: OrganizationField): Promise<unknown> {
    return this.apiGet(`/${field}`);
  }

  public actions(): Action {
    return new Action(this.config, `${this.baseEndpoint}/actions`);
  }

  public boards(): Board {
    return new Board(this.config, `${this.baseEndpoint}/boards`);
  }

  public getDeltas(params: {
    tags: string;
    ixLastUpdate: number;
  }): Promise<unknown> {
    return this.apiGet("/deltas", params);
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

  public getPluginData(): Promise<unknown> {
    return this.apiGet("/pluginData");
  }

  public getTags(): Promise<unknown> {
    return this.apiGet("/tags");
  }

  public addOrganization(params?: {
    name?: string;
    displayName?: string;
    desc?: string;
    website?: string;
  }): Promise<unknown> {
    return this.apiPost("/", { ...params, separator: "/" });
  }

  public uploadLogo(file: Record<string, any>): Promise<unknown> {
    return this.apiPost("/logo", { file });
  }

  public addTags(name: string): Promise<unknown> {
    return this.apiPost("/tags", { name });
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
    return this.apiPut("/", { ...params, separator: "/" });
  }

  public updateDescription(value: string): Promise<unknown> {
    return this.apiPut("/desc", { value });
  }

  public updateDisplayName(value: string): Promise<unknown> {
    return this.apiPut("/displayName", { value });
  }

  public updateName(value: string): Promise<unknown> {
    return this.apiPut("/name", { value });
  }

  public prefs(): OrganizationPref {
    return new OrganizationPref(this.config, `${this.baseEndpoint}/prefs`);
  }

  public updateWebsite(value: string | null): Promise<unknown> {
    return this.apiPut("/website", { value });
  }

  public deleteOrganization(): Promise<unknown> {
    return this.apiDelete("/");
  }

  public deleteLogo(): Promise<unknown> {
    return this.apiDelete("/logo");
  }
}
