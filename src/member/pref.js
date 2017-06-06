/* @flow */

/* Internal dependencies */
import {
  InvalidBooleanError,
  InvalidNumberError,
} from '../utils/errors';
import BaseResource from '../base-resource';

/* Types */
import type { Auth } from '../types';

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
    value: boolean | number,
  ): Promise<*> {
    const helpLink =
      `member#put-1-members-idmember-or-username-prefs-${fieldName}`;
    if (expectedType === 'boolean' && typeof value !== 'boolean') {
      throw new InvalidBooleanError('value', helpLink);
    }
    if (expectedType === 'number' && typeof value !== 'number') {
      throw new InvalidNumberError('value', helpLink);
    }
    return this.httpPut(`/${fieldName}`, { value });
  }

  updateColorBlind(value: boolean): Promise<*> {
    return this._updateField('colorBlind', 'boolean', value);
  }

  updateLocale(value: number): Promise<*> {
    return this._updateField('locale', 'number', value);
  }

  updateMinutesBetweenSummaries(value: number): Promise<*> {
    return this._updateField('minutesBetweenSummaries', 'number', value);
  }
}
