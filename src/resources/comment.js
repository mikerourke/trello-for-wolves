/* @flow */

/* Internal dependencies */
import BaseResource from './base-resource';

/**
 * @namespace Comment
 */
export default class Comment extends BaseResource {
  updateComment(text: string): Promise<*> {
    return this.httpPut('/', { text });
  }

  addComment(text: string): Promise<*> {
    this.routePath = `${this.routePath}/actions/comments`;
    return this.httpPost('/', { text });
  }

  deleteComment(): Promise<*> {
    return this.httpDelete('/');
  }
}
