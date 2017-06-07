/* @flow */

/* Internal dependencies */
import BaseResource from './base-resource';

/* Types */
import type {
  ArgumentGroup,
  Auth,
  ResourceConstructorOptions,
} from '../types';

export type AttachmentFilter = boolean | 'cover';

export type AttachmentField =
  'bytes'
  | 'date'
  | 'edgeColor'
  | 'idMember'
  | 'isUpload'
  | 'mimeType'
  | 'name'
  | 'previews'
  | 'url';

export default class Attachment extends BaseResource {
  constructor(
    auth: Auth,
    options?: ResourceConstructorOptions = {},
  ) {
    super(auth, 'attachments', options);
  }

  getAttachment(
    queryArgs?: {
      fields?: ArgumentGroup<AttachmentField>,
    } = {},
  ): Promise<*> {
    return this.httpGet('/', queryArgs);
  }

  getAttachments(
    queryArgs?: {
      fields?: ArgumentGroup<AttachmentField>,
      filter?: ArgumentGroup<AttachmentFilter>,
    } = {},
  ): Promise<*> {
    return this.httpGet('/', queryArgs);
  }

  // TODO: Make sure this works for a file.
  addAttachment(
    file?: Object,
    queryArgs?: {
      url?: string,
      name?: string,
      mimeType?: string,
    } = {},
  ): Promise<*> {
    return this.httpPost('/', queryArgs, file);
  }

  deleteAttachment(): Promise<*> {
    return this.httpDelete('/');
  }
}
