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
  Position,
} from '../types';

export default class MyPref extends BaseEntity {
  constructor(
    auth: Auth,
    boardId: string,
  ) {
    const basePath = 'myPrefs';
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
    const helpLink = `board#put-1-boards-board-id-myprefs-${fieldName}`;
    if (typeof value !== expectedType) {
      if (expectedType === 'boolean') {
        throw new InvalidBooleanError('value', helpLink);
      } else {
        throw new InvalidStringError('value', helpLink);
      }
    }
    return this.httpPut(`/${fieldName}`, queryArgs);
  }

  getMyPrefs(): Promise<*> {
    return this.httpGet('/');
  }

  updateEmailPosition(queryArgs: {
    value: Position,
  }): Promise<*> {
    return this._updateField('emailPosition', 'string', queryArgs);
  }

  updateIdEmailList(queryArgs: {
    value: string,
  }): Promise<*> {
    return this._updateField('idEmailList', 'string', queryArgs);
  }

  updateShowListGuide(queryArgs: {
    value: boolean,
  }): Promise<*> {
    return this._updateField('showListGuide', 'boolean', queryArgs);
  }

  updateShowSidebar(queryArgs: {
    value: boolean,
  }): Promise<*> {
    return this._updateField('showSidebar', 'boolean', queryArgs);
  }

  updateShowSidebarActivity(queryArgs: {
    value: boolean,
  }): Promise<*> {
    return this._updateField('showSidebarActivity', 'boolean', queryArgs);
  }

  updateShowSidebarBoardActions(queryArgs: {
    value: boolean,
  }): Promise<*> {
    return this._updateField('showSidebarBoardActions', 'boolean', queryArgs);
  }

  updateShowSidebarMembers(queryArgs: {
    value: boolean,
  }): Promise<*> {
    return this._updateField('showSidebarMembers', 'boolean', queryArgs);
  }
}
