/* @flow */

/* Internal dependencies */
import {
  InvalidBooleanError,
  InvalidNumberError,
  InvalidStringError,
} from '../utils/errors';
import BaseResource from '../base-resource';

/* Types */
import type {
  Auth,
  BoardVisibilityFilter,
  PermissionLevel,
  ValueQueryArg,
} from '../types';

export default class Pref extends BaseResource {
  constructor(
    auth: Auth,
    organizationId: string,
  ) {
    super(auth, 'prefs', { parentPath: `organizations/${organizationId}` });
  }

  _updateField(
    fieldName: string,
    expectedType: string,
    queryArgs: Object,
  ): Promise<*> {
    const { value } = queryArgs;
    const helpField = fieldName.toLowerCase().replace('/', '');
    const helpLink =
      `organization#put-1-organizations-idorg-or-name-prefs-${helpField}`;
    if (expectedType === 'boolean' && typeof value !== 'boolean') {
      throw new InvalidBooleanError('value', helpLink);
    }
    if (expectedType === 'number' && typeof value !== 'number') {
      throw new InvalidNumberError('value', helpLink);
    }
    if (expectedType === 'string' && typeof value !== 'string') {
      throw new InvalidStringError('value', helpLink);
    }
    return this.httpPut(`/${fieldName}`, queryArgs);
  }

  updateAssociatedDomain(queryArgs: ValueQueryArg<string>): Promise<*> {
    return this._updateField('associatedDomain', 'string', queryArgs);
  }

  updateBoardVisibilityRestriction(
    boardLevel: 'org' | 'private' | 'public',
    queryArgs: ValueQueryArg<BoardVisibilityFilter>
  ): Promise<*> {
    return this._updateField(
      `boardVisibilityRestrict/${boardLevel}`, 'string', queryArgs);
  }

  updateExternalMembersDisabledStatus(
    queryArgs: ValueQueryArg<boolean>
  ): Promise<*> {
    return this._updateField('externalMembersDisabled', 'boolean', queryArgs);
  }

  updateGoogleAppsVersion(queryArgs: ValueQueryArg<number>): Promise<*> {
    return this._updateField('googleAppsVersion', 'number', queryArgs);
  }

  updateOrgInviteRestriction(queryArgs: ValueQueryArg<string>): Promise<*> {
    return this._updateField('orgInviteRestrict', 'string', queryArgs);
  }

  updatePermissionLevel(queryArgs: ValueQueryArg<PermissionLevel>): Promise<*> {
    return this._updateField('permissionLevel', 'string', queryArgs);
  }

  deleteAssociatedDomain(): Promise<*> {
    return this.httpDelete('/associatedDomain');
  }

  deleteOrgInviteRestriction(queryArgs: ValueQueryArg<string>): Promise<*> {
    return this.httpDelete('/orgInviteRestrict', queryArgs);
  }
}
