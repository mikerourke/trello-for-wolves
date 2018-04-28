// @flow
import { generateTypeMap } from './utils/type-mapper';
export type * from './resources/action';
export type * from './resources/attachment';
export type * from './resources/base-resource';
export type * from './resources/board';
export type * from './resources/card';
export type * from './resources/check-item';
export type * from './resources/checklist';
export type * from './resources/label';
export type * from './resources/list';
export type * from './resources/member';
export type * from './resources/membership';
export type * from './resources/notification';
export type * from './resources/organization';
export type * from './resources/search';
export type * from './resources/sticker';
export type * from './resources/token';
export type * from './resources/type';
export type * from './resources/webhook';

export type Config = {
  key: string,
  token: string,
  backoffTime?: number,
  maxWaitingTime?: number,
};

export const allOrNoneMap = generateTypeMap('all', 'none');
export type AllOrNone = $Keys<typeof allOrNoneMap>;

export type ArgumentGroup<T> = T | Array<T> | 'all';

export type FilterDate = ?Date | 'lastView';

export const formatMap = generateTypeMap('count', 'list', 'minimal');
export type Format = $Keys<typeof formatMap>;

export const httpMethodMap = generateTypeMap('get', 'put', 'post', 'delete');
export type HttpMethod = $Keys<typeof httpMethodMap>;

export const keepFromSourceFieldMap = generateTypeMap(
  'attachments',
  'checklists',
  'comments',
  'due',
  'labels',
  'members',
  'stickers',
);
export type KeepFromSourceField = $Keys<typeof keepFromSourceFieldMap>;

export const permissionLevelMap = generateTypeMap('private', 'public');
export type PermissionLevel = $Keys<typeof permissionLevelMap>;

export const positionMap = generateTypeMap('bottom', 'top');
export type Position = $Keys<typeof positionMap>;

export type PositionNumbered = Position | number;

/**
 * Types taken from MDN on 7/18/2017.  The list of all MIME types has about 1,600 items on it, so
 *    if it isn't on the list, you can specify your own.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Complete_list_of_MIME_types
 */
export const mimeTypeMap = generateTypeMap(
  'audio/aac',
  'application/epub+zip',
  'application/java-archive',
  'application/javascript',
  'application/json',
  'application/msword',
  'application/octet-stream',
  'application/octet-stream',
  'application/ogg',
  'application/pdf',
  'application/rtf',
  'application/vnd.amazon.ebook',
  'application/vnd.apple.installer+xml',
  'application/vnd.mozilla.xul+xml',
  'application/vnd.ms-excel',
  'application/vnd.ms-powerpoint',
  'application/vnd.oasis.opendocument.presentation',
  'application/vnd.oasis.opendocument.spreadsheet',
  'application/vnd.oasis.opendocument.text',
  'application/vnd.visio',
  'application/x-7z-compressed',
  'application/x-bzip',
  'application/x-bzip2',
  'application/x-csh',
  'application/x-rar-compressed',
  'application/x-sh',
  'application/x-shockwave-flash',
  'application/x-tar',
  'application/xhtml+xml',
  'application/xml',
  'application/zip',
  'audio/3gpp',
  'audio/3gpp2',
  'audio/midi',
  'audio/ogg',
  'audio/webm',
  'audio/x-wav',
  'font/ttf',
  'font/woff',
  'font/woff2',
  'image/gif',
  'image/jpeg',
  'image/png',
  'image/svg+xml',
  'image/tiff',
  'image/webp',
  'image/x-icon',
  'text/calendar',
  'text/css',
  'text/csv',
  'text/html',
  'text/plain',
  'video/3gpp',
  'video/3gpp2',
  'video/mpeg',
  'video/ogg',
  'video/webm',
  'video/x-msvideo',
  'application/x-abiword',
);
export type MimeType = $Keys<typeof mimeTypeMap>;
