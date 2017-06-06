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
    super(auth, 'myPref', { parentPath: `boards/${boardId}` });
  }

  _updateField(
    fieldName: string,
    expectedType: string,
    value: string | boolean,
  ): Promise<*> {
    const helpLink = `board#put-1-boards-board-id-myprefs-${fieldName}`;
    if (expectedType === 'boolean' && typeof value !== 'boolean') {
      throw new InvalidBooleanError('value', helpLink);
    }
    if (expectedType === 'string' && typeof value !== 'string') {
      throw new InvalidStringError('value', helpLink);
    }
    return this.httpPut(`/${fieldName}`, { value });
  }

  getMyPrefs(): Promise<*> {
    return this.httpGet('/');
  }

  updateEmailPosition(value: Position): Promise<*> {
    return this._updateField('emailPosition', 'string', value);
  }

  updateIdEmailList(value: string): Promise<*> {
    return this._updateField('idEmailList', 'string', value);
  }

  updateShowListGuide(value: boolean): Promise<*> {
    return this._updateField('showListGuide', 'boolean', value);
  }

  updateShowSidebar(value: boolean): Promise<*> {
    return this._updateField('showSidebar', 'boolean', value);
  }

  updateShowSidebarActivity(value: boolean): Promise<*> {
    return this._updateField('showSidebarActivity', 'boolean', value);
  }

  updateShowSidebarBoardActions(value: boolean): Promise<*> {
    return this._updateField('showSidebarBoardActions', 'boolean', value);
  }

  updateShowSidebarMembers(value: boolean): Promise<*> {
    return this._updateField('showSidebarMembers', 'boolean', value);
  }
}
