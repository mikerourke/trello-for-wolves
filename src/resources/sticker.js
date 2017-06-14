/* @flow */

/* Internal dependencies */
import BaseResource from './base-resource';

/* Types */
import type {
  AllOrNone,
  ArgumentGroup,
} from '../types';

export type StickerField =
  'image'
  | 'imageScaled'
  | 'imageUrl'
  | 'left'
  | 'rotate'
  | 'top'
  | 'zIndex';

type CustomStickerField = 'scaled' | 'url';

/**
 * @namespace Sticker
 */
export default class Sticker extends BaseResource {
  getStickers(
    queryArgs?: {
      // Arguments for "/stickers":
      fields?: ArgumentGroup<StickerField>,
    } | {
      // Arguments for "/customStickers":
      filter?: AllOrNone,
    } = {},
  ): Promise<*> {
    return this.httpGet('/', queryArgs);
  }

  getSticker(
    queryArgs?: {
      // Arguments for "/stickers":
      fields?: ArgumentGroup<StickerField>,
    } | {
      // Arguments for "/customStickers":
      fields?: ArgumentGroup<CustomStickerField>,
    } = {},
  ): Promise<*> {
    return this.httpGet('/', queryArgs);
  }

  updateSticker(
    queryArgs?: {
      top?: number,
      left?: number,
      zIndex?: number,
      rotate?: number,
    } = {},
  ): Promise<*> {
    return this.httpPut('/', queryArgs);
  }

  addSticker(
    queryArgs: {
      image: string,
      top: number,
      left: number,
      zIndex: number,
      rotate?: number,
    },
  ): Promise<*> {
    return this.httpPost('/', queryArgs);
  }

  uploadSticker(file: Object): Promise<*> {
    return this.httpPost('/', {}, file);
  }

  deleteSticker(): Promise<*> {
    return this.httpDelete('/');
  }
}
