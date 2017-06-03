/* @flow */

// TODO: Add error handling and unify query args.

/* Internal dependencies */
import BaseResource from '../base-resource';

/* Types */
import type {
  ActionInclusionQueryArgs,
  AllOrNone,
  ArgumentGroup,
  AttachmentInclusionQueryArgs,
  Auth,
  BoardField,
  CardField,
  CardFilter,
  CheckItemStateField,
  ChecklistField,
  FieldsQueryArg,
  ListField,
  MemberField,
  PositionNumbered,
  ResourceConstructorOptions,
  StickerInclusionQueryArgs,
  ValueQueryArg,
  WithinLimitsQueryArgs,
} from '../types';

type GetQueryArgs = ActionInclusionQueryArgs &
  AttachmentInclusionQueryArgs &
  {
    members?: boolean,
    memberFields?: ArgumentGroup<MemberField>,
    checkItemStates?: boolean,
    checklists?: AllOrNone,
  };

/**
 * @api {path} /cards card
 * @apiVersion 1.0.0
 * @apiName card
 * @apiGroup overview
 * @apiDescription
 * A Card is the most basic unit of information in Trello. Cards have a name,
 * description, labels, members, and a set of historical actions that have been
 * taken on the card, including any comments.
 * <h3>Child Methods</h3>
 * <ul>
 * <li>
 * <h4>Actions</h4>
 * Actions are the audit log/record of everything that has been
 * done to a card throughout its history, including any comments that have been
 * made.
 * </li>
 * <br>
 * <li>
 * <h4>Labels</h4>
 * Labels can be as simple as colors attached to a Card, or Labels can have
 * names.
 * </li>
 * </ul>
 */
export default class Card extends BaseResource {
  constructor(
    auth: Auth,
    options?: ResourceConstructorOptions = {},
  ) {
    super(auth, 'card', options);
  }

  getCard(
    queryArgs?: GetQueryArgs &
      StickerInclusionQueryArgs &
      {
        actionsEntities?: boolean,
        actionsDisplay?: boolean,
        actionsLimit?: number,
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

  getCards(
    queryArgs?: GetQueryArgs &
      WithinLimitsQueryArgs &
      FieldsQueryArg<CardField> &
      {
        stickers?: boolean,
      } = {},
  ): Promise<*> {
    return this.httpGet('/', queryArgs);
  }

  getFilteredCards(filter: CardFilter): Promise<*> {
    return this.httpGet(`/${filter}`);
  }

  getFieldValue(field: CardField): Promise<*> {
    return this.httpGet(`/${field}`);
  }

  getPluginData(): Promise<*> {
    return this.httpGet('/pluginData');
  }

  updateCard(
    queryArgs?: {
      name?: string,
      desc?: string,
      closed?: boolean,
      idAttachmentCover?: string,
      idBoard?: string,
      idLabels?: string,
      idList?: string,
      idMembers?: Array<string>,
      pos?: PositionNumbered,
      due?: ?string,
      dueComplete?: boolean,
      subscribed?: boolean,
    } = {},
  ): Promise<*> {
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

  updateIdBoard(
    queryArgs: ValueQueryArg<string> &
      {
        idList?: string,
      },
  ): Promise<*> {
    return this.httpPut('/idBoard', queryArgs);
  }

  updateIdList(queryArgs: ValueQueryArg<string>): Promise<*> {
    return this.httpPut('/idList', queryArgs);
  }

  updateIdMembers(queryArgs: ValueQueryArg<Array<string>>): Promise<*> {
    return this.httpPut('/idMembers', queryArgs);
  }
}
