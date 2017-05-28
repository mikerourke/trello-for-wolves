/* @flow */

/* Internal dependencies */
import Entity from './entity';

/* Types */
import type {
  Action,
  ActionDate,
  ActionFields,
  AllOrNone,
  AttachmentFields,
  Auth,
  CardFields,
  CardStatus,
  CheckItemStateFields,
  EntityInstance,
  MemberFields,
} from '../types';

export default class Card extends Entity {
  constructor(
    auth: Auth,
    cardId?: string = '',
    parent?: ?EntityInstance,
  ) {
    super(auth, 'card', cardId, parent);
  }

  getCard(urlArgs?: {
    attachments: boolean | 'cover',
    attachmentFields: AttachmentFields,
    actions: Action,
    actionEntities: boolean,
    actionDisplay: boolean,
    actionsLimit: number,
    actionFields: ActionFields,
    actionMemberCreatorFields: MemberFields,
    members: boolean,
    memberFields: MemberFields,
    checkItemStates: boolean,
    checkItemStateFields: CheckItemStateFields,
    // TODO: Finish these arguments.
  }) {
    return this.performRequest('get', { urlArgs });
  }

  getCards(urlArgs?: {
    actions?: Action,
    attachments?: boolean,
    attachmentFields?: AttachmentFields,
    stickers?: boolean,
    members?: boolean,
    memberFields?: MemberFields,
    checkItemStates?: boolean,
    checklists?: AllOrNone,
    limit?: number,
    since?: ActionDate,
    before?: ActionDate,
    filter?: CardStatus,
    fields?: CardFields,
  }) {
    return this.performRequest('get', { urlArgs });
  }
}
