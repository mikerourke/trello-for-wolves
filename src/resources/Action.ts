import { BaseResource } from "./BaseResource";
import { Board } from "./Board";
import { Card } from "./Card";
import { List } from "./List";
import { Member, MemberField } from "./Member";
import { Organization } from "./Organization";
import { ArgumentGroup, FilterDate, Format } from "../typeDefs";

export type ActionField = "data" | "date" | "idMemberCreator" | "type";

/**
 * These actions only apply to List resources.
 */
export type ActionListFilter =
  | "commentCard"
  | "convertToCardFromCheckItem"
  | "copyCard"
  | "createCard"
  | "createList"
  | "deleteCard"
  | "emailCard"
  | "updateCard"
  | "updateCard:closed"
  | "updateCard:desc"
  | "updateCard:idList"
  | "updateCard:name"
  | "updateList"
  | "updateList:closed"
  | "updateList:name";

type ActionSingleFilter =
  | "addAttachmentToCard"
  | "addChecklistToCard"
  | "addMemberToBoard"
  | "addMemberToCard"
  | "addMemberToOrganization"
  | "addToOrganizationBoard"
  | "copyBoard"
  | "copyCommentCard"
  | "createBoard"
  | "createList"
  | "createOrganization"
  | "deleteAttachmentFromCard"
  | "deleteBoardInvitation"
  | "deleteOrganizationInvitation"
  | "disablePowerUp"
  | "enablePowerUp"
  | "makeAdminOfBoard"
  | "makeNormalMemberOfBoard"
  | "makeNormalMemberOfOrganization"
  | "makeObserverOfBoard"
  | "memberJoinedTrello"
  | "moveCardFromBoard"
  | "moveCardToBoard"
  | "moveListFromBoard"
  | "moveListToBoard"
  | "removeChecklistFromCard"
  | "removeFromOrganizationBoard"
  | "removeMemberFromCard"
  | "unconfirmedBoardInvitation"
  | "unconfirmedOrganizationInvitation"
  | "updateBoard"
  | "updateCheckItemStateOnCard"
  | "updateChecklist"
  | "updateMember"
  | "updateOrganization";

export type ActionFilter = ActionSingleFilter & ActionListFilter;

export class Action extends BaseResource {
  public getActions(params?: {
    before?: FilterDate;
    display?: boolean;
    entities?: boolean;
    fields?: ArgumentGroup<ActionField>;
    filter?: ArgumentGroup<ActionFilter>;
    format?: Format;
    idModels?: string;
    limit?: number;
    member?: boolean;
    memberCreator?: boolean;
    memberCreatorFields?: ArgumentGroup<MemberField>;
    memberFields?: ArgumentGroup<MemberField>;
    page?: number; // Not allowed for Card resources
    since?: FilterDate;
  }): Promise<unknown> {
    return this.apiGet("/", params);
  }

  public getAction(params?: {
    display?: boolean;
    entities?: boolean;
    fields?: ArgumentGroup<ActionField>;
    member?: boolean;
    memberCreator?: boolean;
    memberCreatorFields?: ArgumentGroup<MemberField>;
    memberFields?: ArgumentGroup<MemberField>;
  }): Promise<unknown> {
    return this.apiGet("/", params);
  }

  public getFieldValue(field: ActionField): Promise<unknown> {
    return this.apiGet(`/${field}`);
  }

  public getDisplay(): Promise<unknown> {
    return this.apiGet("/display");
  }

  public getEntities(): Promise<unknown> {
    return this.apiGet("/entities");
  }

  public updateAction(params?: { text?: string }): Promise<unknown> {
    return this.apiPut("/", params);
  }

  public updateText(value: string): Promise<unknown> {
    return this.apiPut("/text", { value });
  }

  public deleteAction(): Promise<unknown> {
    return this.apiDelete("/");
  }

  public board(): Board {
    return new Board(this.config, `${this.baseEndpoint}/board`);
  }

  public card(): Card {
    return new Card(this.config, `${this.baseEndpoint}/card`);
  }

  public list(): List {
    return new List(this.config, `${this.baseEndpoint}/list`);
  }

  public member(): Member {
    return new Member(this.config, `${this.baseEndpoint}/member`);
  }

  public memberCreator(): Member {
    return new Member(this.config, `${this.baseEndpoint}/memberCreator`);
  }

  public organization(): Organization {
    return new Organization(this.config, `${this.baseEndpoint}/organization`);
  }
}
