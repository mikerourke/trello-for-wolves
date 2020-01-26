import { BaseResource } from "./BaseResource";
import { AllOfOrListOf, TypedFetch, ValidResourceFields } from "../typeDefs";

export type AttachmentFilter = boolean | "cover";

export interface AttachmentPreviewRecord {
  _id: string;
  byte: number;
  height: number;
  scaled: boolean;
  url: string;
  width: number;
}

export interface AttachmentRecord {
  /** The ID of the attachment */
  id: string;
  /** The size of the attachment in bytes */
  bytes: number;
  /** The date the attachment was added */
  date: string;
  /** For image attachments, the extracted edge color */
  edgeColor: string;
  /** The ID of the member who attached the attachment */
  idMember: string;
  /** Whether the attachment was uploaded */
  isUpload: boolean;
  /**
   * The mimeType for the attachment. Default is null. MIME types are only
   * stored/returned if it is sent when initially creating the attachment. The
   * Trello web client does not set the mimeType when uploading attachments.
   */
  mimeType: string;
  /** The name of the attachment */
  name: string;
  /** The position of the attachment in the attachments list */
  pos: number;
  /**
   * If the image is an uploaded image, Trello will generate some various
   * sized previews
   */
  previews: AttachmentPreviewRecord[];
  /** The URL to the attachment */
  url: string;
}

export type AttachmentField = ValidResourceFields<AttachmentRecord>;

/**
 * Used to manage attachments on cards. Cards can have up to 100 attachments.
 * Attachments can be either just URLs, images with previews, or arbitrary
 * files.
 * @see https://developers.trello.com/reference#attachments
 * @class
 */
export class Attachment extends BaseResource {
  public getAttachment(params?: {
    fields?: AllOfOrListOf<AttachmentField>;
  }): TypedFetch<AttachmentRecord> {
    return this.apiGet("/", params);
  }

  public getAttachments(params?: {
    fields?: AllOfOrListOf<AttachmentField>;
    filter?: AllOfOrListOf<AttachmentFilter>;
  }): TypedFetch<AttachmentRecord[]> {
    return this.apiGet("/", params);
  }

  public uploadAttachment(params?: {
    file?: Blob | File | FormData;
    mimeType?: string;
    name?: string;
    url?: string;
  }): TypedFetch<AttachmentRecord> {
    return this.apiPost("/", params);
  }

  public deleteAttachment(): TypedFetch<{}> {
    return this.apiDelete("/");
  }
}
