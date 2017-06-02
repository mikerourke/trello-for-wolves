/* @flow */

/* Internal dependencies */
import BaseResource from '../base-resource';

/* Types */
import type {
  ActionInclusionQueryArgs,
  ActionField,
  ActionType,
  AllOrNone,
  ArgumentGroup,
  Auth,
  AvatarSourceField,
  BoardBackgroundBrightness,
  BoardBackgroundField,
  BoardBackgroundFilter,
  BoardField,
  BoardFilter,
  BoardInclusionQueryArgs,
  CardAttachmentInclusionQueryArgs,
  CardInclusionQueryArgs,
  DeltasQueryArgs,
  FieldsQueryArg,
  FileQueryArg,
  FilterDate,
  FilterQueryArg,
  Format,
  ListField,
  ListStatus,
  MemberEveryField,
  MemberField,
  MembershipFilter,
  NotificationField,
  NotificationType,
  OrganizationField,
  OrganizationFilter,
  PositionNumbered,
  ResourceConstructorOptions,
  ValueQueryArg,
} from '../types';

type BoardBackgroundBrightnessQueryArgs = {
  tile?: boolean,
  brightness?: BoardBackgroundBrightness,
};

export default class Member extends BaseResource {
  constructor(
    auth: Auth,
    options?: ResourceConstructorOptions = {},
  ) {
    super(auth, 'member', options);
  }

  get(queryArgs?: ActionInclusionQueryArgs &
    BoardInclusionQueryArgs &
    CardAttachmentInclusionQueryArgs &
    CardInclusionQueryArgs &
    FieldsQueryArg<MemberEveryField> &
    {
      actionsEntities?: boolean,
      actionsDisplay?: boolean,
      actionsLimit?: number,
      actionsSince?: FilterDate,
      actionBefore?: ?Date,
      cardMembers?: boolean,
      cardMemberFields?: ArgumentGroup<MemberField>,
      cardStickers?: boolean,
      boards?: ArgumentGroup<BoardFilter>,
      boardActions?: ArgumentGroup<ActionType>,
      boardActionsEntities?: boolean,
      boardActionsDisplay?: boolean,
      boardActionsFormat?: Format,
      boardActionsSince?: FilterDate,
      boardActionsLimit?: number,
      boardActionFields?: ArgumentGroup<ActionField>,
      boardLists?: ArgumentGroup<ListStatus>,
      boardMemberships?: ArgumentGroup<MembershipFilter>,
      boardOrganization?: boolean,
      boardOrganizationFields?: ArgumentGroup<OrganizationField>,
      boardsInvited?: ArgumentGroup<BoardFilter>,
      boardsInvitedFields?: ArgumentGroup<BoardField>,
      boardStars?: boolean,
      savedSearches?: boolean,
      organizations?: ArgumentGroup<OrganizationFilter>,
      organizationFields?: ArgumentGroup<OrganizationField>,
      organizationPaidAccount?: boolean,
      organizationsInvited?: OrganizationFilter,
      organizationsInvitedFields?: ArgumentGroup<OrganizationField>,
      notifications?: ArgumentGroup<NotificationType>,
      notificationsEntities?: boolean,
      notificationsDisplay?: boolean,
      notificationsLimit?: number,
      notificationFields?: ArgumentGroup<NotificationField>,
      notificationMemberCreator?: boolean,
      notificationMemberCreatorFields?: ArgumentGroup<MemberField>,
      notificationBefore?: ?string,
      notificationSince?: ?string,
      tokens?: AllOrNone,
      paidAccount?: boolean,
      boardBackgrounds?: ArgumentGroup<BoardBackgroundField>,
      customBoardBackgrounds?: AllOrNone,
      customStickers?: AllOrNone,
      customEmoji?: AllOrNone,
    } = {},
  ): Promise<*> {
    const idList = this.instanceId;
    const updatedArgs = (this.parentPath)
      ? { idList, ...queryArgs }
      : queryArgs;
    return this.httpGet('/', updatedArgs);
  }

  getAll(queryArgs?: FieldsQueryArg<ListField> &
    {
      limit?: number,
    } = {},
  ): Promise<*> {
    return this.httpGet('/', queryArgs);
  }

  getFieldValue(field: MemberEveryField): Promise<*> {
    return this.httpGet(`/${field}`);
  }

  getBoardBackground(
    idBoardBackground: string,
    queryArgs?: FieldsQueryArg<BoardBackgroundField> = {},
  ): Promise<*> {
    return this.httpGet(`/boardBackgrounds/${idBoardBackground}`, queryArgs);
  }

  getBoardBackgrounds(
    queryArgs?: FilterQueryArg<BoardBackgroundFilter> = {},
  ): Promise<*> {
    return this.httpGet('/boardBackgrounds', queryArgs);
  }

  getBoardStar(idBoardStar: string): Promise<*> {
    return this.httpGet(`/boardStars/${idBoardStar}`);
  }

  getBoardStars(): Promise<*> {
    return this.httpGet('/boardStars');
  }

  getBoardInvited(field: BoardField): Promise<*> {
    return this.httpGet(`/boardsInvited/${field}`);
  }

