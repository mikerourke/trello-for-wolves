/* @flow */

import BaseEntity from '../base-entity';

/* Types */
import type {
  ArgumentGroup,
  AttachmentField,
  AttachmentFilter,
  Auth,
} from '../types';

/**
 * Class representing an Attachment entity.
 * @extends BaseEntity
 */
export default class Attachment extends BaseEntity {
  constructor(
    auth: Auth,
    attachmentId: string,
    parentType?: string,
    parentId?: string,
  ) {
    super(auth, 'attachments', attachmentId, parentType, parentId);
  }

  getAttachment(queryArgs?: {
    fields?: ArgumentGroup<AttachmentField>,
  } = {}): Promise<*> {
    const idAttachment = this.entityId;
    const updatedArgs = { idAttachment, ...queryArgs };
    return this.httpGet(`/${idAttachment}`, updatedArgs);
  }

  getAttachments(queryArgs?: {
    fields?: ArgumentGroup<AttachmentField>,
    filter?: AttachmentFilter,
  } = {}): Promise<*> {
    return this.httpGet('/', queryArgs);
  }

  // TODO: Make sure this works for a file.
  addAttachment(
    queryArgs?: {
      url?: string,
      name?: string,
      mimeType: string,
    } = {},
    file?: Object,
  ): Promise<*> {
    return this.httpPost('/', queryArgs, '', file);
  }

  deleteAttachment(): Promise<*> {
    return this.httpDelete('/');
  }
}
