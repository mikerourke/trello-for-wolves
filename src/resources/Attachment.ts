import {
  AllOrFieldOrListOf,
  AttachmentField,
  AttachmentFilter,
  AttachmentRecord,
  FileUpload,
  TypedFetch,
} from "../typeDefs";

import { BaseResource } from "./BaseResource";

/**
 * Used to manage attachments on cards. Cards can have up to 100 attachments.
 * Attachments can be either just URLs, images with previews, or arbitrary files.
 * @see https://developers.trello.com/reference#attachments
 * @class
 */
export class Attachment extends BaseResource {
  public getAttachment(params?: {
    fields?: AllOrFieldOrListOf<AttachmentField>;
  }): TypedFetch<AttachmentRecord> {
    return this.apiGet("/", params);
  }

  public getAttachments(params?: {
    fields?: AllOrFieldOrListOf<AttachmentField>;
    filter?: AllOrFieldOrListOf<AttachmentFilter>;
  }): TypedFetch<AttachmentRecord[]> {
    return this.apiGet("/", params);
  }

  public uploadAttachment(params: {
    name?: string;
    file?: FileUpload;
    mimeType?: string;
    url?: string;
  }): TypedFetch<AttachmentRecord> {
    return this.apiPost("/", params);
  }

  public deleteAttachment(): TypedFetch<Record<string, unknown>> {
    return this.apiDelete("/");
  }
}
