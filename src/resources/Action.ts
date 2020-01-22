import { BaseResource } from "./BaseResource";
import { Board } from "./Board";
import { Card } from "./Card";
import { List } from "./List";
import { Member, MemberField } from "./Member";
import { Organization } from "./Organization";
import { ArgumentGroup, FilterDate, Format } from "../typeDefs";

export type ActionField = "data" | "date" | "idMemberCreator" | "type";

// These actions only apply to List resources:
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
  public getActions(options?: {
    entities?: boolean;
    display?: boolean;
    filter?: ArgumentGroup<ActionFilter>;
    fields?: ArgumentGroup<ActionField>;
    limit?: number;
    format?: Format;
    since?: FilterDate;
    before?: FilterDate;
    page?: number; // Not allowed for Card resources
    idModels?: string;
    member?: boolean;
    memberFields?: ArgumentGroup<MemberField>;
    memberCreator?: boolean;
    memberCreatorFields?: ArgumentGroup<MemberField>;
  }): Promise<unknown> {
    return this.httpGet("/", options);
  }

  public getAction(options?: {
    display?: boolean;
    entities?: boolean;
    fields?: ArgumentGroup<ActionField>;
    member?: boolean;
    memberFields?: ArgumentGroup<MemberField>;
    memberCreator?: boolean;
    memberCreatorFields?: ArgumentGroup<MemberField>;
  }): Promise<unknown> {
    return this.httpGet("/", options);
  }

  public getFieldValue(field: ActionField): Promise<unknown> {
    return this.httpGet(`/${field}`);
  }

  public board(): Board {
    return new Board(this.config, `${this.routePath}/board`);
  }

  public card(): Card {
    return new Card(this.config, `${this.routePath}/card`);
  }

  public getDisplay(): Promise<unknown> {
    return this.httpGet("/display");
  }

  public getEntities(): Promise<unknown> {
    return this.httpGet("/entities");
  }

  public list(): List {
    return new List(this.config, `${this.routePath}/list`);
  }

  public member(): Member {
    return new Member(this.config, `${this.routePath}/member`);
  }

  public memberCreator(): Member {
    return new Member(this.config, `${this.routePath}/memberCreator`);
  }

  public organization(): Organization {
    return new Organization(this.config, `${this.routePath}/organization`);
  }

  public updateAction(options?: { text?: string }): Promise<unknown> {
    return this.httpPut("/", options);
  }

  public updateText(value: string): Promise<unknown> {
    return this.httpPut("/text", { value });
  }

  public deleteAction(): Promise<unknown> {
    return this.httpDelete("/");
  }
}
