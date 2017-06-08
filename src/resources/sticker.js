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

export type StickerField =
  'image'
  | 'imageScaled'
  | 'imageUrl'
  | 'left'
  | 'rotate'
  | 'top'
  | 'zIndex';

type CustomStickerField = 'scaled' | 'url';

export default class Sticker extends BaseResource {
  constructor(
    auth: Auth,
    options?: ResourceConstructorOptions = {},
  ) {
    super(auth, 'sticker', options);
  }

  getStickers(
    queryArgs?: {
      fields?: ArgumentGroup<StickerField>,
    } | {
      filter?: AllOrNone,
    } = {},
  ): Promise<*> {
    return this.httpGet('/', queryArgs);
  }

  getSticker(
    queryArgs?: {
      fields?: ArgumentGroup<StickerField>,
    } | {
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
