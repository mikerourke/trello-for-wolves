/* @flow */

/* Internal dependencies */
import BaseResource from './base-resource';
import Action from './action';
import Board from './board';
import BoardBackground from './board-background';
import Card from './card';
import Notification from './notification';
import Organization from './organization';
import SavedSearch from './saved-search';
import Sticker from './sticker';
import Token from './token';

/* Types */
import type {
  ActionField,
  ActionFilter,
  AllOrNone,
  ArgumentGroup,
  AttachmentField,
  Auth,
  AvatarSourceField,
  BoardBackgroundBrightness,
  BoardBackgroundField,
  BoardBackgroundFilter,
  BoardField,
  BoardFilter,
  CardField,
  CardFilter,
  FilterDate,
  Format,
  ListField,
  ListFilter,
  MemberEveryField,
  MemberField,
  MemberFilter,
  MembershipFilter,
  NotificationField,
  NotificationFilter,
  OrganizationField,
  OrganizationFilter,
  PositionNumbered,
  ResourceConstructorOptions,
} from '../types';

export type MemberFilter = 'admins' | 'all' | 'none' | 'normal' | 'owners';

export type AvatarSourceField =
  'gravatar'
  | 'none'
  | 'upload';

export type MemberField =
  'avatarHash'
  | 'bioData'
  | 'confirmed'
  | 'idPremOrgsAdmin'
  | 'memberType'
  | 'products'
  | 'status'
  | 'url';

export type MemberDetailField =
  'avatarSource'
  | 'bio'
  | 'email'
  | 'fullName'
  | 'gravatarHash'
  | 'idBoards'
  | 'idBoardsPineed'
  | 'idOrganizations'
  | 'initials'
  | 'loginTypes'
  | 'oneTimeMessageDismissed'
  | 'prefs'
  | 'premiumFeatures'
  | 'trophies'
  | 'uploadedAvatarHash'
  | 'username';

export type MemberEveryField = MemberField & MemberDetailField;

export type MemberType = 'admin' | 'normal' | 'observer';

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
    queryArgs?: {
      actions?: ArgumentGroup<ActionFilter>,
      actionsEntities?: boolean,
      actionsDisplay?: boolean,
      actionsLimit?: number,
      actionFields?: ArgumentGroup<ActionField>,
      actionsSince?: FilterDate,
      actionBefore?: ?Date,
      cards?: CardFilter,
      cardFields?: ArgumentGroup<CardField>,
      cardMembers?: boolean,
      cardMemberFields?: ArgumentGroup<MemberField>,
      cardAttachments?: boolean | 'cover',
      cardAttachmentFields?: ArgumentGroup<AttachmentField>,
      cardStickers?: boolean,
      boards?: ArgumentGroup<BoardFilter>,
      boardFields?: ArgumentGroup<BoardField>,
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
      notifications?: ArgumentGroup<NotificationFilter>,
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
      fields?: ArgumentGroup<MemberEveryField>,
    } = {},
  ): Promise<*> {
    return this.httpGet('/', queryArgs);
  }

  getMembers(
    queryArgs?: {
      fields?: ArgumentGroup<MemberEveryField>,
      limit?: number,
    } = {},
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

  boardBackgrounds(boardBackgroundId?: string = '') {
    return new BoardBackground(
      this.auth, this.instanceId, false, boardBackgroundId);
  }

  getBoardStars(): Promise<*> {
    return this.httpGet('/boardStars');
  }

  getBoardStar(idBoardStar: string): Promise<*> {
    return this.httpGet(`/boardStars/${idBoardStar}`);
  }

  boards() {
    return new Board(this.auth, this.getOptionsForChild());
  }

  boardsInvited() {
    return new Board(this.auth, this.getOptionsForChild('', '/boardsInvited'));
  }

  cards() {
    return new Card(this.auth, this.getOptionsForChild());
  }

  customBoardBackgrounds(customBoardBackgroundId?: string = '') {
    return new BoardBackground(
      this.auth, this.instanceId, true, customBoardBackgroundId);
  }

  getCustomEmojis(
    queryArgs?: {
      filter?: AllOrNone,
    } = {},
  ): Promise<*> {
    return this.httpGet('/customEmoji', queryArgs);
  }

  getCustomEmoji(
    idEmoji: string,
    queryArgs?: {
      fields?: ArgumentGroup<CustomEmojiField>,
    } = {},
  ): Promise<*> {
    return this.httpGet(`/customEmoji/${idEmoji}`, queryArgs);
  }


  getDeltas(
    queryArgs: {
      tags: string,
      ixLastUpdate: number,
    } = {},
  ): Promise<*> {
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

  savedSearches(savedSearchId?: string = '') {
    return new SavedSearch(this.auth, this.getOptionsForChild(savedSearchId));
  }

  tokens() {
    return new Token(this.auth, this.getOptionsForChild());
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
