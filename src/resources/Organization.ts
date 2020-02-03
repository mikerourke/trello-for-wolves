import { TrelloForWolvesError } from "../TrelloForWolvesError";
import { BaseResource } from "./BaseResource";
import { Action } from "./Action";
import { Board } from "./Board";
import { Member } from "./Member";
import { Membership } from "./Membership";
import { OrganizationPref } from "./OrganizationPref";
import {
  AllOrFieldOrListOf,
  BoardVisibilityFilter,
  FileUpload,
  MemberField,
  NestedActionsParams,
  NestedBoardsParams,
  NestedMembershipsParams,
  NestedMembersInvitedParams,
  NestedMembersParams,
  OrganizationField,
  OrganizationFilter,
  OrganizationRecord,
  PermissionLevel,
  TypedFetch,
  ValueResponse,
} from "../typeDefs";

/**
 * Organizations, or as they are referred to in Trello, "Teams", represent
 * collections of members and boards.
 * @see https://developers.trello.com/reference#organizations
 * @class
 */
export class Organization extends BaseResource {
  public getOrganization(
    params?: {
      boardPluginData?: boolean;
      fields?: AllOrFieldOrListOf<OrganizationField>;
      memberActivity?: boolean;
      membershipsMember?: boolean;
      membershipsMemberFields?: AllOrFieldOrListOf<MemberField>;
      paidAccount?: boolean;
      pluginData?: boolean;
    } & NestedActionsParams &
      NestedBoardsParams &
      NestedMembersParams &
      NestedMembersInvitedParams &
      NestedMembershipsParams,
  ): TypedFetch<OrganizationRecord> {
    return this.apiGet("/", params);
  }

  public getOrganizations(params?: {
    filter?: OrganizationFilter;
    fields?: AllOrFieldOrListOf<OrganizationField>;
    paidAccount?: boolean;
  }): TypedFetch<OrganizationRecord[]> {
    return this.apiGet("/", params);
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

  public getExports(): TypedFetch<unknown> {
    return this.apiGet("/exports");
  }

  public getIfTransferrableToEnterprise(): TypedFetch<unknown> {
    if (!this.isChildOf("enterprise")) {
      throw new TrelloForWolvesError(
        "You can only call getIfTransferrableToEnterprise() from an enterprise resource",
      );
    }

    this.pathElements = [
      ...this.parentElements,
      "transferrable",
      "organization",
      this.identifier,
    ];
    return this.apiGet("/");
  }

  public addOrganization(params: {
    displayName: string;
    desc?: string;
    name?: string;
    website?: string;
  }): TypedFetch<OrganizationRecord> {
    return this.apiPost("/", params);
  }

  public uploadLogo(file: FileUpload): TypedFetch<unknown> {
    return this.apiPost("/logo", { file });
  }

  public addTag(name: string): TypedFetch<unknown> {
    return this.apiPost("/tags", { name });
  }

  public startExport(params?: { attachments?: boolean }): TypedFetch<unknown> {
    return this.apiPost("/exports", params);
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
      throw new TrelloForWolvesError(
        "You can only call transferToEnterprise() from an enterprise resource",
      );
    }

    if (this.identifier) {
      this.pathElements.pop();
    } else {
      throw new TrelloForWolvesError(
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

  public deleteTag(idTag: string): TypedFetch<unknown> {
    return this.apiDelete(`/tags/${idTag}`);
  }

  public removeFromEnterprise(): TypedFetch<unknown> {
    if (!this.isChildOf("enterprise")) {
      throw new TrelloForWolvesError(
        "You can only call removeFromEnterprise() from an enterprise resource",
      );
    }

    return this.apiDelete("/");
  }

  public actions(): Action {
    return new Action(this.config, this.pathElements, "actions");
  }

  public boards(idBoard: string = ""): Board {
    return new Board(this.config, this.pathElements, "boards", {
      identifier: idBoard,
    });
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
