import Action from "./resources/Action";
import Batch from "./resources/Batch";
import Board from "./resources/Board";
import Card from "./resources/Card";
import Checklist from "./resources/Checklist";
import Enterprise from "./resources/Enterprise";
import Label from "./resources/Label";
import List from "./resources/List";
import Member from "./resources/Member";
import Notification from "./resources/Notification";
import Organization from "./resources/Organization";
import Search from "./resources/Search";
import Token from "./resources/Token";
import Type from "./resources/Type";
import Webhook from "./resources/Webhook";
import { Config } from "./typeDefs";

export class Trello {
  public config: Config;

  public constructor(config: Config) {
    this.config = config;
  }

  public actions(actionId: string = ""): Action {
    return new Action(this.config, `/actions/${actionId}`);
  }

  public batch(): Batch {
    return new Batch(this.config, "/batch");
  }

  public boards(boardId: string = ""): Board {
    return new Board(this.config, `/boards/${boardId}`);
  }

  public cards(cardId: string = ""): Card {
    return new Card(this.config, `/cards/${cardId}`);
  }

  public checklists(checklistId: string = ""): Checklist {
    return new Checklist(this.config, `/checklists/${checklistId}`);
  }

  /* istanbul ignore next: I can't test these with my current membership level. */
  public enterprises(enterpriseId: string = ""): Enterprise {
    return new Enterprise(this.config, `/enterprise/${enterpriseId}`);
  }

  public labels(labelId: string = ""): Label {
    return new Label(this.config, `/labels/${labelId}`);
  }

  public lists(listId: string = ""): List {
    return new List(this.config, `/lists/${listId}`);
  }

  public members(memberIdOrUsername: string = ""): Member {
    return new Member(this.config, `/members/${memberIdOrUsername}`);
  }

  /* istanbul ignore next: Need to figure out how to trigger Notifications. */
  public notifications(notificationId: string = ""): Notification {
    return new Notification(this.config, `/notifications/${notificationId}`);
  }

  public organizations(orgIdOrName: string = ""): Organization {
    return new Organization(this.config, `/organizations/${orgIdOrName}`);
  }

  public search(): Search {
    return new Search(this.config, "/search");
  }

  public tokens(tokenName: string = ""): Token {
    return new Token(this.config, `/tokens/${tokenName}`);
  }

  public types(): Type {
    return new Type(this.config, "/types");
  }

  /* istanbul ignore next: Need a valid callback URL to create Webhooks. */
  public webhooks(webhookId: string = ""): Webhook {
    return new Webhook(this.config, `/webhooks/${webhookId}`);
  }
}
