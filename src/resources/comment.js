/* @flow */

/* Internal dependencies */
import BaseResource from './base-resource';

/* Types */
import type {
  Auth,
  ResourceConstructorOptions,
} from '../types';

/**
 * @namespace Comment
 */
export default class Comment extends BaseResource {
  constructor(
    auth: Auth,
    options?: ResourceConstructorOptions = {},
  ) {
    super(auth, 'comment', options);
    this.resourcePath = `/actions/${this.instanceId}/comments`;
  }

  updateComment(text: string): Promise<*> {
    return this.httpPut('/', { text });
  }

  addComment(text: string): Promise<*> {
    this.resourcePath = `/actions/comments`;
    return this.httpPost('/', { text });
  }

  deleteComment(): Promise<*> {
    return this.httpDelete('/');
  }
}
