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

/**
 * @apiDefine AttachmentInclusionQueryArgs
 * @apiParam {Boolean=true,false,"cover"} [attachments=true]
 *    If <code>true</code>, include all attachments, if <code>false</code>,
 *    include none, and if <code>"cover"</code>, include only card cover
 *    attachments.
 * @apiParam {String="all","bytes","date","edgeColor","idMember","isUpload","mimeType","name","previews","url"} [attachmentFields='"all"']
 *    Attachment fields to include in the response, can either be
 *    <code>"all"</code> or a comma separated list of field names.
 */
export type AttachmentInclusionQueryArgs = {
  attachments?: AttachmentFilter,
  attachmentFields?: ArgumentGroup<AttachmentField>,
};

/**
 * @apiDefine CardAttachmentInclusionQueryArgs
 * @apiParam {Boolean=true,false,"cover"} [cardAttachments=true]
 *    If <code>true</code>, include all attachments, if <code>false</code>,
 *    include none, and if <code>"cover"</code>, include only card cover
 *    attachments.
 * @apiParam {String="all","bytes","date","edgeColor","idMember","isUpload","mimeType","name","previews","url"} [cardAttachmentFields='"all"']
 *    Card attachment fields to include in the response, can either be
 *    <code>"all"</code> or a comma separated list of field names.
 */
export type CardAttachmentInclusionQueryArgs = {
  cardAttachments?: boolean,
  cardAttachmentFields?: ArgumentGroup<AttachmentField>,
};
