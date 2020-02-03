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
import { fetchFromApi } from "./utils/fetchFromApi";
import { AnyParams, TrelloConfig, TypedFetch } from "./typeDefs";

export { TrelloForWolvesError } from "./TrelloForWolvesError";
export * from "./resources/Action";
export * from "./resources/Attachment";
export * from "./resources/Batch";
export * from "./resources/Board";
export * from "./resources/BoardBackgrounds";
export * from "./resources/BoardMyPrefs";
export * from "./resources/BoardPref";
export * from "./resources/BoardStar";
export * from "./resources/Card";
export * from "./resources/CheckItem";
export * from "./resources/Checklist";
export * from "./resources/Comment";
export * from "./resources/CustomEmoji";
export * from "./resources/CustomField";
export * from "./resources/CustomFieldOption";
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
export * from "./resources/Stickers";
export * from "./resources/Token";
export * from "./resources/Type";
export * from "./resources/Webhook";
export * from "./typeDefs";

export class Trello {
  public trelloConfig: TrelloConfig;

  public constructor(trelloConfig: TrelloConfig) {
    this.trelloConfig = trelloConfig;
  }

  public makeApiRequest(
    endpoint: string,
    paramsByName?: unknown,
    fetchConfig: RequestInit | null = null,
  ): TypedFetch<unknown> {
    return fetchFromApi({
      endpoint,
      trelloConfig: this.trelloConfig,
      fetchConfig,
      paramsByName: paramsByName as AnyParams,
    });
  }

  public actions(idAction: string): Action {
    return new Action(this.trelloConfig, [], "actions", {
      identifier: idAction,
    });
  }

  public batch(): Batch {
    return new Batch(this.trelloConfig, [], "batch");
  }

  public boards(idBoard: string = ""): Board {
    return new Board(this.trelloConfig, [], "boards", {
      identifier: idBoard,
    });
  }

  public cards(idCard: string = ""): Card {
    return new Card(this.trelloConfig, [], "cards", {
      identifier: idCard,
    });
  }

  public checklists(idChecklist: string = ""): Checklist {
    return new Checklist(this.trelloConfig, [], "checklists", {
      identifier: idChecklist,
    });
  }

  public customFields(idCustomField: string = ""): CustomField {
    return new CustomField(this.trelloConfig, [], "customFields", {
      identifier: idCustomField,
    });
  }

  public emoji(): Emoji {
    return new Emoji(this.trelloConfig, [], "emoji");
  }

  public enterprises(idEnterprise: string): Enterprise {
    return new Enterprise(this.trelloConfig, [], "enterprises", {
      identifier: idEnterprise,
    });
  }

  public labels(idLabel: string = ""): Label {
    return new Label(this.trelloConfig, [], "labels", {
      identifier: idLabel,
    });
  }

  public lists(idList: string = ""): List {
    return new List(this.trelloConfig, [], "lists", {
      identifier: idList,
    });
  }

  public members(idMemberOrUserName: string = ""): Member {
    return new Member(this.trelloConfig, [], "members", {
      identifier: idMemberOrUserName,
    });
  }

  public notifications(idNotification: string = ""): Notification {
    return new Notification(this.trelloConfig, [], "notifications", {
      identifier: idNotification,
    });
  }

  public organizations(idOrganizationOrName: string = ""): Organization {
    return new Organization(this.trelloConfig, [], "organizations", {
      identifier: idOrganizationOrName,
    });
  }

  public plugins(idPlugin: string = ""): Plugin {
    return new Plugin(this.trelloConfig, [], "plugins", {
      identifier: idPlugin,
    });
  }

  public search(): Search {
    return new Search(this.trelloConfig, [], "search");
  }

  public tokens(tokenName: string): Token {
    return new Token(this.trelloConfig, [], "tokens", {
      identifier: tokenName,
    });
  }

  public types(idOrganizationOrUser: string): Type {
    return new Type(this.trelloConfig, [], "types", {
      identifier: idOrganizationOrUser,
    });
  }

  public webhooks(idWebhook: string = ""): Webhook {
    return new Webhook(this.trelloConfig, [], "webhooks", {
      identifier: idWebhook,
    });
  }
}
