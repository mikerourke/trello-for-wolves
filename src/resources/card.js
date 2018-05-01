// @flow
import BaseResource from './baseResource';
import Action from './action';
import Attachment from './attachment';
import Board from './board';
import CheckItem from './checkItem';
import Checklist from './checklist';
import Comment from './comment';
import Label from './label';
import List from './list';
import Member from './member';
import Sticker from './sticker';
import type {
  ActionField,
  ActionFilter,
  AllOrNone,
  ArgumentGroup,
  AttachmentField,
  AttachmentFilter,
  BoardField,
  CheckItemStateField,
  ChecklistField,
  KeepFromSourceField,
  LabelColor,
  ListField,
  MemberField,
  PositionNumbered,
  StickerField,
} from '../types';

export type CardAging = 'pirate' | 'regular';

export type CardField =
  | 'badges'
  | 'checkItemStates'
  | 'closed'
  // The datetime of the last activity on the card. Note: There are activities
  // that update dateLastActivity that do not create a corresponding action.
  // For instance, updating the name field of a checklist item on a card does
  // not create an action but does update the card and board's
  // dateLastActivity value.
  | 'dateLastActivity'
  | 'desc'
  | 'descData'
  | 'due'
  | 'dueComplete'
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
  | 'subscribed'
  | 'url';

export type CardFilter = 'all' | 'closed' | 'none' | 'open' | 'visible';

/**
 * @namespace Card
 */
export default class Card extends BaseResource {
  getCards(queryArgs?: {
    actions?: ArgumentGroup<ActionFilter>,
    attachments?: AttachmentFilter,
    attachmentFields?: ArgumentGroup<AttachmentField>,
    stickers?: boolean,
    members?: boolean,
    memberFields?: ArgumentGroup<MemberField>,
    checkItemStates?: boolean,
    checklists?: AllOrNone,
    limit?: number,
    since?: ?Date,
    before?: ?Date,
    filter?: CardFilter,
    fields?: ArgumentGroup<CardField>,
  }): Promise<any> {
    return this.httpGet('/', queryArgs);
  }

