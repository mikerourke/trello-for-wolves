/* @flow */

/* Internal dependencies */
import BaseResource from '../base-resource';

/* Types */
import type {
  AttachmentField,
  AttachmentFilter,
  Auth,
  FieldsQueryArg,
  ResourceConstructorOptions,
} from '../types';

type AttachmentFieldsQueryArg = FieldsQueryArg<AttachmentField>;

export default class Attachment extends BaseResource {
  constructor(
    auth: Auth,
    options?: ResourceConstructorOptions = {},
  ) {
    super(auth, 'attachments', options);
  }

  getAttachment(queryArgs?: AttachmentFieldsQueryArg): Promise<*> {
    const idAttachment = this.instanceId;
    const updatedArgs = { idAttachment, ...queryArgs };
    return this.httpGet(`/${idAttachment}`, updatedArgs);
  }

  getAttachments(queryArgs?: AttachmentFieldsQueryArg & {
    filter?: AttachmentFilter,
  } = {}): Promise<*> {
    return this.httpGet('/', queryArgs);
  }

  // TODO: Make sure this works for a file.
  addAttachment(
    queryArgs?: {
      url?: string,
      name?: string,
      mimeType?: string,
    } = {},
    file?: Object,
  ): Promise<*> {
    return this.httpPost('/', queryArgs, file);
  }

  deleteAttachment(): Promise<*> {
    return this.httpDelete('/');
  }
}
