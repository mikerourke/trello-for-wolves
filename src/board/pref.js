/* @flow */

/* Internal dependencies */
import {
  InvalidBooleanError,
  InvalidStringError,
} from '../utils/errors';
import BaseResource from '../base-resource';

/* Types */
import type {
  Auth,
  CardAging,
  GroupPermission,
  Invitation,
  PermissionLevel,
} from '../types';

export default class Pref extends BaseResource {
  constructor(
    auth: Auth,
    boardId: string,
  ) {
    super(auth, 'pref', { parentPath: `boards/${boardId}` });
  }

  _updateField(
    fieldName: string,
    expectedType: string,
    value: boolean | string,
  ): Promise<*> {
    const helpLink = `board#put-1-boards-board-id-prefs-${fieldName}`;
    if (expectedType === 'boolean' && typeof value !== 'boolean') {
      throw new InvalidBooleanError('value', helpLink);
    }
    if (expectedType === 'string' && typeof value !== 'string') {
      throw new InvalidStringError('value', helpLink);
    }
    return this.httpPut(`/${fieldName}`, { value });
  }

  updateBackground(value: string): Promise<*> {
    return this._updateField('background', 'string', value);
  }

  updateCalendarFeedEnabled(value: boolean): Promise<*> {
    return this._updateField('calendarFeedEnabled', 'string', value);
  }

  updateCardAging(value: CardAging): Promise<*> {
    return this._updateField('cardAging', 'string', value);
  }

  updateCardCovers(value: boolean): Promise<*> {
    return this._updateField('cardCovers', 'boolean', value);
  }

  updateComments(value: GroupPermission): Promise<*> {
    return this._updateField('comments', 'string', value);
  }

  updateInvitations(value: Invitation): Promise<*> {
    return this._updateField('invitations', 'string', value);
  }

  updatePermissionLevel(value: PermissionLevel | 'org'): Promise<*> {
    return this._updateField('permissionLevel', 'string', value);
  }

  updateSelfJoin(value: boolean): Promise<*> {
    return this._updateField('selfJoin', 'string', value);
  }

  updateVoting(value: GroupPermission): Promise<*> {
    return this._updateField('voting', 'string', value);
  }
}
