import { TrelloForWolvesError } from "../TrelloForWolvesError";
import {
  AllOrFieldOrListOf,
  AttachmentField,
  AttachmentFilter,
  CardActionType,
  CardCoordinatesRecord,
  CardField,
  CardFilter,
  CardRecord,
  ColorName,
  DateValue,
  FieldOrListOf,
  FileUpload,
  KeepFromSourceField,
  MemberField,
  NestedActionsParams,
  NestedBoardParams,
  NestedChecklistsParams,
  NestedMembersParams,
  PositionOrFloat,
  StickerField,
  TypedFetch,
  ValueResponse,
} from "../typeDefs";
import { isEmpty } from "../utils/isEmpty";

import { Action } from "./Action";
import { Attachment } from "./Attachment";
import { BaseResource } from "./BaseResource";
import { Board } from "./Board";
import { CheckItem } from "./CheckItem";
import { Checklist } from "./Checklist";
import { Comment } from "./Comment";
import { CustomField } from "./CustomField";
import { CustomFieldOption } from "./CustomFieldOption";
import { Label } from "./Label";
import { List } from "./List";
import { Member } from "./Member";
import { Sticker } from "./Stickers";

export class Card extends BaseResource {
  public getCard(
    params?: {
      fields?: AllOrFieldOrListOf<CardField>;
      attachments?: AttachmentFilter;
      attachmentFields?: AllOrFieldOrListOf<AttachmentField>;
      membersVoted?: boolean;
      memberVotedFields?: AllOrFieldOrListOf<MemberField>;
      checkItemStates?: boolean;
      list?: boolean;
      pluginData?: boolean;
      stickers?: boolean;
      stickerFields?: AllOrFieldOrListOf<StickerField>;
      customFieldItems?: boolean;
    } & NestedActionsParams &
      NestedBoardParams &
      NestedChecklistsParams &
      NestedMembersParams,
  ): TypedFetch<CardRecord> {
    return this.apiGet("/", params as Record<string, unknown>);
  }

  public getCards(
    params?: {
      fields?: AllOrFieldOrListOf<CardField>;
      filter?: CardFilter;
      attachments?: AttachmentFilter;
      attachmentFields?: AllOrFieldOrListOf<AttachmentField>;
      checkItemStates?: boolean;
      pluginData?: boolean;
      stickers?: boolean;
      customFieldItems?: boolean;
    } & NestedActionsParams &
      NestedChecklistsParams &
      NestedMembersParams,
  ): TypedFetch<CardRecord[]> {
    return this.apiGet("/", params as Record<string, unknown>);
  }

  public getCardsFilteredBy(filter: CardFilter): TypedFetch<CardRecord[]> {
    return this.apiGet(`/${filter}`);
  }

  public getFieldValue<T>(field: CardField): TypedFetch<ValueResponse<T>> {
    return this.apiGet(`/${field}`);
  }

  public getPluginData(): TypedFetch<unknown> {
    return this.apiGet("/pluginData");
  }

  public addCard(params?: {
    name?: string;
    desc?: string;
    pos?: PositionOrFloat;
    due?: DateValue;
    dueComplete?: boolean;
    idList?: string;
    idMembers?: string[];
    idLabels?: string[];
    urlSource?: string | null;
    fileSource?: FileUpload;
    idCardSource?: string;
    keepFromSource?: FieldOrListOf<KeepFromSourceField>;
    labels?: AllOrFieldOrListOf<ColorName>;
    address?: string;
    locationName?: string;
    coordinates?: CardCoordinatesRecord | string;
  }): TypedFetch<CardRecord> {
    const validParams = isEmpty(params) ? {} : { ...params };

    if (this.isChildOf("list")) {
      validParams.idList = validParams.idList ?? this.identifier;
    }

    if (!validParams.idList) {
      throw new TrelloForWolvesError(
        `You must pass specify the "idList" param or pass a list ID to the lists() instance when calling addCard()`,
      );
    }

    return this.apiPost("/", { ...validParams, separator: "/" });
  }

  public updateCard(params: {
    name?: string;
    desc?: string;
    closed?: boolean;
    idMembers?: string[];
    idAttachmentCover?: string;
    idList?: string;
    idLabels?: string[];
    idBoard?: string;
    pos?: PositionOrFloat;
    due?: DateValue;
    dueComplete?: boolean;
    subscribed?: boolean;
    address?: string;
    locationName?: string;
    coordinates?: CardCoordinatesRecord | string;
  }): TypedFetch<CardRecord> {
    return this.apiPut("/", params);
  }

