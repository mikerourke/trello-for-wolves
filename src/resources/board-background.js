/* @flow */

/* Internal dependencies */
import BaseResource from './base-resource';

/* Types */
import type {
  AllOrNone,
  ArgumentGroup,
  Auth,
} from '../types';

export type BoardBackgroundBrightness =
  'dark'
  | 'light'
  | 'unknown';

export type BoardBackgroundFilter =
  'custom'
  | 'default'
  | 'none'
  | 'premium';

export type BoardBackgroundField =
  'brightness'
  | 'fullSizeUrl'
  | 'scaled'
  | 'tile';

export default class BoardBackground extends BaseResource {
  constructor(
    auth: Auth,
    memberId: string,
    isCustom: boolean,
    instanceId?: string = '',
  ) {
    const resourceName = isCustom ? 'customBoardBackground' : 'boardBackground';
    super(auth, resourceName, {
      instanceId,
      parentPath: `members/${memberId}`,
    });
  }

  getBoardBackground(
    // Regular board backgrounds use the first argument, custom board
    // backgrounds use the "AllOrNone" argument.
    queryArgs?: {
      fields?: ArgumentGroup<BoardBackgroundField>,
    } | {
      fields?: AllOrNone,
    }
  ): Promise<*> {
    return this.httpGet('/', queryArgs);
  }

  getBoardBackgrounds(
    queryArgs?: {
      filter?: ArgumentGroup<BoardBackgroundFilter>,
    } = {},
  ): Promise<*> {
    return this.httpGet('/', queryArgs);
  }

  updateBoardBackground(
    queryArgs?: {
      tile?: boolean,
      brightness?: BoardBackgroundBrightness,
    } = {},
  ): Promise<*> {
    return this.httpPut('/', queryArgs);
  }

  addBoardBackground(file: Object): Promise<*> {
    return this.httpPost('/', {}, file);
  }

  deleteBoardBackground(): Promise<*> {
    return this.httpDelete('/');
  }
}