  /**
   * @api {get} /cards/:cardId getCard
   * @apiVersion 1.0.0
   * @apiName getCard
   * @apiDescription Get details of a single card.
   * @apiGroup card
   * @apiPermission read
   *
   * @apiUse ActionTypesFilter
   * @apiParam {Boolean} [actionsEntities=false]
   *    Include <code>entities</code> data in the response.
   * @apiParam {Boolean} [actionsDisplay=false]
   *    Include <code>display</code> data in the response.
   * @apiParam {number{0-1000}} [actionsLimit=50]
   *    Limit to impose on actions included in response.
   * @apiParam {String[]="all","data","date","idMemberCreator","type"} [actionFields='"all"']
   *    Action fields to include in the response, can either be <code>"all"</code>
   *    or an array of field names.
   * @apiParam {String[]="all","avatarHash","bio","bioData","confirmed",
   * "fullName","idPremOrgsAdmin","initials","memberType","products","status",
   * "url","username"} [actionMemberCreatorFields='["avatarHash", "fullName", "initials", "username"]']
   *    Member creator fields for actions to include in response, can either
   *    be <code>"all"</code> or an array of field names.
   * @apiParam {Boolean=true,false,"cover"} [attachments=false]
   *    If <code>true</code>, include all attachments, if <code>false</code>,
   *    include none, and if <code>"cover"</code>, include only card cover attachments.
   * @apiParam {String[]="all","bytes","date","edgeColor","idMember","isUpload",
   * "mimeType","name","previews","url"} [attachmentFields='"all"']
   *    Attachment fields to include in the response, can either
   *    be <code>"all"</code> or an array of field names.
   * @apiParam {Boolean} [members=false]
   *    Indicates if member data should be included in response.
   * @apiParam {String[]="all","avatarHash","bio","bioData","confirmed","fullName",
   * "idPremOrgsAdmin","initials","memberType","products","status","url",
   * "username"} [memberFields='["avatarHash", "fullName", "initials", "username"]']
   *    Member fields to include in response, can either be <code>"all"</code> or
   *    an array of field names.
   * @apiParam {Boolean} [membersVoted=false]
   *    Indicates if members voted data should be included in response.
   * @apiParam {String[]="all","avatarHash","bio","bioData","confirmed",
   * "fullName","idPremOrgsAdmin","initials","memberType","products","status",
   * "url","username"} [memberVotedFields='["avatarHash", "fullName", "initials", "username"]']
   *    Members voted fields to include in response, can either be <code>"all"</code> or
   *    an array of field names.
   * @apiParam {Boolean} [checkItemStates=false]
   *    Indicates if check item state data should be included in response.
   * @apiParam {String[]="all","idCheckItem","state"} [checkItemStateFields='"all"']
   *    Check item state fields to include in response, can either be <code>"all"</code> or
   *    an array of field names.
   * @apiParam {String="all","none"} [checklists='"none"']
   *    Checklists to include in response.
   * @apiParam {String[]="all","idBoard","idCard","name","pos"} [checklistFields='"all"']
   *    Checklist fields to include in response, can either be <code>"all"</code> or
   *    an array of field names.
   * @apiParam {Boolean} [board=false]
   *    Indicates if board data should be included in response.
   * @apiParam {String[]="all","closed","dateLastActivity","dateLastView","desc",
   * "descData","idOrganization","invitations","invited","labelNames","memberships",
   * "name","pinned","powerUps","prefs","shortLink","shortUrl","starred",
   * "subscribed","url"} [boardFields='["name", "desc", "descData", "closed", "idOrganization", "pinned", "url", "prefs"]']
   *    Board fields to include in response, can either be <code>"all"</code> or
   *    an array of field names.
   * @apiParam {Boolean} [list=false]
   *    Indicates if list data should be included in response.
   * @apiParam {String[]="all","closed","idBoard","name","pos",
   * "subscribed"} [listFields='"all"']
   *    List fields to include in response, can either be <code>"all"</code> or
   *    an array of field names.
   * @apiParam {Boolean} [pluginData=false]
   *    Indicates if plugin data should be included in response.
   * @apiParam {Boolean} [stickers=false]
   *    Indicates if sticker data should be included in the response.
   * @apiParam {String[]="all","image","imageScaled","imageUrl","left","rotate",
   * "top","zIndex"} [stickerFields='"all"']
   *    Sticker fields to include in response, can either be <code>"all"</code> or
   *    an array of field names.
   * @apiParam {String[]="all","badges","checkItemStates","closed","dateLastActivity",
   * "desc","descData","due","email","idAttachmentCover","idBoard","idChecklists",
   * "idLabels","idList","idMembers","idMembersVoted","idShort","labels",
   * "manualCoverAttachment","name","pos","shortLink","shortUrl",
   * "subscribed","url"} [fields='["badges", "checkItemStates", "closed", "dateLastActivity", "desc", "descData", "due", "email", "idBoard", "idChecklists", "idLabels", "idList", "idMembers", "idShort", "idAttachmentCover", "manualCoverAttachment", "labels", "name", "pos", "shortUrl", "url"]']
   *    Card fields to include in response, can either be <code>"all"</code> or
   *    an array of field names.
   * @apiExample {js} Example:
   * trello.cards('CaRdId').getCard({ ... });
   */
  getCard(queryArgs?: {
    actions?: ArgumentGroup<ActionFilter>,
    actionsEntities?: boolean,
    actionsDisplay?: boolean,
    actionsLimit?: number,
    actionFields?: ArgumentGroup<ActionField>,
    actionMemberCreatorFields?: ArgumentGroup<MemberField>,
    attachments?: AttachmentFilter,
    attachmentFields?: ArgumentGroup<AttachmentField>,
    members?: boolean,
    memberFields?: ArgumentGroup<MemberField>,
    membersVoted?: boolean,
    memberVotedFields?: ArgumentGroup<MemberField>,
    checkItemStates?: boolean,
    checkItemStateFields?: ArgumentGroup<CheckItemStateField>,
    checklists?: AllOrNone,
    checklistFields?: ArgumentGroup<ChecklistField>,
    board?: boolean,
    boardFields?: ArgumentGroup<BoardField>,
    list?: boolean,
    listFields?: ArgumentGroup<ListField>,
    pluginData?: boolean,
    stickers?: boolean,
    stickerFields?: ArgumentGroup<StickerField>,
    fields?: ArgumentGroup<CardField>,
  }): Promise<any> {
    return this.httpGet('/', queryArgs);
  }

  getCardsFilteredBy(filter: CardFilter): Promise<any> {
    return this.httpGet(`/${filter}`);
  }

