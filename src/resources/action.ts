import BaseResource from './baseResource';
import Board from './board';
import Card from './card';
import List from './list';
import Member, { MemberField } from './member';
import Organization from './organization';
import { ArgumentGroup, FilterDate, Format } from '../types';

export type ActionField = 'data' | 'date' | 'idMemberCreator' | 'type';

// These actions only apply to List resources:
export type ActionListFilter =
  | 'commentCard'
  | 'convertToCardFromCheckItem'
  | 'copyCard'
  | 'createCard'
  | 'createList'
  | 'deleteCard'
  | 'emailCard'
  | 'updateCard'
  | 'updateCard:closed'
  | 'updateCard:desc'
  | 'updateCard:idList'
  | 'updateCard:name'
  | 'updateList'
  | 'updateList:closed'
  | 'updateList:name';

export type ActionFilter =
  | ActionListFilter
  | 'addAttachmentToCard'
  | 'addChecklistToCard'
  | 'addMemberToBoard'
  | 'addMemberToCard'
  | 'addMemberToOrganization'
  | 'addToOrganizationBoard'
  | 'copyBoard'
  | 'copyCommentCard'
  | 'createBoard'
  | 'createList'
  | 'createOrganization'
  | 'deleteAttachmentFromCard'
  | 'deleteBoardInvitation'
  | 'deleteOrganizationInvitation'
  | 'disablePowerUp'
  | 'enablePowerUp'
  | 'makeAdminOfBoard'
  | 'makeNormalMemberOfBoard'
  | 'makeNormalMemberOfOrganization'
  | 'makeObserverOfBoard'
  | 'memberJoinedTrello'
  | 'moveCardFromBoard'
  | 'moveCardToBoard'
  | 'moveListFromBoard'
  | 'moveListToBoard'
  | 'removeChecklistFromCard'
  | 'removeFromOrganizationBoard'
  | 'removeMemberFromCard'
  | 'unconfirmedBoardInvitation'
  | 'unconfirmedOrganizationInvitation'
  | 'updateBoard'
  | 'updateCheckItemStateOnCard'
  | 'updateChecklist'
  | 'updateMember'
  | 'updateOrganization';

export interface ActionNestedResource {
  entities?: boolean;
  display?: boolean;
  filter?: ActionFilter;
  fields?: ArgumentGroup<ActionField>;
  limit?: number;
  format?: Format;
  since?: FilterDate;
  before?: FilterDate;
  page?: number;
  idModels?: string[];
  member?: boolean;
  memberFields?: ArgumentGroup<MemberField>;
  memberCreator?: boolean;
  memberCreatorFields?: ArgumentGroup<MemberField>;
}

/**
 * @namespace Action
 */
export default class Action extends BaseResource {
  public getActions = (queryArgs?: ActionNestedResource): Promise<any> =>
    this.httpGet('/', queryArgs);

  public getAction = (queryArgs?: {
    display?: boolean;
    entities?: boolean;
    fields?: ArgumentGroup<ActionField>;
    member?: boolean;
    memberFields?: ArgumentGroup<MemberField>;
    memberCreator?: boolean;
    memberCreatorFields?: ArgumentGroup<MemberField>;
  }): Promise<any> => this.httpGet('/', queryArgs);

  public getFieldValue = (field: ActionField): Promise<any> =>
    this.httpGet(`/${field}`);

  public board = () => new Board(this.config, `${this.routePath}/board`);

  public card = () => new Card(this.config, `${this.routePath}/card`);

  public getDisplay = (): Promise<any> => this.httpGet('/display');

  public getEntities = (): Promise<any> => this.httpGet('/entities');

  public list = () => new List(this.config, `${this.routePath}/list`);

  public member = () => new Member(this.config, `${this.routePath}/member`);

  public memberCreator = () =>
    new Member(this.config, `${this.routePath}/memberCreator`);

  public organization = () =>
    new Organization(this.config, `${this.routePath}/organization`);

  public updateAction = (queryArgs?: { text?: string }): Promise<any> =>
    this.httpPut('/', queryArgs);

  public updateText = (value: string): Promise<any> =>
    this.httpPut('/text', { value });

  public deleteAction = (): Promise<any> => this.httpDelete('/');
}
