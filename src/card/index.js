/* @flow */

// TODO: Add error handling and unify query args.

/* Internal dependencies */
import BaseResource from '../base-resource';

/* Types */
import type {
  ActionChildrenQueryArgs,
  AllOrNone,
  ArgumentGroup,
  AttachmentInclusionQueryArgs,
  Auth,
  BoardField,
  CardField,
  CardStatus,
  CheckItemStateField,
  ChecklistField,
  FieldsQueryArg,
  ListField,
  MemberField,
  Position,
  StickerInclusionQueryArgs,
  ValueQueryArg,
  WithinLimitsQueryArgs,
} from '../types';

type GetQueryArgs = ActionChildrenQueryArgs &
  AttachmentInclusionQueryArgs &
  {
    members?: boolean,
    memberFields?: ArgumentGroup<MemberField>,
    checkItemStates?: boolean,
    checklists?: AllOrNone,
  };

/**
 * Class representing a Card resource.
 * @extends BaseResource
 */
export default class Card extends BaseResource {
  constructor(
    auth: Auth,
    cardId: string,
    parentPath?: string,
  ) {
    super(auth, 'card', cardId, parentPath);
  }

  getCard(queryArgs?: GetQueryArgs &
    StickerInclusionQueryArgs &
    {
      actionMemberCreatorFields?: ArgumentGroup<MemberField>,
      checkItemStateFields?: ArgumentGroup<CheckItemStateField>,
      checklistFields?: ArgumentGroup<ChecklistField>,
      membersVoted?: boolean,
      memberVotedFields?: ArgumentGroup<MemberField>,
      board?: boolean,
      boardFields?: ArgumentGroup<BoardField>,
      list?: boolean,
      listFields?: ArgumentGroup<ListField>,
      pluginData?: boolean,
      fields?: ArgumentGroup<CardField> | 'dueComplete',
      labels?: boolean,
    } = {},
  ): Promise<*> {
    const updatedArgs = (this.parentPath)
      ? { idCard: this.instanceId, ...queryArgs }
      : queryArgs;
    return this.httpGet('/', updatedArgs);
  }

  getCards(queryArgs?: GetQueryArgs &
    WithinLimitsQueryArgs<CardStatus> &
    FieldsQueryArg<CardField> &
    {
      stickers?: boolean,
    } = {},
  ): Promise<*> {
    return this.httpGet('/', queryArgs);
  }

  getFilteredCards(filter: CardStatus): Promise<*> {
    return this.httpGet(`/${filter}`);
  }

  getFieldValue(field: CardField): Promise<*> {
    return this.httpGet(`/${field}`);
  }

  getPluginData(): Promise<*> {
    return this.httpGet('/pluginData');
  }

  updateCard(queryArgs?: {
    name?: string,
    desc?: string,
    closed?: boolean,
    idAttachmentCover?: string,
    idBoard?: string,
    idLabels?: string,
    idList?: string,
    idMembers?: Array<string>,
    pos?: Position | number,
    due?: ?string,
    dueComplete?: boolean,
    subscribed?: boolean,
  } = {}): Promise<*> {
    return this.httpPut('/', queryArgs);
  }

  updateClosedStatus(queryArgs: ValueQueryArg<boolean>): Promise<*> {
    return this.httpPut('/closed', queryArgs);
  }

  updateDescription(queryArgs: ValueQueryArg<string>): Promise<*> {
    return this.httpPut('/desc', queryArgs);
  }

  updateDueDate(queryArgs: ValueQueryArg<?Date>): Promise<*> {
    return this.httpPut('/due', queryArgs);
  }

  updateDueComplete(queryArgs: ValueQueryArg<boolean>): Promise<*> {
    return this.httpPut('/dueComplete', queryArgs);
  }

  updateIdAttachmentCover(queryArgs: ValueQueryArg<string>): Promise<*> {
    return this.httpPut('/idAttachmentCover', queryArgs);
  }

  updateIdBoard(queryArgs: ValueQueryArg<string> & {
    idList?: string,
  }): Promise<*> {
    return this.httpPut('/idBoard', queryArgs);
  }

  updateIdList(queryArgs: ValueQueryArg<string>): Promise<*> {
    return this.httpPut('/idList', queryArgs);
  }

  updateIdMembers(queryArgs: ValueQueryArg<Array<string>>): Promise<*> {
    return this.httpPut('/idMembers', queryArgs);
  }
}