  public updateClosedStatus(value: boolean): TypedFetch<CardRecord> {
    return this.apiPut("/closed", { value });
  }

  public updateDescription(value: string): TypedFetch<CardRecord> {
    return this.apiPut("/desc", { value });
  }

  public updateDueDate(value: DateValue): TypedFetch<CardRecord> {
    return this.apiPut("/due", { value });
  }

  public updateDueComplete(value: boolean): TypedFetch<CardRecord> {
    return this.apiPut("/dueComplete", { value });
  }

  /**
   * Update the Id of the image attachment of this card to use as its cover.
   * @example PUT /1/cards/:cardId/idAttachmentCover
   * @see https://developers.trello.com/advanced-reference/card#put-1-cards-card-id-or-shortlink-idattachmentcover
   */
  public updateAttachmentCoverImage(
    idAttachmentCover: string,
  ): TypedFetch<unknown> {
    return this.apiPut("/idAttachmentCover", { value: idAttachmentCover });
  }

  public moveToBoard(
    idBoard: string,
    params?: {
      idList?: string;
    },
  ): TypedFetch<unknown> {
    return this.apiPut("/idBoard", { value: idBoard, ...params });
  }

  public moveToList(idList: string): TypedFetch<unknown> {
    return this.apiPut("/idList", { value: idList });
  }

  public updateName(value: string): TypedFetch<CardRecord> {
    return this.apiPut("/name", { value });
  }

  public updatePosition(value: PositionOrFloat): TypedFetch<CardRecord> {
    return this.apiPut("/pos", { value });
  }

  public updateSubscribed(value: boolean): TypedFetch<CardRecord> {
    return this.apiPut("/subscribed", { value });
  }

  public markAssociatedNotificationsRead(): TypedFetch<unknown> {
    return this.apiPost("/markAssociatedNotificationsRead");
  }

  public deleteCard(): TypedFetch<unknown> {
    return this.apiDelete("/");
  }

  public actions(): Action<CardActionType> {
    return new Action<CardActionType>(
      this.config,
      this.pathElements,
      "actions",
    );
  }

  public attachments(idAttachment: string = ""): Attachment {
    return new Attachment(this.config, this.pathElements, "attachments", {
      identifier: idAttachment,
    });
  }

  public board(): Board {
    return new Board(this.config, this.pathElements, "board");
  }

  public checkItem(idCheckItem: string): CheckItem {
    return new CheckItem(this.config, this.pathElements, "checkItem", {
      identifier: idCheckItem,
    });
  }

  public checkItemStates(): CheckItem {
    return new CheckItem(this.config, this.pathElements, "checkItemStates");
  }

  public checklist(idChecklist: string): Checklist {
    return new Checklist(this.config, this.pathElements, "checklist", {
      identifier: idChecklist,
    });
  }

  public checklists(idChecklist: string = ""): Checklist {
    return new Checklist(this.config, this.pathElements, "checklists", {
      identifier: idChecklist,
    });
  }

  public comments(idComment: string = ""): Comment {
    return new Comment(this.config, this.pathElements, "actions", {
      identifier: idComment,
    });
  }

  public customField(idCustomField: string): CustomField {
    const updatedPathElements = this.pathElements.reduce((acc, pathElement) => {
      if (pathElement === "cards") {
        return [...acc, "card"];
      }
      return [...acc, pathElement];
    }, [] as string[]);

    return new CustomField(this.config, updatedPathElements, "customField", {
      identifier: idCustomField,
    });
  }

  public customFieldItems(): CustomFieldOption {
    return new CustomFieldOption(
      this.config,
      this.pathElements,
      "customFieldItems",
    );
  }

  public labels(idLabel: string = ""): Label {
    return new Label(this.config, this.pathElements, "labels", {
      identifier: idLabel,
    });
  }

  public list(): List {
    return new List(this.config, this.pathElements, "list");
  }

  public members(idMember: string = ""): Member {
    return new Member(this.config, this.pathElements, "members", {
      identifier: idMember,
    });
  }

  public membersVoted(idMember: string = ""): Member {
    return new Member(this.config, this.pathElements, "membersVoted", {
      identifier: idMember,
    });
  }

  public stickers(idSticker: string = ""): Sticker {
    return new Sticker(this.config, this.pathElements, "stickers", {
      identifier: idSticker,
    });
  }
}
