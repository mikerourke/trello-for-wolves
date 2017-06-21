/* @flow */

/* Internal dependencies */
import BaseResource from './base-resource';

/* Types */
import type {
  ArgumentGroup,
  FileProperties,
} from '../types';

export type AttachmentFilter = boolean | 'cover';

export type AttachmentField =
  // Size of the attached file in bytes.
  'bytes'
  // The date the file was attached to the card.
  | 'date'
  // The hex color that is used as the background when the attachment is made
  // the card cover.
  | 'edgeColor'
  // Id of the user who added the attachment.
  | 'idMember'
  // A boolean indicating whether this was uploaded by a user on the
  // web/mobile client or whether it was added via the API.
  | 'isUpload'
  // The mimeType of the file.
  | 'mimeType'
  // The name of the file.
  | 'name'
  // When an image is uploaded via the web client, Trello creates a number of
  // preview thumbnails for it so that it can use the appropriately sized one
  // given the right context. "previews" will return an object containing
  // information about the previews generated for this attachment.
  | 'previews'
  // The URL to the attachment in Trello's static assets.
  | 'url';

/**
 * @namespace Attachment
 */
export default class Attachment extends BaseResource {
  getAttachments(
    queryArgs?: {
      fields?: ArgumentGroup<AttachmentField>,
      filter?: ArgumentGroup<AttachmentFilter>,
    } = {},
  ): Promise<*> {
    return this.httpGet('/', queryArgs);
  }

  getAttachment(
    queryArgs?: {
      fields?: ArgumentGroup<AttachmentField>,
    } = {},
  ): Promise<*> {
    return this.httpGet('/', queryArgs);
  }

  // @todo: Make sure this works for a file.
  uploadAttachment(
    fileProperties: FileProperties,
    queryArgs?: {
      url?: string,
      name?: string,
      mimeType?: string,
    } = {},
  ): Promise<*> {
    return this.httpPost('/', queryArgs, fileProperties);
  }

  deleteAttachment(): Promise<*> {
    return this.httpDelete('/');
  }
}
