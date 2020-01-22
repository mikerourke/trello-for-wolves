// @flow
import BaseResource from './BaseResource';
import type {
  ActionField,
  ArgumentGroup,
  FilterDate,
  Format,
  MemberField,
} from '../typeDefs';

/**
 * @namespace Comment
 */
export default class Comment extends BaseResource {
  /**
   * This is the same as calling ...cards('cardId').actions().getActions({ filter: 'commentCard' }).
   *    It's just a nice shortcut if you only need Comment actions.
   */
  getComments(
    queryArgs?: {
      entities?: boolean,
      display?: boolean,
      fields?: ArgumentGroup<ActionField>,
      limit?: number,
      format?: Format,
      since?: FilterDate,
      before?: FilterDate,
      idModels?: string,
      member?: boolean,
      memberFields?: ArgumentGroup<MemberField>,
      memberCreator?: boolean,
      memberCreatorFields?: ArgumentGroup<MemberField>,
    },
  ): Promise<any> {
    return this.httpGet('/', { ...queryArgs, filter: 'commentCard' });
  }

  updateComment(text: string): Promise<any> {
    return this.httpPut('/comments', { text });
  }

  addComment(text: string): Promise<any> {
    return this.httpPost('/comments', { text });
  }

  deleteComment(): Promise<any> {
    return this.httpDelete('/comments');
  }
}
