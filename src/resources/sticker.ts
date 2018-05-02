import BaseResource from './baseResource';
import { AllOrNone, ArgumentGroup } from '../types';

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
  public getStickers = (
    queryArgs?:
      | {
          // Arguments for "/stickers":
          fields?: ArgumentGroup<StickerField>;
        }
      | {
          // Arguments for "/customStickers":
          filter?: AllOrNone;
        },
  ): Promise<any> => this.httpGet('/', queryArgs);

  public getSticker = (
    queryArgs?:
      | {
          // Arguments for "/stickers":
          fields?: ArgumentGroup<StickerField>;
        }
      | {
          // Arguments for "/customStickers":
          fields?: ArgumentGroup<CustomStickerField>;
        },
  ): Promise<any> => this.httpGet('/', queryArgs);

  public updateSticker = (queryArgs?: {
    top?: number;
    left?: number;
    zIndex?: number;
    rotate?: number;
  }): Promise<any> => this.httpPut('/', queryArgs);

  public addSticker = (queryArgs: {
    image: string;
    top: number;
    left: number;
    zIndex: number;
    rotate?: number;
  }): Promise<any> => this.httpPost('/', queryArgs);

  public uploadSticker = (file: object): Promise<any> =>
    this.httpPost('/', { file });

  public deleteSticker = (): Promise<any> => this.httpDelete('/');
}
