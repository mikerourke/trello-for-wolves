/* @flow */

/* Internal dependencies */
import {
  InvalidBooleanError,
  InvalidStringError,
} from '../errors';
import BaseEntity from '../base-entity';

/* Types */
import type {
  Auth,
  CardAging,
  GroupPermission,
  Invitation,
  PermissionLevel,
} from '../types';

export default class Pref extends BaseEntity {
  constructor(
    auth: Auth,
    boardId: string,
  ) {
    const basePath = 'prefs';
    const parentPath = `boards/${boardId}`;
    super(auth, basePath, parentPath);
  }

  _updateField(
    fieldName: string,
    expectedType: string,
    queryArgs: {
      value: boolean | string,
    },
  ): Promise<*> {
    const { value } = queryArgs;
    const helpLink = `board#put-1-boards-board-id-prefs-${fieldName}`;
    if (typeof value !== expectedType) {
      if (expectedType === 'boolean') {
        throw new InvalidBooleanError('value', helpLink);
      } else {
        throw new InvalidStringError('value', helpLink);
      }
    }
    return this.httpPut(`/${fieldName}`, queryArgs);
  }

  updateBackground(queryArgs: {
    value: string,
  }): Promise<*> {
    return this._updateField('background', 'string', queryArgs);
  }

  updateCalendarFeedEnabled(queryArgs: {
    value: boolean,
  }): Promise<*> {
    return this._updateField('calendarFeedEnabled', 'string', queryArgs);
  }

  updateCardAging(queryArgs: {
    value: CardAging,
  }): Promise<*> {
    return this._updateField('cardAging', 'string', queryArgs);
  }

  updateCardCovers(queryArgs: {
    value: boolean,
  }): Promise<*> {
    return this._updateField('cardCovers', 'string', queryArgs);
  }

  updateComments(queryArgs: {
    value: GroupPermission,
  }): Promise<*> {
    return this._updateField('comments', 'string', queryArgs);
  }

  updateInvitations(queryArgs: {
    value: Invitation,
  }): Promise<*> {
    return this._updateField('invitations', 'string', queryArgs);
  }

  updatePermissionLevel(queryArgs: {
    value: PermissionLevel,
  }): Promise<*> {
    return this._updateField('permissionLevel', 'string', queryArgs);
  }

  updateSelfJoin(queryArgs: {
    value: boolean,
  }): Promise<*> {
    return this._updateField('selfJoin', 'string', queryArgs);
  }

  updateVoting(queryArgs: {
    value: GroupPermission,
  }): Promise<*> {
    return this._updateField('voting', 'string', queryArgs);
  }
}
