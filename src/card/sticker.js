/* @flow */

/* Internal dependencies */
import BaseResource from '../base-resource';

/* Types */
import type {
  Auth,
  ResourceConstructorOptions,
  StickerFieldsQueryArg,
} from '../types';

export default class Sticker extends BaseResource {
  constructor(
    auth: Auth,
    options?: ResourceConstructorOptions = {},
  ) {
    super(auth, 'sticker', options);
  }

  getSticker(queryArgs?: StickerFieldsQueryArg = {}): Promise<*> {
    return this.httpGet('/', queryArgs);
  }

  getStickers(queryArgs?: StickerFieldsQueryArg): Promise<*> {
    return this.httpGet('/', queryArgs);
  }
}
