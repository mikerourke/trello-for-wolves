/* @flow */

/* Internal dependencies */
import BaseResource from '../base-resource';

/* Types */
import type {
  ActionField,
  ActionInclusionQueryArgs,
  ActionType,
  ArgumentGroup,
  Auth,
  BoardInclusionQueryArgs,
  BoardVisibilityFilter,
  DeltasQueryArgs,
  FieldsQueryArg,
  FileQueryArg,
  FilterDate,
  Format,
  ListFilter,
  MemberInclusionQueryArgs,
  MembershipFilter,
  MembershipsMemberInclusionQueryArgs,
  MembersInvitedInclusionQueryArgs,
  OrganizationField,
  PermissionLevel,
  ResourceConstructorOptions,
  ValueQueryArg,
} from '../types';

type SharedUpdateQueryArgs = {
  name?: string,
  displayName?: string,
  desc?: string,
  website?: ?string,
};

export default class Organization extends BaseResource {
  constructor(
    auth: Auth,
    options?: ResourceConstructorOptions = {},
  ) {
    super(auth, 'organization', options);
  }

  getOrganization(
    queryArgs?: ActionInclusionQueryArgs &
      BoardInclusionQueryArgs &
      MemberInclusionQueryArgs &
      MembershipsMemberInclusionQueryArgs &
      MembersInvitedInclusionQueryArgs &
      FieldsQueryArg<OrganizationField> &
      {
        actionsDisplay?: boolean,
        actionsEntities?: boolean,
        actionsLimit?: number,
        memberActivity?: boolean,
        memberships?: ArgumentGroup<MembershipFilter>,
        boardActions?: ArgumentGroup<ActionType>,
        boardActionsDisplay?: boolean,
        boardActionsFormat?: Format,
        boardActionsSince?: FilterDate,
        boardActionsLimit?: number,
        boardActionFields?: ArgumentGroup<ActionField>,
        boardLists?: ArgumentGroup<ListFilter>,
        boardPluginData?: boolean,
        paidAccount?: boolean,
      }= {},
  ): Promise<*> {
    return this.httpGet('/', queryArgs);
  }

  getOrganizations(
    queryArgs?: FieldsQueryArg<OrganizationField> &
      {
        limit?: number,
      } = {},
  ): Promise<*> {
    return this.httpGet('/', queryArgs);
  }

  getFieldValue(field: OrganizationField): Promise<*> {
    return this.httpGet(`/${field}`);
  }

  getDeltas(queryArgs: DeltasQueryArgs): Promise<*> {
    return this.httpGet('/deltas', queryArgs);
  }

  getPluginData(): Promise<*> {
    return this.httpGet('/pluginData');
  }

  getTags(): Promise<*> {
    return this.httpGet('/tags');
  }

  updateOrganization(
    queryArgs?: SharedUpdateQueryArgs &
      {
        prefs?: {
          associatedDomain?: string,
          externalMembersDisabled?: boolean,
          googleAppsVersion?: number,
          orgInviteRestrict?: string,
          permissionLevel?: PermissionLevel,
          'boardVisibilityRestrict/org'?: BoardVisibilityFilter,
          'boardVisibilityRestrict/private'?: BoardVisibilityFilter,
          'boardVisibilityRestrict/public'?: BoardVisibilityFilter,
        },
        separator?: string,
      } = {},
  ): Promise<*> {
    return this.httpPut('/', queryArgs);
  }

  updateDescription(queryArgs: ValueQueryArg<string>): Promise<*> {
    return this.httpPut('/desc', queryArgs);
  }

  updateDisplayName(queryArgs: ValueQueryArg<string>): Promise<*> {
    return this.httpPut('/displayName', queryArgs);
  }

  updateName(queryArgs: ValueQueryArg<string>): Promise<*> {
    return this.httpPut('/name', queryArgs);
  }

  updateWebsite(queryArgs: ValueQueryArg<?string>): Promise<*> {
    return this.httpPut('/website', queryArgs);
  }

  createOrganization(queryArgs: SharedUpdateQueryArgs): Promise<*> {
    return this.httpPost('/', queryArgs);
  }

  addLogo(queryArgs: FileQueryArg): Promise<*> {
    return this.httpPost('/logo', queryArgs);
  }

  addTags(queryArgs: ValueQueryArg<string>): Promise<*> {
    return this.httpPost('/tags', queryArgs);
  }

  deleteOrganization(): Promise<*> {
    return this.httpDelete('/');
  }

  deleteLogo(): Promise<*> {
    return this.httpDelete('/logo');
  }
}
