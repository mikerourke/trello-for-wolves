/* @flow */

/* Internal dependencies */
import {
  InvalidBooleanError,
  InvalidStringError,
} from '../errors';
import BaseResource from '../base-resource';

/* Types */
import type {
  Auth,
  CardAging,
  GroupPermission,
  Invitation,
  PermissionLevel,
  ValueQueryArg,
} from '../types';

export default class Pref extends BaseResource {
  constructor(
    auth: Auth,
    boardId: string,
  ) {
    super(auth, 'prefs', '', `boards/${boardId}`);
  }

  _updateField(
    fieldName: string,
    expectedType: string,
    queryArgs: Object,
  ): Promise<*> {
    const { value } = queryArgs;
    const helpLink = `board#put-1-boards-board-id-prefs-${fieldName}`;
    if (expectedType === 'boolean' && typeof value !== 'boolean') {
      throw new InvalidBooleanError('value', helpLink);
    }
    if (expectedType === 'string' && typeof value !== 'string') {
      throw new InvalidStringError('value', helpLink);
    }
    return this.httpPut(`/${fieldName}`, queryArgs);
  }

  updateBackground(queryArgs: ValueQueryArg<string>): Promise<*> {
    return this._updateField('background', 'string', queryArgs);
  }

  updateCalendarFeedEnabled(queryArgs: ValueQueryArg<boolean>): Promise<*> {
    return this._updateField('calendarFeedEnabled', 'string', queryArgs);
  }

  updateCardAging(queryArgs: ValueQueryArg<CardAging>): Promise<*> {
    return this._updateField('cardAging', 'string', queryArgs);
  }

  updateCardCovers(queryArgs: ValueQueryArg<boolean>): Promise<*> {
    return this._updateField('cardCovers', 'boolean', queryArgs);
  }

  updateComments(queryArgs: ValueQueryArg<GroupPermission>): Promise<*> {
    return this._updateField('comments', 'string', queryArgs);
  }

  updateInvitations(queryArgs: ValueQueryArg<Invitation>): Promise<*> {
    return this._updateField('invitations', 'string', queryArgs);
  }

  updatePermissionLevel(queryArgs: ValueQueryArg<PermissionLevel>): Promise<*> {
    return this._updateField('permissionLevel', 'string', queryArgs);
  }

  updateSelfJoin(queryArgs: ValueQueryArg<boolean>): Promise<*> {
    return this._updateField('selfJoin', 'string', queryArgs);
  }

  updateVoting(queryArgs: ValueQueryArg<GroupPermission>): Promise<*> {
    return this._updateField('voting', 'string', queryArgs);
  }
}
