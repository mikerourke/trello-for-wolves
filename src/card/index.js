/* @flow */

// TODO: Add error handling and unify query args.

/* Internal dependencies */
import BaseResource from '../base-resource';
import Action from '../action';
import Board from '../board';
import List from '../list';
import Member from '../member';
import Organization from '../organization';

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

  actions(actionId?: string = '') {
    return new Action(this.auth, this.getOptionsForChild(actionId));
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

  updateClosedStatus(value: boolean): Promise<*> {
    return this.httpPut('/closed', { value });
  }

  updateDescription(value: string): Promise<*> {
    return this.httpPut('/desc', { value });
  }

  updateDueDate(value: ?Date): Promise<*> {
    return this.httpPut('/due', { value });
  }

  updateDueComplete(value: boolean): Promise<*> {
    return this.httpPut('/dueComplete', { value });
  }

  updateIdAttachmentCover(value: string): Promise<*> {
    return this.httpPut('/idAttachmentCover', { value });
  }

  updateIdBoard(
    queryArgs: {
      value: string,
      idList?: string,
    },
  ): Promise<*> {
    return this.httpPut('/idBoard', queryArgs);
  }

  updateIdList(value: string): Promise<*> {
    return this.httpPut('/idList', { value });
  }

  updateIdMembers(value: Array<string>): Promise<*> {
    return this.httpPut('/idMembers', { value });
  }
}
