// @flow
import BaseResource from './baseResource';
import type { AllOrNone, ArgumentGroup } from '../types';

export type StickerField =
  | 'image'
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
    queryArgs?:
      | {
          // Arguments for "/stickers":
          fields?: ArgumentGroup<StickerField>,
        }
      | {
          // Arguments for "/customStickers":
          filter?: AllOrNone,
        },
  ): Promise<any> {
    return this.httpGet('/', queryArgs);
  }

  getSticker(
    queryArgs?:
      | {
          // Arguments for "/stickers":
          fields?: ArgumentGroup<StickerField>,
        }
      | {
          // Arguments for "/customStickers":
          fields?: ArgumentGroup<CustomStickerField>,
        },
  ): Promise<any> {
    return this.httpGet('/', queryArgs);
  }

  updateSticker(queryArgs?: {
    top?: number,
    left?: number,
    zIndex?: number,
    rotate?: number,
  }): Promise<any> {
    return this.httpPut('/', queryArgs);
  }

  addSticker(queryArgs: {
    image: string,
    top: number,
    left: number,
    zIndex: number,
    rotate?: number,
  }): Promise<any> {
    return this.httpPost('/', queryArgs);
  }

  uploadSticker(file: Object): Promise<any> {
    return this.httpPost('/', { file });
  }

  deleteSticker(): Promise<any> {
    return this.httpDelete('/');
  }
}
