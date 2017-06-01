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
  Position,
  ValueQueryArg,
} from '../types';

export default class MyPref extends BaseResource {
  constructor(
    auth: Auth,
    boardId: string,
  ) {
    super(auth, 'myPrefs', '', `boards/${boardId}`);
  }

  _updateField(
    fieldName: string,
    expectedType: string,
    queryArgs: Object,
  ): Promise<*> {
    const { value } = queryArgs;
    const helpLink = `board#put-1-boards-board-id-myprefs-${fieldName}`;
    if (expectedType === 'boolean' && typeof value !== 'boolean') {
      throw new InvalidBooleanError('value', helpLink);
    }
    if (expectedType === 'string' && typeof value !== 'string') {
      throw new InvalidStringError('value', helpLink);
    }
    return this.httpPut(`/${fieldName}`, queryArgs);
  }

  getMyPrefs(): Promise<*> {
    return this.httpGet('/');
  }

  updateEmailPosition(queryArgs: ValueQueryArg<Position>): Promise<*> {
    return this._updateField('emailPosition', 'string', queryArgs);
  }

  updateIdEmailList(queryArgs: ValueQueryArg<string>): Promise<*> {
    return this._updateField('idEmailList', 'string', queryArgs);
  }

  updateShowListGuide(queryArgs: ValueQueryArg<boolean>): Promise<*> {
    return this._updateField('showListGuide', 'boolean', queryArgs);
  }

  updateShowSidebar(queryArgs: ValueQueryArg<boolean>): Promise<*> {
    return this._updateField('showSidebar', 'boolean', queryArgs);
  }

  updateShowSidebarActivity(queryArgs: ValueQueryArg<boolean>): Promise<*> {
    return this._updateField('showSidebarActivity', 'boolean', queryArgs);
  }

  updateShowSidebarBoardActions(queryArgs: ValueQueryArg<boolean>): Promise<*> {
    return this._updateField('showSidebarBoardActions', 'boolean', queryArgs);
  }

  updateShowSidebarMembers(queryArgs: ValueQueryArg<boolean>): Promise<*> {
    return this._updateField('showSidebarMembers', 'boolean', queryArgs);
  }
}
