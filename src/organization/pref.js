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
    value: boolean | number | string,
  ): Promise<*> {
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

  updateAssociatedDomain(value: string): Promise<*> {
    return this._updateField('associatedDomain', 'string', { value });
  }

  updateBoardVisibilityRestriction(
    boardLevel: 'org' | 'private' | 'public',
    value: BoardVisibilityFilter
  ): Promise<*> {
    return this._updateField(
      `boardVisibilityRestrict/${boardLevel}`, 'string', { value });
  }

  updateExternalMembersDisabledStatus(value: boolean): Promise<*> {
    return this._updateField('externalMembersDisabled', 'boolean', { value });
  }

  updateGoogleAppsVersion(value: number): Promise<*> {
    return this._updateField('googleAppsVersion', 'number', { value });
  }

  updateOrgInviteRestriction(value: string): Promise<*> {
    return this._updateField('orgInviteRestrict', 'string', { value });
  }

  updatePermissionLevel(value: PermissionLevel): Promise<*> {
    return this._updateField('permissionLevel', 'string', { value });
  }

  deleteAssociatedDomain(): Promise<*> {
    return this.httpDelete('/associatedDomain');
  }

  deleteOrgInviteRestriction(value: string): Promise<*> {
    return this.httpDelete('/orgInviteRestrict', queryArgs);
  }
}
