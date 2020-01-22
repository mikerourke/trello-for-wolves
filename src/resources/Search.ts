import { BaseResource } from "./BaseResource";
import { AttachmentFilter } from "./Attachment";
import { BoardField } from "./Board";
import { CardField } from "./Card";
import { MemberField } from "./Member";
import { OrganizationField } from "./Organization";
import { ArgumentGroup } from "../typeDefs";

export type ModelType =
  | "actions"
  | "boards"
  | "cards"
  | "members"
  | "organizations";

export class Search extends BaseResource {
  public performSearch(options: {
    query: string;
    idBoards?: "mine" | string[];
    idOrganizations?: string[];
    idCards?: string[];
    modelTypes?: ArgumentGroup<ModelType>;
    boardFields?: ArgumentGroup<BoardField>;
    boardsLimit?: number;
    cardFields?: ArgumentGroup<CardField>;
    cardsLimit?: number;
    cardsPage?: number;
    cardBoard?: boolean;
    cardList?: boolean;
    cardMembers?: boolean;
    cardStickers?: boolean;
    cardAttachments?: AttachmentFilter;
    organizationFields?: ArgumentGroup<OrganizationField>;
    organizationsLimit?: number;
    memberFields?: ArgumentGroup<MemberField>;
    membersLimit?: number;
    partial?: boolean;
  }): Promise<unknown> {
    return this.httpGet("/", options);
  }

  public searchMembers(options: {
    query: string;
    limit?: number;
    idBoard?: string | null;
    idOrganization?: string | null;
    onlyOrgMembers?: boolean;
  }): Promise<unknown> {
    return this.httpGet("/members", options);
  }
}
