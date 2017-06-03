/* @flow */

/* Types */
import type { ArgumentGroup } from '../types';

export type CardAging = 'pirate' | 'regular';

/**
 * @apiDefine CardFieldQueryArg
 * @apiParam {String="badges","checkItemStates","closed","dateLastActivity","desc","descData","due","email","idAttachmentCover","idBoard","idChecklists","idLabels","idList","idMembers","idMembersVoted","idShort","labels","manualCoverAttachment","name","pos","shortLink","shortUrl","subscribed","url"} field
 *    Card field to get value for.
 */

/**
 * @apiDefine CardFieldsQueryArg
 * @apiParam {String="all","badges","checkItemStates","closed","dateLastActivity","desc","descData","due","email","idAttachmentCover","idBoard","idChecklists","idLabels","idList","idMembers","idMembersVoted","idShort","labels","manualCoverAttachment","name","pos","shortLink","shortUrl","subscribed","url"} [fields='"all"']
 *    Card fields to include in response, can either be <code>"all"</code> or
 *    a comma separated list of field names.
 */
export type CardField =
  'badges'
  | 'checkItemStates'
  | 'closed'
  | 'dateLastActivity'
  | 'desc'
  | 'descData'
  | 'due'
  | 'email'
  | 'idAttachmentCover'
  | 'idBoard'
  | 'idChecklists'
  | 'idLabels'
  | 'idList'
  | 'idMembers'
  | 'idMembersVoted'
  | 'idShort'
  | 'labels'
  | 'manualCoverAttachment'
  | 'name'
  | 'pos'
  | 'shortLink'
  | 'shortUrl'
  | 'subscribed';

export type CardFilter = 'all' | 'closed' | 'none' | 'open' | 'visible';

export type StickerField =
  'image'
  | 'imageScaled'
  | 'imageUrl'
  | 'left'
  | 'rotate'
  | 'top'
  | 'zIndex';

/**
 * @apiDefine CardInclusionQueryArgs
 * @apiParam {String="all","closed","none","open","visible"} [cards='"none"']
 *    Limit cards in the response.
 * @apiParam {String="all","badges","checkItemStates","closed","dateLastActivity","desc","descData","due","email","idAttachmentCover","idBoard","idChecklists","idLabels","idList","idMembers","idMembersVoted","idShort","labels","manualCoverAttachment","name","pos","shortLink","shortUrl","subscribed","url"} [cardFields='"all"']
 *    Card fields to include in response, can either be <code>"all"</code> or a
 *    comma separated list of field names.
 */
export type CardInclusionQueryArgs = {
  cards?: CardFilter,
  cardFields?: ArgumentGroup<CardField>,
};

export type StickerInclusionQueryArgs = {
  stickers?: boolean,
  stickerFields?: ArgumentGroup<StickerField>,
};

export type StickerFieldsQueryArg = {
  fields?: ArgumentGroup<StickerField>,
};