  /**
   * @api {get} /cards/:cardId/:field getFieldValue
   * @apiVersion 1.0.0
   * @apiName getFieldValue
   * @apiDescription Gets the value of the specified field on a card.
   * @apiGroup card
   * @apiPermission read
   *
   * @apiParam {String[]="all","badges","checkItemStates","closed","dateLastActivity",
   * "desc","descData","due","email","idAttachmentCover","idBoard","idChecklists",
   * "idLabels","idList","idMembers","idMembersVoted","idShort","labels",
   * "manualCoverAttachment","name","pos","shortLink","shortUrl","subscribed",'"url"} field
   *    Card field to get value for.
   * @apiExample {js} Example:
   * trello.cards('CaRdId').getFieldValue('closed');
   */
  getFieldValue(field: CardField): Promise<any> {
    return this.httpGet(`/${field}`);
  }

  /**
   * @api {get} /cards/:cardId/actions getActionsForCard
   * @apiVersion 1.0.0
   * @apiName getActionsForCard
   * @apiDescription Gets the actions associated with the specified card.
   * @apiGroup card
   * @apiPermission read
   *
   * @apiUse ActionTypesFilter
   * @apiParam {Boolean} [entities=false]
   *    Include <code>entities</code> data in the response.
   * @apiParam {Boolean} [display=false]
   *    Include <code>display</code> data in the response.
   * @apiParam {String[]="all","data","date","idMemberCreator","type"} [fields='"all"']
   *    Action fields to include in the response, can either be <code>"all"</code> or
   *    an array of field names.
   * @apiParam {number{0-1000}} [limit=50]
   *    Limit to impose on actions included in response.
   * @apiParam {String="list","count","minimal"} [format='"list"']
   *    Format for returning actions in the response.
   * @apiParam {String} [since]
   *    Starting date for actions to include in the response.  Valid values are
   *    a date, <code>null</code> or <code>"lastView"</code>.
   * @apiParam {Date} [before]
   *    End date for actions to include in the response.
   * @apiParam {number{0-1000}} [page=0]
   *    Page of data to return in response.
   * @apiParam {String} [idModels]
   *    Only return actions related to these model ids.
   * @apiParam {Boolean} [member=true]
   *    Indicates if member fields should be included in response.
   * @apiParam {String[]="all","avatarHash","bio","bioData","confirmed",
   * "fullName","idPremOrgsAdmin","initials","memberType","products","status",
   * "url","username"} [memberFields='["avatarHash", "fullName", "initials", "username"]']
   *    Member fields to include in response, can either be <code>"all"</code> or
   *    an array of field names.
   * @apiParam {Boolean} [memberCreator=true]
   *    Indicates if member creator fields should be included in response.
   * @apiParam {String[]="all","avatarHash","bio","bioData","confirmed","fullName",
   * "idPremOrgsAdmin","initials","memberType","products","status","url",
   * "username"} [memberCreatorFields='["avatarHash", "fullName", "initials", "username"]']
   *    Member creator fields to include in response, can either be <code>"all"</code> or
   *    an array of field names.
   * @apiExample {js} Example:
   * trello.cards('CaRdId').actions().getActions({...});
   */
  actions() {
    return new Action(this.config, `${this.routePath}/actions`);
  }

  /**
   * @api {get} /cards/:cardId/attachments getAttachmentsInCard
   * @apiVersion 1.0.0
   * @apiName getAttachmentsInCard
   * @apiDescription Gets the attachments associated with the specified card.
   * @apiGroup card
   * @apiPermission read
   *
   * @apiParam {String[]="all","badges","checkItemStates","closed","dateLastActivity",
   * "desc","descData","due","email","idAttachmentCover","idBoard","idChecklists",
   * "idLabels","idList","idMembers","idMembersVoted","idShort","labels",
   * "manualCoverAttachment","name","pos","shortLink","shortUrl",
   * "subscribed","url"} field
   *    Card field to get value for.
   * @apiExample {js} Example:
   trello.cards('CaRdId').getFieldValue('closed');
   */
  attachments(attachmentId?: string = '') {
    return new Attachment(
      this.config,
      `${this.routePath}/attachments/${attachmentId}`,
    );
  }

  board() {
    return new Board(this.config, `${this.routePath}/board`);
  }

  checkItemStates() {
    return new CheckItem(this.config, `${this.routePath}/checkItemStates`);
  }

  checklist(checklistId: string) {
    return new Checklist(
      this.config,
      `${this.routePath}/checklist/${checklistId}`,
    );
  }

  checklists(checklistId?: string = '') {
    return new Checklist(
      this.config,
      `${this.routePath}/checklists/${checklistId}`,
    );
  }

