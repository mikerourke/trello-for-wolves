/* @flow */

/* Internal dependencies */
import BaseResource from './base-resource';

/* Types */
import type {
  AllOrNone,
  ArgumentGroup,
  Auth,
  ResourceConstructorOptions,
} from '../types';

export type CustomEmojiField = 'name' | 'url';

export default class CustomEmoji extends BaseResource {
  constructor(
    auth: Auth,
    options?: ResourceConstructorOptions = {},
  ) {
    super(auth, 'customEmoji', options);
  }

  getCustomEmoji(
    queryArgs?: {
      fields?: ArgumentGroup<CustomEmojiField>,
    } = {},
  ): Promise<*> {
    return this.httpGet('/', queryArgs);
  }

  getCustomEmojis(
    queryArgs?: {
      filter?: AllOrNone,
    } = {},
  ): Promise<*> {
    return this.httpGet('/', queryArgs);
  }

  addCustomEmoji(
    file: Object,
    name: string,
  ): Promise<*> {
    return this.httpPost('/', { name }, file);
  }
}
