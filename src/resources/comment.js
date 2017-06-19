/* @flow */

/* Internal dependencies */
import BaseResource from './base-resource';

/* Types */
import type {
  ActionField,
  ArgumentGroup,
  FilterDate,
  Format,
  MemberField,
} from '../types';

/**
 * @namespace Comment
 */
export default class Comment extends BaseResource {
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
    } = {},
  ): Promise<*> {
    return this.httpGet('/', { ...queryArgs, filter: 'commentCard' });
  }

  updateComment(text: string): Promise<*> {
    return this.httpPut('/comments', { text });
  }

  addComment(text: string): Promise<*> {
    return this.httpPost('/comments', { text });
  }

  deleteComment(): Promise<*> {
    return this.httpDelete('/comments');
  }
}
