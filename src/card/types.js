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
