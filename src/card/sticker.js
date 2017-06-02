/* @flow */

/* Internal dependencies */
import BaseResource from '../base-resource';

/* Types */
import type {
  Auth,
  StickerFieldsQueryArg,
} from '../types';

export default class Sticker extends BaseResource {
  constructor(
    auth: Auth,
    stickerId: string,
    parentPath?: string,
  ) {
    super(auth, 'sticker', stickerId, parentPath);
  }

  getSticker(queryArgs?: StickerFieldsQueryArg): Promise<*> {
    const idSticker = this.instanceId;
    const updatedArgs = { idSticker, ...queryArgs };
    return this.httpGet(`/${idSticker}`, updatedArgs);
  }

  getStickers(queryArgs?: StickerFieldsQueryArg): Promise<*> {
    return this.httpGet('/', queryArgs);
  }
}
