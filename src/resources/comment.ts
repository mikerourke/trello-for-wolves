import BaseResource from './baseResource';
import { ActionField } from './action';
import { MemberField } from './member';
import { ArgumentGroup, FilterDate, Format } from '../types';

/**
 * @namespace Comment
 */
export default class Comment extends BaseResource {
  /**
   * This is the same as calling ...cards('cardId').actions().getActions({ filter: 'commentCard' }).
   *    It's just a nice shortcut if you only need Comment actions.
   */
  public getComments = (queryArgs?: {
    entities?: boolean;
    display?: boolean;
    fields?: ArgumentGroup<ActionField>;
    limit?: number;
    format?: Format;
    since?: FilterDate;
    before?: FilterDate;
    idModels?: string;
    member?: boolean;
    memberFields?: ArgumentGroup<MemberField>;
    memberCreator?: boolean;
    memberCreatorFields?: ArgumentGroup<MemberField>;
  }): Promise<any> =>
    this.httpGet('/', { ...queryArgs, filter: 'commentCard' });

  public updateComment = (text: string): Promise<any> =>
    this.httpPut('/comments', { text });

  public addComment = (text: string): Promise<any> =>
    this.httpPost('/comments', { text });

  public deleteComment = (): Promise<any> => this.httpDelete('/comments');
}