  checkItem(checkItemId: string) {
    return new CheckItem(
      this.config,
      `${this.routePath}/checkItem/${checkItemId}`,
    );
  }

  comments(commentId?: string = '') {
    return new Comment(this.config, `${this.routePath}/actions/${commentId}`);
  }

  labels() {
    return new Label(this.config, `${this.routePath}/labels`);
  }

  list() {
    return new List(this.config, `${this.routePath}/list`);
  }

  members() {
    return new Member(this.config, `${this.routePath}/members`);
  }

  membersVoted(memberId?: string = '') {
    return new Member(this.config, `${this.routePath}/membersVoted`, memberId);
  }

  getPluginData(): Promise<any> {
    return this.httpGet('/pluginData');
  }

  stickers(stickerId?: string = '') {
    return new Sticker(this.config, `${this.routePath}/stickers/${stickerId}`);
  }

  updateCard(queryArgs?: {
    name?: string,
    desc?: string,
    closed?: boolean,
    idMembers?: Array<string>,
    idAttachmentCover?: string,
    idList?: string,
    idLabels?: Array<string>,
    idBoard?: string,
    pos?: PositionNumbered,
    due?: ?Date,
    dueComplete?: boolean,
    subscribed?: boolean,
  }): Promise<any> {
    return this.httpPut('/', queryArgs);
  }

  updateClosedStatus(value: boolean): Promise<any> {
    return this.httpPut('/closed', { value });
  }

  updateDescription(value: string): Promise<any> {
    return this.httpPut('/desc', { value });
  }

  updateDueDate(value: ?Date): Promise<any> {
    return this.httpPut('/due', { value });
  }

  updateDueComplete(value: boolean): Promise<any> {
    return this.httpPut('/dueComplete', { value });
  }

  /**
   * Update the Id of the image attachment of this card to use as its cover.
   * @example PUT /1/cards/:cardId/idAttachmentCover
   * @see {@link https://developers.trello.com/advanced-reference/card#put-1-cards-card-id-or-shortlink-idattachmentcover}
   */
  updateAttachmentCoverImage(idAttachmentCover: string): Promise<any> {
    return this.httpPut('/idAttachmentCover', { value: idAttachmentCover });
  }

  moveToBoard(
    boardId: string,
    queryArgs?: {
      idList?: string,
    },
  ): Promise<any> {
    return this.httpPut('/idBoard', { value: boardId, ...queryArgs });
  }

  moveToList(listId: string): Promise<any> {
    return this.httpPut('/idList', { value: listId });
  }

  associateMembers(memberIds: Array<string>): Promise<any> {
    return this.httpPut('/idMembers', { value: memberIds });
  }

  updateName(value: string): Promise<any> {
    return this.httpPut('/name', { value });
  }

  updatePosition(value: PositionNumbered): Promise<any> {
    return this.httpPut('/pos', { value });
  }

  updateSubscribed(value: boolean): Promise<any> {
    return this.httpPut('/subscribed', { value });
  }

  addCard(
    queryArgs:
      | {
          idList: string,
          name?: string,
          desc?: string,
          pos?: PositionNumbered,
          due?: ?Date,
          dueComplete?: boolean,
          idMembers?: Array<string>,
          idLabels?: Array<string>,
          urlSource?: ?string,
          fileSource?: Object,
          idCardSource?: string,
          keepFromSource?: KeepFromSourceField | Array<KeepFromSourceField>,
        }
      | {
          // These are for adding a card from a List.
          name: string,
          desc?: string,
          labels?: ArgumentGroup<LabelColor>,
          idMembers?: Array<string>,
          due?: ?Date,
        },
  ): Promise<any> {
    return this.httpPost('/', queryArgs);
  }

  associateLabel(labelId: string): Promise<any> {
    return this.httpPost('/idLabels', { value: labelId });
  }

  /* istanbul ignore next: Requires special permissions */
  associateMember(memberId: string): Promise<any> {
    return this.httpPost('/idMembers', { value: memberId });
  }

  markAssociatedNotificationsRead(): Promise<any> {
    return this.httpPost('/markAssociatedNotificationsRead');
  }

  deleteCard(): Promise<any> {
    return this.httpDelete('/');
  }

  dissociateMember(memberId: string): Promise<any> {
    return this.httpDelete(`/idMembers/${memberId}`);
  }

  dissociateLabel(labelId: string): Promise<any> {
    return this.httpDelete(`/idLabels/${labelId}`);
  }
}
