import { BaseResource } from "./BaseResource";
import {
  AllOfOrListOf,
  FileUpload,
  Limits,
  TypedFetch,
  ValidResourceFields,
} from "../typeDefs";

export type AttachmentFilter = boolean | "cover";

/**
 * @typedef {Object} AttachmentPreviewRecord
 * @property bytes Size of the preview in bytes.
 * @property url URL path to the image preview.
 * @property height Height of the preview (in pixels).
 * @property width Width of the preview (in pixels).
 * @property scaled Whether or not the preview is scaled.
 * @property _id ID of the attachment preview (automatically assigned).
 */
export interface AttachmentPreviewRecord {
  bytes: number;
  url: string;
  height: number;
  width: number;
  scaled: boolean;
  _id: string;
}

/**
 * The data corresponding to an attachment on a board. The fields that are
 * present in the record are contingent on the `fields` param passed to
 * the method used to retrieve the attachment data.
 * @typedef {Object} AttachmentRecord
 * @property id The ID of the attachment.
 * @property bytes The size of the attachment in bytes.
 * @property date The date the attachment was added.
 * @property edgeColor For image attachments, the extracted edge color.
 * @property idMember The ID of the member who attached the attachment.
 * @property isUpload Whether the attachment was uploaded.
 * @property mimeType The mimeType for the attachment. Default is null. MIME types are only stored/returned
 *                    if it is sent when initially creating the attachment. The Trello web client does not
 *                    set the mimeType when uploading attachments.
 * @property name The name of the attachment.
 * @property pos The position of the attachment in the attachments list.
 * @property previews If the image is an uploaded image, Trello will generate some various sized previews.
 * @property url The URL to the attachment.
 * @property [limits] Limits associated with the attachment.
 * @property [creationMethod] Creation method for the attachment.
 */
export interface AttachmentRecord {
  id: string;
  bytes: number;
  date: string;
  edgeColor: string;
  idMember: string;
  isUpload: boolean;
  mimeType: string;
  name: string;
  pos: number;
  previews: AttachmentPreviewRecord[];
  url: string;
  limits?: Limits;
  creationMethod?: string | null;
}

export type AttachmentField = ValidResourceFields<AttachmentRecord>;

/**
 * Used to manage attachments on cards. Cards can have up to 100 attachments.
 * Attachments can be either just URLs, images with previews, or arbitrary files.
 * @see https://developers.trello.com/reference#attachments
 * @class
 */
export class Attachment extends BaseResource {
  public getAttachment(params?: {
    fields?: AllOfOrListOf<AttachmentField>;
  }): TypedFetch<AttachmentRecord> {
    this.validateGetSingle();
    return this.apiGet("/", params);
  }

  public getAttachments(params?: {
    fields?: AllOfOrListOf<AttachmentField>;
    filter?: AllOfOrListOf<AttachmentFilter>;
  }): TypedFetch<AttachmentRecord[]> {
    return this.apiGet("/", params);
  }

  public uploadAttachment(params: {
    name?: string;
    file?: FileUpload;
    mimeType?: string;
    url?: string;
  }): TypedFetch<AttachmentRecord> {
    if ((params.name ?? "").length > 256) {
      throw new Error(
        "The `name` field for an attachment cannot exceed 256 characters",
      );
    }

    if ((params.mimeType ?? "").length > 256) {
      throw new Error(
        "The `mimeType` field for an attachment cannot exceed 256 characters",
      );
    }

    if (params.url && !/http:\/\/|https:\/\//gi.test(params.url.toString())) {
      throw new Error(
        "The `url` field must start with `http://` or `https://`",
      );
    }

    return this.apiPost("/", params);
  }

  public deleteAttachment(): TypedFetch<{}> {
    return this.apiDelete("/");
  }
}
