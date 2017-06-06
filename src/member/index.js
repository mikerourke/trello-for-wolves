/* @flow */

/* Internal dependencies */
import BaseResource from '../base-resource';
import Action from '../action';
import Board from '../board';
import Card from '../card';
import Notification from '../notification';
import Organization from '../organization';

/* Types */
import type {
  ActionField,
  ActionFilter,
  ActionInclusionQueryArgs,
  ActionLimitsQueryArgs,
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
  LimitQueryArg,
  ListField,
  ListFilter,
  MemberEveryField,
  MemberField,
  MemberFilter,
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

  getMember(
    queryArgs?: ActionInclusionQueryArgs &
      ActionLimitsQueryArgs &
      BoardInclusionQueryArgs &
      CardAttachmentInclusionQueryArgs &
      CardInclusionQueryArgs &
      FieldsQueryArg<MemberEveryField> &
      {
        actionBefore?: ?Date,
        actionSince?: FilterDate,
        cardMembers?: boolean,
        cardMemberFields?: ArgumentGroup<MemberField>,
        cardStickers?: boolean,
        boards?: ArgumentGroup<BoardFilter>,
        boardActions?: ArgumentGroup<ActionFilter>,
        boardActionsEntities?: boolean,
        boardActionsDisplay?: boolean,
        boardActionsFormat?: Format,
        boardActionsSince?: FilterDate,
        boardActionsLimit?: number,
        boardActionFields?: ArgumentGroup<ActionField>,
        boardLists?: ArgumentGroup<ListFilter>,
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
    return this.httpGet('/', queryArgs);
  }

  getMembers(
    queryArgs?: FieldsQueryArg<ListField> &
      LimitQueryArg = {},
  ): Promise<*> {
    return this.httpGet('/', queryArgs);
  }

  getFieldValue(field: MemberEveryField): Promise<*> {
    return this.httpGet(`/${field}`);
  }

  getFilteredMembers(queryArgs: FilterQueryArg<MemberFilter>): Promise<*> {
    return this.httpGet('/', queryArgs);
  }

  actions() {
    return new Action(this.auth, this.getOptionsForChild());
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

  boards() {
    return new Board(this.auth, this.getOptionsForChild());
  }

  getBoardsInvited(queryArgs?: FieldsQueryArg<BoardField>): Promise<*> {
    return this.httpGet('/boardsInvited', queryArgs);
  }

  getBoardsInvitedFieldValue(field: BoardField): Promise<*> {
    return this.httpGet(`/boardsInvited/${field}`);
  }

  cards() {
    return new Card(this.auth, this.getOptionsForChild());
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
    return this.httpGet('/deltas', queryArgs);
  }

  notifications() {
    return new Notification(this.auth, this.getOptionsForChild());
  }

  organizations() {
    return new Organization(this.auth, this.getOptionsForChild());
  }

  organizationsInvited() {
    return new Organization(
      this.auth, this.getOptionsForChild('', '/organizationsInvited'));
  }

  updateMember(
    queryArgs?: {
      fullName?: string,
      initials?: string,
      username?: string,
      bio?: string,
      avatarSource?: AvatarSourceField,
      prefs?: {
        colorBlind?: boolean,
        locale?: string,
        minutesBetweenSummaries?: number,
      },
      separator?: string,
    } = {},
  ): Promise<*> {
    return this.httpPut('/', { ...queryArgs, separator: '/' });
  }

  updateAvatarSource(value: AvatarSourceField): Promise<*> {
    return this.httpPut('/avatarSource', { value });
  }

  updateBio(value: string): Promise<*> {
    return this.httpPut('/bio', { value });
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

  updateFullName(value: string): Promise<*> {
    return this.httpPut('/fullName', { value });
  }

  updateInitials(value: string): Promise<*> {
    return this.httpPut('/initials', { value });
  }

  updateUsername(value: string): Promise<*> {
    return this.httpPut('/username', { value });
  }

  addAvatar(queryArgs: FileQueryArg): Promise<*> {
    return this.httpPost('/avatar', queryArgs);
  }

  addBoardBackground(queryArgs: FileQueryArg): Promise<*> {
    return this.httpPost('/boardBackgrounds', queryArgs);
  }

  starBoard(
    queryArgs: {
      idBoard: string,
      pos: PositionNumbered,
    },
  ): Promise<*> {
    return this.httpPost('/boardStars', queryArgs);
  }

  addCustomBoardBackground(queryArgs: FileQueryArg): Promise<*> {
    return this.httpPost('/customBoardBackgrounds', queryArgs);
  }

  addCustomEmoji(
    queryArgs: FileQueryArg &
      {
        name: string,
      },
  ): Promise<*> {
    return this.httpPost('/customEmoji', queryArgs);
  }

  addCustomSticker(queryArgs: FileQueryArg): Promise<*> {
    return this.httpPost('/customStickers', queryArgs);
  }

  dismissOneTimeMessages(value: string): Promise<*> {
    return this.httpPost('/oneTimeMessagesDismissed', { value });
  }
}
