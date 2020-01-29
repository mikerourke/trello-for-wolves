import "cross-fetch/polyfill";
import { Action } from "./resources/Action";
import { Batch } from "./resources/Batch";
import { Board } from "./resources/Board";
import { Card } from "./resources/Card";
import { Checklist } from "./resources/Checklist";
import { CustomField } from "./resources/CustomField";
import { Enterprise } from "./resources/Enterprise";
import { Label } from "./resources/Label";
import { List } from "./resources/List";
import { Member } from "./resources/Member";
import { Notification } from "./resources/Notification";
import { Organization } from "./resources/Organization";
import { Plugin } from "./resources/Plugin";
import { Emoji } from "./resources/Reaction";
import { Search } from "./resources/Search";
import { Token } from "./resources/Token";
import { Type } from "./resources/Type";
import { Webhook } from "./resources/Webhook";
import { Config } from "./typeDefs";

export * from "./resources/Action";
export * from "./resources/Attachment";
export * from "./resources/Batch";
export * from "./resources/Board";
export * from "./resources/BoardMyPrefs";
export * from "./resources/BoardStar";
export * from "./resources/Card";
export * from "./resources/CheckItem";
export * from "./resources/Checklist";
export * from "./resources/Comment";
export * from "./resources/CustomEmoji";
export * from "./resources/CustomField";
export * from "./resources/Enterprise";
export * from "./resources/Label";
export * from "./resources/List";
export * from "./resources/Member";
export * from "./resources/Membership";
export * from "./resources/Notification";
export * from "./resources/Organization";
export * from "./resources/OrganizationPref";
export * from "./resources/Plugin";
export * from "./resources/Reaction";
export * from "./resources/SavedSearch";
export * from "./resources/Search";
export * from "./resources/Sticker";
export * from "./resources/Token";
export * from "./resources/Type";
export * from "./resources/Webhook";
export * from "./typeDefs";

export class Trello {
  public config: Config;

  public constructor(config: Config) {
    this.config = config;
  }

  public actions(idAction: string = ""): Action {
    return new Action(this.config, [], "actions", {
      identifier: idAction,
    });
  }

  public batch(): Batch {
    return new Batch(this.config, [], "batch");
  }

  public boards(idBoard: string = ""): Board {
    return new Board(this.config, [], "boards", {
      identifier: idBoard,
    });
  }

  public cards(idCard: string = ""): Card {
    return new Card(this.config, [], "cards", {
      identifier: idCard,
    });
  }

  public checklists(idChecklist: string = ""): Checklist {
    return new Checklist(this.config, [], "checklists", {
      identifier: idChecklist,
    });
  }

  public customField(idCustomField: string = ""): CustomField {
    return new CustomField(this.config, [], "customFields", {
      identifier: idCustomField,
    });
  }

  public emoji(): Emoji {
    return new Emoji(this.config, [], "emoji");
  }

  public enterprises(idEnterprise: string = ""): Enterprise {
    return new Enterprise(this.config, [], "enterprise", {
      identifier: idEnterprise,
    });
  }

  public labels(idLabel: string = ""): Label {
    return new Label(this.config, [], "labels", {
      identifier: idLabel,
    });
  }

  public lists(idList: string = ""): List {
    return new List(this.config, [], "lists", {
      identifier: idList,
    });
  }

  public members(idMemberOrUserName: string = ""): Member {
    return new Member(this.config, [], "members", {
      identifier: idMemberOrUserName,
    });
  }

  public notifications(idNotification: string = ""): Notification {
    return new Notification(this.config, [], "notifications", {
      identifier: idNotification,
    });
  }

  public organizations(idOrganizationOrName: string = ""): Organization {
    return new Organization(this.config, [], "organizations", {
      identifier: idOrganizationOrName,
    });
  }

  public plugins(idPlugin: string = ""): Plugin {
    return new Plugin(this.config, [], "plugins", {
      identifier: idPlugin,
    });
  }

  public search(): Search {
    return new Search(this.config, [], "search", {});
  }

  public tokens(tokenName: string = ""): Token {
    return new Token(this.config, [], "tokens", {
      identifier: tokenName,
    });
  }

  public types(): Type {
    return new Type(this.config, [], "types", {});
  }

  public webhooks(idWebhook: string = ""): Webhook {
    return new Webhook(this.config, [], "webhooks", {
      identifier: idWebhook,
    });
  }
}
