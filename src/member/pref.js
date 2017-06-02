/* @flow */

/* Internal dependencies */
import {
  InvalidBooleanError,
  InvalidNumberError,
} from '../utils/errors';
import BaseResource from '../base-resource';

/* Types */
import type {
  Auth,
  ValueQueryArg,
} from '../types';

export default class Pref extends BaseResource {
  constructor(
    auth: Auth,
    memberId: string,
  ) {
    super(auth, 'prefs', { parentPath: `members/${memberId}` });
  }

  _updateField(
    fieldName: string,
    expectedType: string,
    queryArgs: Object,
  ): Promise<*> {
    const { value } = queryArgs;
    const helpLink =
      `member#put-1-members-idmember-or-username-prefs-${fieldName}`;
    if (expectedType === 'boolean' && typeof value !== 'boolean') {
      throw new InvalidBooleanError('value', helpLink);
    }
    if (expectedType === 'number' && typeof value !== 'number') {
      throw new InvalidNumberError('value', helpLink);
    }
    return this.httpPut(`/${fieldName}`, queryArgs);
  }

  updateColorBlind(queryArgs: ValueQueryArg<boolean>): Promise<*> {
    return this._updateField('colorBlind', 'boolean', queryArgs);
  }

  updateLocale(queryArgs: ValueQueryArg<number>): Promise<*> {
    return this._updateField('locale', 'number', queryArgs);
  }

  updateMinutesBetweenSummaries(queryArgs: ValueQueryArg<number>): Promise<*> {
    return this._updateField('minutesBetweenSummaries', 'number', queryArgs);
  }
}
