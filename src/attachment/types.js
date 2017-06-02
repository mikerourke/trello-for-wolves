/* @flow */

/* Types */
import type { ArgumentGroup } from '../types';

export type AttachmentFilter = boolean | 'cover';

export type AttachmentField =
  'bytes'
  | 'date'
  | 'edgeColor'
  | 'idMember'
  | 'isUpload'
  | 'mimeType'
  | 'name'
  | 'previews'
  | 'url';

export type AttachmentInclusionQueryArgs = {
  attachments?: AttachmentFilter,
  attachmentFields?: ArgumentGroup<AttachmentField>,
};

export type CardAttachmentInclusionQueryArgs = {
  cardAttachments?: boolean,
  cardAttachmentFields?: ArgumentGroup<AttachmentField>,
};

export type AttachmentFieldsQueryArg = {
  fields?: ArgumentGroup<AttachmentField>,
};

export type AttachmentFilterQueryArgs = AttachmentFieldsQueryArg & {
  filter?: AttachmentFilter,
};
