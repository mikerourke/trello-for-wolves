import { BaseResource } from "./BaseResource";
import { Action, ActionField, ActionType } from "./Action";
import { Board, BoardField, BoardFilter } from "./Board";
import { ListFilter } from "./List";
import {
  Member,
  MemberInvitedField,
  MemberFilter,
  MemberField,
} from "./Member";
import { Membership, MembershipFilter, MembershipRecord } from "./Membership";
import {
  BoardVisibilityFilter,
  OrganizationPref,
  OrganizationPrefsRecord,
} from "./OrganizationPref";
import {
  AllOfOrListOf,
  FileUpload,
  FilterDate,
  Format,
  PermissionLevel,
  TypedFetch,
  ValidResourceFields,
  ValueResponse,
} from "../typeDefs";

export type OrganizationFilter = "all" | "members" | "none" | "public";

/**
 * The data corresponding to an Organization. The fields that are present in the
 * record are contingent on the `fields`/`organizationFields` param passed to
 * the method used to retrieve the Organization data.
 * @typedef {Object} OrganizationRecord
 * @property id The ID of the organization.
 * @property billableMemberCount
 * @property desc The description for the team
 * @property descData If there are custom emoji in the desc this will contain
 *                    information about them.
 * @property displayName The name for the team. For example: Trello Inc.
 * @property idBoards An array of board IDs that are in the team.
 * @property invitations Array of invitations.
 * @property invited Indicates if invited.
 * @property logoHash Hash string for the organization logo.
 * @property memberships Array of memberships associated with the organization.
 * @property name The programmatic name for the team. For example: `trelloinc`.
 * @property powerUps Array of power ups associated with the organization.
 * @property prefs The preferences (settings) for the team.
 * @property premiumFeatures Array of premium features associated with the organization.
 * @property products Array of products associated with the organization.
 * @property url The URL to the team page on Trello.
 * @property website Website for the organization.
 */
export interface OrganizationRecord {
  id: string;
  billableMemberCount: string;
  desc: string;
  descData: object;
  displayName: string;
  idBoards: string[];
  invitations: unknown[];
  invited: string;
  logoHash: string;
  memberships: MembershipRecord[];
  name: string;
  powerUps: number[];
  prefs: OrganizationPrefsRecord;
  premiumFeatures: string[];
  products: number[];
  url: string;
  website: string;
}

export type OrganizationField = ValidResourceFields<OrganizationRecord>;

/**
 * Organizations, or as they are referred to in Trello, "Teams", represent
 * collections of members and boards.
 * @see https://developers.trello.com/reference#organizations
 * @class
 */
export class Organization extends BaseResource {
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
    memberFields?: AllOfOrListOf<MemberField>;
    members?: MemberFilter;
    memberships?: AllOfOrListOf<MembershipFilter>;
    membershipsMember?: boolean;
    membershipsMemberFields?: AllOfOrListOf<MemberField>;
    membersInvited?: MemberFilter;
    membersInvitedFields?: AllOfOrListOf<MemberInvitedField>;
    paidAccount?: boolean;
    pluginData?: boolean;
  }): TypedFetch<OrganizationRecord> {
    this.validateGetSingle();
    return this.apiGet("/", params);
  }

  public getOrganizations(params?: {
    filter?: OrganizationFilter;
    fields?: AllOfOrListOf<OrganizationField>;
    paidAccount?: boolean;
  }): TypedFetch<OrganizationRecord[]> {
    return this.apiGet("/", params);
  }

  // TODO: Ensure this works, it isn't actually documented.
  public getNestedOrganizations<TPayload extends object>(params?: {
    organizations?: OrganizationFilter;
    organizationFields?: AllOfOrListOf<OrganizationField>;
  }): TypedFetch<TPayload & { organizations: OrganizationRecord[] }> {
    return this.apiGetNested(params);
  }

  public getOrganizationsFilteredBy(
    filter: OrganizationFilter,
  ): TypedFetch<OrganizationRecord[]> {
    return this.apiGet("/", { filter });
  }

  public getFieldValue<T>(
    field: OrganizationField,
  ): TypedFetch<ValueResponse<T>> {
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

  public addOrganization(params: {
    displayName: string;
    desc?: string;
    name?: string;
    website?: string;
  }): TypedFetch<OrganizationRecord> {
    return this.apiPost("/", { ...params, separator: "/" });
  }

  public uploadLogo(file: FileUpload): TypedFetch<unknown> {
    return this.apiPost("/logo", { file });
  }

  public addTags(name: string): TypedFetch<unknown> {
    return this.apiPost("/tags", { name });
  }

  public updateOrganization(params: {
    name?: string;
    displayName?: string;
    desc?: string;
    website?: string | null;
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
  }): TypedFetch<OrganizationRecord> {
    return this.apiPut("/", { ...params, separator: "/" });
  }

  public updateDescription(value: string): TypedFetch<OrganizationRecord> {
    return this.apiPut("/desc", { value });
  }

  public updateDisplayName(value: string): TypedFetch<OrganizationRecord> {
    return this.apiPut("/displayName", { value });
  }

  public updateName(value: string): TypedFetch<OrganizationRecord> {
    return this.apiPut("/name", { value });
  }

  public updateWebsite(value: string | null): TypedFetch<OrganizationRecord> {
    return this.apiPut("/website", { value });
  }

  public transferToEnterprise(): TypedFetch<unknown> {
    if (!this.isChildOf("enterprise")) {
      throw new Error(
        "You can only call `transferToEnterprise()` on an enterprise",
      );
    }

    return this.apiPut("/");
  }

  public deleteOrganization(): TypedFetch<unknown> {
    return this.apiDelete("/");
  }

  public deleteLogo(): TypedFetch<unknown> {
    return this.apiDelete("/logo");
  }

  public actions(): Action {
    return new Action(this.config, this.pathElements, "actions", {
      isReturnUrl: this.isReturnUrl,
    });
  }

  public boards(): Board {
    return new Board(this.config, this.pathElements, "boards", {
      isReturnUrl: this.isReturnUrl,
    });
  }

  public members(memberId: string = ""): Member {
    return new Member(this.config, this.pathElements, "members", {
      identifier: memberId,
      isReturnUrl: this.isReturnUrl,
    });
  }

  public membersInvited(): Member {
    return new Member(this.config, this.pathElements, "membersInvited", {
      isReturnUrl: this.isReturnUrl,
    });
  }

  public memberships(membershipId: string = ""): Membership {
    return new Membership(this.config, this.pathElements, "memberships", {
      identifier: membershipId,
      isReturnUrl: this.isReturnUrl,
    });
  }

  public prefs(): OrganizationPref {
    return new OrganizationPref(this.config, this.pathElements, "prefs", {
      isReturnUrl: this.isReturnUrl,
    });
  }
}
