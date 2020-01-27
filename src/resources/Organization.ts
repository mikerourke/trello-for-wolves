import { BaseResource } from "./BaseResource";
import { Action, ActionField, ActionType } from "./Action";
import { Board, BoardField, BoardFilter } from "./Board";
import { ListFilter } from "./List";
import { Member, MemberInvitedField, MemberFilter } from "./Member";
import { Membership, MembershipFilter } from "./Membership";
import { BoardVisibilityFilter, OrganizationPref } from "./OrganizationPref";
import {
  AllOfOrListOf,
  FileUpload,
  FilterDate,
  Format,
  PermissionLevel,
  TypedFetch,
} from "../typeDefs";

export type OrganizationFilter = "all" | "members" | "none" | "public";

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

export class Organization extends BaseResource {
  public getOrganizations(params?: {
    filter?: AllOfOrListOf<OrganizationFilter>;
    fields?: AllOfOrListOf<OrganizationField>;
    paidAccount?: boolean;
  }): TypedFetch<unknown> {
    return this.apiGet("/", params);
  }

  public getOrganization(params?: {
    actionFields?: AllOfOrListOf<ActionField>;
    actions?: AllOfOrListOf<ActionType>;
    actionsDisplay?: boolean;
    actionsEntities?: boolean;
    actionsLimit?: number;
    boardActionFields?: AllOfOrListOf<ActionField>;
    boardActions?: AllOfOrListOf<ActionType>;
    boardActionsDisplay?: boolean;
    boardActionsEntities?: boolean;
    boardActionsFormat?: Format;
    boardActionsLimit?: number;
    boardActionsSince?: FilterDate;
    boardFields?: AllOfOrListOf<BoardField>;
    boardLists?: AllOfOrListOf<ListFilter>;
    boardPluginData?: boolean;
    boards?: AllOfOrListOf<BoardFilter>;
    fields?: AllOfOrListOf<OrganizationField>;
    memberActivity?: boolean;
    memberFields?: AllOfOrListOf<MemberInvitedField>;
    members?: MemberFilter;
    memberships?: AllOfOrListOf<MembershipFilter>;
    membershipsMember?: boolean;
    membershipsMemberFields?: AllOfOrListOf<MemberInvitedField>;
    membersInvited?: MemberFilter;
    membersInvitedFields?: AllOfOrListOf<MemberInvitedField>;
    paidAccount?: boolean;
    pluginData?: boolean;
  }): TypedFetch<unknown> {
    return this.apiGet("/", params);
  }

  public getOrganizationsFilteredBy(
    filter: AllOfOrListOf<OrganizationFilter>,
  ): TypedFetch<unknown> {
    return this.apiGet("/", { filter });
  }

  public getFieldValue(field: OrganizationField): TypedFetch<unknown> {
    return this.apiGet(`/${field}`);
  }

  public getDeltas(params: {
    ixLastUpdate: number;
    tags: string;
  }): TypedFetch<unknown> {
    return this.apiGet("/deltas", params);
  }

  public getPluginData(): TypedFetch<unknown> {
    return this.apiGet("/pluginData");
  }

  public getTags(): TypedFetch<unknown> {
    return this.apiGet("/tags");
  }

  public addOrganization(params?: {
    desc?: string;
    displayName?: string;
    name?: string;
    website?: string;
  }): TypedFetch<unknown> {
    return this.apiPost("/", { ...params, separator: "/" });
  }

  public uploadLogo(file: FileUpload): TypedFetch<unknown> {
    return this.apiPost("/logo", { file });
  }

  public addTags(name: string): TypedFetch<unknown> {
    return this.apiPost("/tags", { name });
  }

  public updateOrganization(params?: {
    desc?: string;
    displayName?: string;
    name?: string;
    prefs?: {
      associatedDomain?: string;
      boardVisibilityRestrict?: {
        orgRestriction?: BoardVisibilityFilter;
        privateRestriction?: BoardVisibilityFilter;
        publicRestriction?: BoardVisibilityFilter;
      };
      externalMembersDisabled?: boolean;
      googleAppsVersion?: number;
      orgInviteRestrict?: string;
      permissionLevel?: PermissionLevel;
    };
    website?: string | null;
  }): TypedFetch<unknown> {
    return this.apiPut("/", { ...params, separator: "/" });
  }

  public updateDescription(value: string): TypedFetch<unknown> {
    return this.apiPut("/desc", { value });
  }

  public updateDisplayName(value: string): TypedFetch<unknown> {
    return this.apiPut("/displayName", { value });
  }

  public updateName(value: string): TypedFetch<unknown> {
    return this.apiPut("/name", { value });
  }

  public updateWebsite(value: string | null): TypedFetch<unknown> {
    return this.apiPut("/website", { value });
  }

  public deleteOrganization(): TypedFetch<unknown> {
    return this.apiDelete("/");
  }

  public deleteLogo(): TypedFetch<unknown> {
    return this.apiDelete("/logo");
  }

  public actions(): Action {
    return new Action(this.config, this.pathElements, "actions");
  }

  public boards(): Board {
    return new Board(this.config, this.pathElements, "boards");
  }

  public members(memberId: string = ""): Member {
    return new Member(this.config, this.pathElements, "members", memberId);
  }

  public membersInvited(): Member {
    return new Member(this.config, this.pathElements, "membersInvited");
  }

  public memberships(membershipId: string = ""): Membership {
    return new Membership(
      this.config,
      this.pathElements,
      "memberships",
      membershipId,
    );
  }

  public prefs(): OrganizationPref {
    return new OrganizationPref(this.config, this.pathElements, "prefs");
  }
}
