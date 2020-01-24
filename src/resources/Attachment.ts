import { BaseResource } from "./BaseResource";
import { AllOfOrListOf, TypedFetch } from "../typeDefs";

export type AttachmentPreviewRecord = {
  _id: string;
  byte: number;
  height: number;
  scaled: boolean;
  url: string;
  width: number;
};

export type AttachmentRecord = {
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
};

export type AttachmentField = keyof AttachmentRecord;

export type AttachmentFilter = boolean | "cover";

export class Attachment extends BaseResource {
  public getAttachments(params?: {
    fields?: AllOfOrListOf<AttachmentField>;
    filter?: AllOfOrListOf<AttachmentFilter>;
  }): TypedFetch<AttachmentRecord[]> {
    return this.apiGet("/", params);
  }

  public getAttachment(params?: {
    fields?: AllOfOrListOf<AttachmentField>;
  }): TypedFetch<AttachmentRecord> {
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
