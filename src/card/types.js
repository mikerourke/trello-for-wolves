/* @flow */

/* Types */
import type { ArgumentGroup } from '../types';

export type CardAging = 'pirate' | 'regular';

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

export type CardStatus = 'all' | 'closed' | 'none' | 'open' | 'visible';

export type StickerField =
  'image'
  | 'imageScaled'
  | 'imageUrl'
  | 'left'
  | 'rotate'
  | 'top'
  | 'zIndex';

export type CardInclusionQueryArgs = {
  cards?: CardStatus,
  cardFields?: ArgumentGroup<CardField>,
};

export type StickerInclusionQueryArgs = {
  stickers?: boolean,
  stickerFields?: ArgumentGroup<StickerField>,
};

export type StickerFieldsQueryArg = {
  fields?: ArgumentGroup<StickerField>,
};
