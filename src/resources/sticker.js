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
    isCustom: boolean,
    options?: ResourceConstructorOptions = {},
  ) {
    const resourceName = isCustom ? 'customSticker' : 'sticker';
    super(auth, resourceName, options);
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

  getStickers(
    queryArgs?: {
      fields?: ArgumentGroup<StickerField>,
    } | {
      filter?: AllOrNone,
    } = {},
  ): Promise<*> {
    return this.httpGet('/', queryArgs);
  }

  addSticker(file: Object): Promise<*> {
    return this.httpPost('/', {}, file);
  }

  deleteSticker(): Promise<*> {
    return this.httpDelete('/');
  }
}
