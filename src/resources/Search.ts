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
  public performSearch(params: {
    query: string;
    boardFields?: ArgumentGroup<BoardField>;
    boardsLimit?: number;
    cardAttachments?: AttachmentFilter;
    cardBoard?: boolean;
    cardFields?: ArgumentGroup<CardField>;
    cardList?: boolean;
    cardMembers?: boolean;
    cardsLimit?: number;
    cardsPage?: number;
    cardStickers?: boolean;
    idBoards?: "mine" | string[];
    idCards?: string[];
    idOrganizations?: string[];
    memberFields?: ArgumentGroup<MemberField>;
    membersLimit?: number;
    modelTypes?: ArgumentGroup<ModelType>;
    organizationFields?: ArgumentGroup<OrganizationField>;
    organizationsLimit?: number;
    partial?: boolean;
  }): Promise<unknown> {
    return this.apiGet("/", params);
  }

  public searchMembers(params: {
    query: string;
    idBoard?: string | null;
    idOrganization?: string | null;
    limit?: number;
    onlyOrgMembers?: boolean;
  }): Promise<unknown> {
    return this.apiGet("/members", params);
  }
}
