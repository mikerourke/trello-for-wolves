/* @flow */

/* Internal dependencies */
import BaseResource from '../base-resource';

/* Types */
import type {
  AttachmentField,
  AttachmentFilter,
  Auth,
  FieldsQueryArg,
  FilterQueryArg,
  ResourceConstructorOptions,
} from '../types';

export default class Attachment extends BaseResource {
  constructor(
    auth: Auth,
    options?: ResourceConstructorOptions = {},
  ) {
    super(auth, 'attachments', options);
  }

  getAttachment(
    queryArgs?: FieldsQueryArg<AttachmentField> = {},
  ): Promise<*> {
    return this.httpGet('/', queryArgs);
  }

  getAttachments(
    queryArgs?: FieldsQueryArg<AttachmentField> &
      FilterQueryArg<AttachmentFilter> = {},
  ): Promise<*> {
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
