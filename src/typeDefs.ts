export interface Config {
  key: string;
  token: string;
  backoffTime?: number;
  maxRetryAttempts?: number;
}

export type AllOrNone = "all" | "none";

export type ArgumentGroup<T> = T | T[] | "all";

export type FilterDate = Date | "lastView" | null;

export type Format = "count" | "list" | "minimal";

export type KeepFromSourceField =
  | "attachments"
  | "checklists"
  | "comments"
  | "due"
  | "labels"
  | "members"
  | "stickers";

export type PermissionLevel = "private" | "public";

export type Position = "bottom" | "top";

export type PositionNumbered = Position | number;

export type QueryParamsByName = Record<
  string,
  string | number | boolean | object | undefined | null
>;

/**
 * Types taken from MDN on 7/18/2017.  The list of all MIME types has about 1,600 items on it, so
 * if it isn't on the list, you can specify your own.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Complete_list_of_MIME_types
 */
export type MimeType =
  | "audio/aac"
  | "application/epub+zip"
  | "application/java-archive"
  | "application/javascript"
  | "application/json"
  | "application/msword"
  | "application/octet-stream"
  | "application/ogg"
  | "application/pdf"
  | "application/rtf"
  | "application/vnd.amazon.ebook"
  | "application/vnd.apple.installer+xml"
  | "application/vnd.mozilla.xul+xml"
  | "application/vnd.ms-excel"
  | "application/vnd.ms-powerpoint"
  | "application/vnd.oasis.opendocument.presentation"
  | "application/vnd.oasis.opendocument.spreadsheet"
  | "application/vnd.oasis.opendocument.text"
  | "application/vnd.visio"
  | "application/x-7z-compressed"
  | "application/x-bzip"
  | "application/x-bzip2"
  | "application/x-csh"
  | "application/x-rar-compressed"
  | "application/x-sh"
  | "application/x-shockwave-flash"
  | "application/x-tar"
  | "application/xhtml+xml"
  | "application/xml"
  | "application/zip"
  | "audio/3gpp"
  | "audio/3gpp2"
  | "audio/midi"
  | "audio/ogg"
  | "audio/webm"
  | "audio/x-wav"
  | "font/ttf"
  | "font/woff"
  | "font/woff2"
  | "image/gif"
  | "image/jpeg"
  | "image/png"
  | "image/svg+xml"
  | "image/tiff"
  | "image/webp"
  | "image/x-icon"
  | "text/calendar"
  | "text/css"
  | "text/csv"
  | "text/html"
  | "text/plain"
  | "video/3gpp"
  | "video/3gpp2"
  | "video/mpeg"
  | "video/ogg"
  | "video/webm"
  | "video/x-msvideo"
  | "application/x-abiword";