  getBoardsInvited(queryArgs?: FieldsQueryArg<BoardField>): Promise<*> {
    return this.httpGet('/boardsInvited', queryArgs);
  }

  getCustomBoardBackground(
    idBoardBackground: string,
    queryArgs?: FieldsQueryArg<BoardBackgroundField> = {},
  ): Promise<*> {
    return this.httpGet(`/boardBackgrounds/${idBoardBackground}`, queryArgs);
  }

  getCustomBoardBackgrounds(
    queryArgs?: FilterQueryArg<BoardBackgroundFilter> = {},
  ): Promise<*> {
    return this.httpGet('/boardBackgrounds', queryArgs);
  }

  getCustomEmoji(
    idEmoji: string,
    queryArgs?: FieldsQueryArg<'name' | 'url'> = {},
  ): Promise<*> {
    return this.httpGet(`/customEmoji/${idEmoji}`, queryArgs);
  }

  getCustomEmojis(queryArgs?: FilterQueryArg<AllOrNone> = {}): Promise<*> {
    return this.httpGet('/customEmoji', queryArgs);
  }

  getCustomSticker(
    idSticker: string,
    queryArgs?: FieldsQueryArg<'scaled' | 'url'> = {},
  ): Promise<*> {
    return this.httpGet(`/customSticker/${idSticker}`, queryArgs);
  }

  getCustomStickers(queryArgs?: FilterQueryArg<AllOrNone> = {}): Promise<*> {
    return this.httpGet('/customSticker', queryArgs);
  }

  getDeltas(queryArgs: DeltasQueryArgs): Promise<*> {
    return this.httpGet('/deltas', queryArgs)
  }

  updateMember(queryArgs?: {
    fullName?: string,
    initials?: string,
    username?: string,
    bio?: string,
    avatarSource?: AvatarSourceField,
    prefs: {
      colorBlind?: boolean,
      locale?: string,
      minutesBetweenSummaries?: number,
    },
    separator?: string,
  } = {}): Promise<*> {
    return this.httpPut('/', { ...queryArgs, separator: '/' });
  }

  updateAvatarSource(queryArgs: ValueQueryArg<AvatarSourceField>): Promise<*> {
    return this.httpPut('/avatarSource', queryArgs);
  }

  updateBio(queryArgs: ValueQueryArg<string>): Promise<*> {
    return this.httpPut('/bio', queryArgs);
  }

  updateBoardBackground(
    idBoardBackground: string,
    queryArgs?: BoardBackgroundBrightnessQueryArgs = {},
  ): Promise<*> {
    return this.httpPut(`/boardBackgrounds/${idBoardBackground}`, queryArgs);
  }

  updateBoardStar(
    idBoardStar: string,
    queryArgs?: {
      idBoard?: string,
      pos?: PositionNumbered,
    } = {},
  ): Promise<*> {
    return this.httpPut(`/boardStars/${idBoardStar}`, queryArgs);
  }

  updateBoardStarBoard(
    idBoardStar: string,
    queryArgs: ValueQueryArg<string>,
  ): Promise<*> {
    return this.httpPut(`/boardStars/${idBoardStar}/idBoard`, queryArgs);
  }

  updateBoardStarPosition(
    idBoardStar: string,
    queryArgs: ValueQueryArg<PositionNumbered>,
  ): Promise<*> {
    return this.httpPut(`/boardStars/${idBoardStar}/pos`, queryArgs);
  }

  updateCustomBoardBackground(
    idBoardBackground: string,
    queryArgs?: BoardBackgroundBrightnessQueryArgs = {},
  ): Promise<*> {
    return this.httpPut(`/customBoardBackgrounds/${idBoardBackground}`,
      queryArgs);
  }

  updateFullName(queryArgs: ValueQueryArg<string>): Promise<*> {
    return this.httpPut('/fullName', queryArgs);
  }

  updateInitials(queryArgs: ValueQueryArg<string>): Promise<*> {
    return this.httpPut('/initials', queryArgs);
  }

  updateUsername(queryArgs: ValueQueryArg<string>): Promise<*> {
    return this.httpPut('/username', queryArgs);
  }

  addAvatar(queryArgs: FileQueryArg): Promise<*> {
    return this.httpPost('/avatar', queryArgs);
  }

  addBoardBackground(queryArgs: FileQueryArg): Promise<*> {
    return this.httpPost('/boardBackgrounds', queryArgs);
  }

  starBoard(queryArgs: {
    idBoard: string,
    pos: PositionNumbered,
  }): Promise<*> {
    return this.httpPost('/boardStars', queryArgs);
  }

  addCustomBoardBackground(queryArgs: FileQueryArg): Promise<*> {
    return this.httpPost('/customBoardBackgrounds', queryArgs);
  }

  addCustomEmoji(queryArgs: FileQueryArg & {
    name: string,
  }): Promise<*> {
    return this.httpPost('/customEmoji', queryArgs);
  }

  addCustomSticker(queryArgs: FileQueryArg): Promise<*> {
    return this.httpPost('/customStickers', queryArgs);
  }

  dismissOneTimeMessages(queryArgs: ValueQueryArg<string>): Promise<*> {
    return this.httpPost('/oneTimeMessagesDismissed', queryArgs);
  }
}
