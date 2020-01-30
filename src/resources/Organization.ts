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
  AllOrFieldOrListOf,
  FileUpload,
  FilterDate,
  Format,
  PermissionLevel,
  TypedFetch,
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

export type OrganizationField =
  | "id"
  | "billableMemberCount"
  | "desc"
  | "descData"
  | "displayName"
  | "idBoards"
  | "invitations"
  | "logoHash"
  | "memberships"
  | "name"
  | "powerUps"
  | "prefs"
  | "premiumFeatures"
  | "products"
  | "url"
  | "website";

/**
 * Organizations, or as they are referred to in Trello, "Teams", represent
 * collections of members and boards.
 * @see https://developers.trello.com/reference#organizations
 * @class
 */
export class Organization extends BaseResource {
  public getOrganization(params?: {
    actionFields?: AllOrFieldOrListOf<ActionField>;
    actions?: AllOrFieldOrListOf<ActionType>;
    actionsDisplay?: boolean;
    actionsEntities?: boolean;
    actionsLimit?: number;
    boardActionFields?: AllOrFieldOrListOf<ActionField>;
    boardActions?: AllOrFieldOrListOf<ActionType>;
    boardActionsDisplay?: boolean;
    boardActionsEntities?: boolean;
    boardActionsFormat?: Format;
    boardActionsLimit?: number;
    boardActionsSince?: FilterDate;
    boardFields?: AllOrFieldOrListOf<BoardField>;
    boardLists?: AllOrFieldOrListOf<ListFilter>;
    boardPluginData?: boolean;
    boards?: BoardFilter;
    fields?: AllOrFieldOrListOf<OrganizationField>;
    memberActivity?: boolean;
    memberFields?: AllOrFieldOrListOf<MemberField>;
    members?: MemberFilter;
    memberships?: AllOrFieldOrListOf<MembershipFilter>;
    membershipsMember?: boolean;
    membershipsMemberFields?: AllOrFieldOrListOf<MemberField>;
    membersInvited?: MemberFilter;
    membersInvitedFields?: AllOrFieldOrListOf<MemberInvitedField>;
    paidAccount?: boolean;
    pluginData?: boolean;
  }): TypedFetch<OrganizationRecord> {
    const validParams = this.setValidDateParams(["boardActionsSince"], params);
    return this.apiGet("/", validParams);
  }

  public getOrganizations(params?: {
    filter?: OrganizationFilter;
    fields?: AllOrFieldOrListOf<OrganizationField>;
    paidAccount?: boolean;
  }): TypedFetch<OrganizationRecord[]> {
    return this.apiGet("/", params);
  }

  public getNestedOrganizations<TPayload extends object>(params?: {
    organizations?: OrganizationFilter;
    organizationFields?: AllOrFieldOrListOf<OrganizationField>;
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

  public getDeltas(params?: {
    ixLastUpdate?: number;
    tags?: string;
  }): TypedFetch<unknown> {
    return this.apiGet("/deltas", params);
  }

  public getPluginData(): TypedFetch<unknown> {
    return this.apiGet("/pluginData");
  }

  public getTags(): TypedFetch<unknown> {
    return this.apiGet("/tags");
  }

  public getIfTransferrableToEnterprise(): TypedFetch<unknown> {
    if (!this.isChildOf("enterprise")) {
      throw new Error(
        "You can only call getIfTransferrableToEnterprise() from an enterprise resource",
      );
    }

    const existingPathElements = [...this.pathElements];
    this.pathElements = [
      ...this.parentElements,
      "transferrable",
      "organization",
      this.identifier,
    ];
    const response = this.apiGet("/");
    this.pathElements = existingPathElements;

    return response;
  }

  public addOrganization(params: {
    displayName: string;
    desc?: string;
    name?: string;
    website?: string;
  }): TypedFetch<OrganizationRecord> {
    this.validateUrl("website", params.website);

    return this.apiPost("/", params);
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
        "You can only call transferToEnterprise() from an enterprise resource",
      );
    }

    if (this.identifier) {
      this.pathElements.pop();
    } else {
      throw new Error(
        "You must pass an organization ID to the organization resource when " +
          "calling transferToEnterprise()",
      );
    }

    return this.apiPut("/", { idOrganization: this.identifier });
  }

  public deleteOrganization(): TypedFetch<unknown> {
    return this.apiDelete("/");
  }

  public deleteLogo(): TypedFetch<unknown> {
    return this.apiDelete("/logo");
  }

  public removeFromEnterprise(): TypedFetch<unknown> {
    if (!this.isChildOf("enterprise")) {
      throw new Error(
        "You can only call removeFromEnterprise() from an enterprise resource",
      );
    }

    return this.apiDelete("/");
  }

  public actions(): Action {
    return new Action(this.config, this.pathElements, "actions");
  }

  public boards(): Board {
    return new Board(this.config, this.pathElements, "boards");
  }

  public members(memberId: string = ""): Member {
    return new Member(this.config, this.pathElements, "members", {
      identifier: memberId,
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

  public prefs(): OrganizationPref {
    return new OrganizationPref(this.config, this.pathElements, "prefs");
  }
}
