/* @flow */

/* Internal dependencies */
import Entity from './entity';

/* Types */
import type {
  ActionChildrenUrlArgs,
  AllOrNone,
  ArgumentGroup,
  AttachmentField,
  AttachmentFilter,
  AttachmentUrlArgs,
  Auth,
  BoardField,
  CheckItemStateField,
  ChecklistField,
  EntityInstance,
  FilterUrlArgs,
  ListField,
  MemberField,
  Position,
} from '../types';

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

type GetUrlArgs = ActionChildrenUrlArgs & AttachmentUrlArgs & {
  members?: boolean,
  member_fields?: ArgumentGroup<MemberField>,
  checkItemStates?: boolean,
  checklists?: AllOrNone,
}

export default class Card extends Entity {
  constructor(
    auth: Auth,
    cardId?: string = '',
    parent?: ?EntityInstance,
  ) {
    super(auth, 'card', cardId, parent);
  }

  getCard(
    urlArgs?: GetUrlArgs & {
      action_memberCreator_fields?: ArgumentGroup<MemberField>,
      checkItemState_fields?: ArgumentGroup<CheckItemStateField>,
      checklist_fields?: ArgumentGroup<ChecklistField>,
    } = {},
    cardUrlArgs?: {
      membersVoted?: boolean,
      memberVoted_fields?: ArgumentGroup<MemberField>,
      board?: boolean,
      board_fields?: ArgumentGroup<BoardField>,
      list?: boolean,
      list_fields?: ArgumentGroup<ListField>,
      pluginData?: boolean,
      stickers?: boolean,
      sticker_fields?: ArgumentGroup<StickerField>,
      fields?: ArgumentGroup<CardField> | 'dueComplete',
    } = {},
    parentUrlArgs?: {
      labels?: boolean,
      fields?: ArgumentGroup<CardField>,
    } = {},
  ) {
    const updatedArgs = (this.parent)
      ? { idCard: this.entity.id, ...urlArgs, ...parentUrlArgs }
      : { ...urlArgs, ...cardUrlArgs };
    return this.performRequest('get', { urlArgs: updatedArgs });
  }

  getCards(urlArgs?: GetUrlArgs & FilterUrlArgs<CardStatus> & {
    stickers?: boolean,
    fields?: ArgumentGroup<CardField>,
  } = {}) {
    return this.performRequest('get', { urlArgs });
  }

  getFilteredCards(filter: CardStatus) {
    return this.performRequest('get', { path: filter });
  }

  getFieldValue(field: CardField): Promise<*> {
    return this.performRequest('get', { path: field });
  }

  getAttachment(
    idAttachment: string,
    urlArgs?: {
      fields?: ArgumentGroup<AttachmentField>,
    } = {},
  ): Promise<*> {
    return this.performRequest('get', {
      urlArgs: { idAttachment, ...urlArgs },
      path: `attachments/${idAttachment}`,
    });
  }

  getAttachments(urlArgs?: {
    fields?: ArgumentGroup<AttachmentField>,
    filter?: AttachmentFilter,
  } = {}): Promise<*> {
    return this.performRequest('get', {
      urlArgs,
      path: 'attachments',
    });
  }

  getPluginData(): Promise<*> {
    return this.performRequest('get', { path: 'pluginData' });
  }

  getSticker(
    idSticker: string,
    urlArgs?: {
      fields?: ArgumentGroup<StickerField>,
    } = {},
  ): Promise<*> {
    return this.performRequest('get', {
      urlArgs: { idSticker, ...urlArgs },
      path: `stickers/${idSticker}`,
    });
  }

  getStickers(urlArgs?: {
    fields?: ArgumentGroup<StickerField>,
  } = {}): Promise<*> {
    return this.performRequest('get', {
      urlArgs,
      path: 'stickers',
    });
  }

  updateCard(urlArgs?: {
    name?: string,
    desc?: string,
    closed?: boolean,
    idMembers?: Array<string>,
    idAttachmentCover?: string,
    idList?: string,
    idLabels?: string,
    idBoard?: string,
    pos?: Position | number,
    due?: ?string,
    dueComplete?: boolean,
    subscribed?: boolean,
  } = {}): Promise<*> {
    return this.performRequest('put', { urlArgs });
  }

  updateClosedStatus(value: boolean): Promise<*> {
    return this.performRequest('put', { path: 'closed', urlArgs: { value } });
  }

  updateDescription(value: string): Promise<*> {
    return this.performRequest('put', { path: 'desc', urlArgs: { value } });
  }

  updateDueDate(value: ?Date): Promise<*> {
    return this.performRequest('put', { path: 'due', urlArgs: { value } });
  }

  updateDueComplete(value: boolean): Promise<*> {
    return this.performRequest('put', {
      path: 'dueComplete',
      urlArgs: { value },
    });
  }

  updateIdField(
    fieldName: 'AttachmentCover' | 'Board' | 'List' | 'Members',
    value: string,
    urlArgs?: {
      idList?: string,
    } = {},
  ): Promise<*> {
    return this.performRequest('put', {
      path: `id${fieldName}`,
      urlArgs: { value, ...urlArgs },
    });
  }
}
