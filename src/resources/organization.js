/* @flow */

/* Internal dependencies */
import BaseResource from '../base-resource';

/* Types */
import type {
  ActionField,
  ActionInclusionQueryArgs,
  ActionFilter,
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
} from '../types';

export type BoardVisibilityFilter =
  'admin'
  | 'none'
  | 'org';

export type OrganizationField =
  'billableMemberCount'
  | 'desc'
  | 'descData'
  | 'displayName'
  | 'idBoards'
  | 'invitations'
  | 'invited'
  | 'logoHash'
  | 'memberships'
  | 'name'
  | 'powerUps'
  | 'prefs'
  | 'premiumFeatures'
  | 'products'
  | 'url'
  | 'website';

export type OrganizationFilter =
  'all'
  | 'members'
  | 'none'
  | 'public';

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
        boardActions?: ArgumentGroup<ActionFilter>,
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

  updateDescription(value: string): Promise<*> {
    return this.httpPut('/desc', { value });
  }

  updateDisplayName(value: string): Promise<*> {
    return this.httpPut('/displayName', { value });
  }

  updateName(value: string): Promise<*> {
    return this.httpPut('/name', { value });
  }

  updateWebsite(value: ?string): Promise<*> {
    return this.httpPut('/website', { value });
  }

  addOrganization(queryArgs: SharedUpdateQueryArgs): Promise<*> {
    return this.httpPost('/', queryArgs);
  }

  addLogo(queryArgs: FileQueryArg): Promise<*> {
    return this.httpPost('/logo', queryArgs);
  }

  addTags(value: string): Promise<*> {
    return this.httpPost('/tags', { value });
  }

  deleteOrganization(): Promise<*> {
    return this.httpDelete('/');
  }

  deleteLogo(): Promise<*> {
    return this.httpDelete('/logo');
  }
}
