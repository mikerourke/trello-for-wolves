/* @flow */

/* Internal dependencies */
import BaseResource from './base-resource';
import Action from './action';
import Board from './board';
import Card from './card';
import Notification from './notification';
import Organization from './organization';
import Sticker from './sticker';
import Token from './token';

/* Types */
import type {
  ActionField,
  ActionFilter,
  AllOrNone,
  ArgumentGroup,
  AttachmentField,
  AttachmentFilter,
  Auth,
  BoardField,
  BoardFilter,
  CardField,
  CardFilter,
  FilterDate,
  Format,
  ListFilter,
  MembershipFilter,
  NotificationField,
  NotificationFilter,
  OrganizationField,
  OrganizationFilter,
  PositionNumbered,
  ResourceConstructorOptions,
} from '../types';

export type AvatarSourceField =
  'gravatar'
  | 'none'
  | 'upload';

export type MemberField =
  'avatarHash'
  | 'bio'
  | 'bioData'
  | 'confirmed'
  | 'fullName'
  | 'idPremOrgsAdmin'
  | 'initials'
  | 'memberType'
  | 'products'
  | 'status'
  | 'url'
  | 'username';

export type MemberEveryField = MemberField &
  'avatarSource'
  | 'email'
  | 'gravatarHash'
  | 'idBoards'
  | 'idBoardsPinned'
  | 'idOrganizations'
  | 'loginTypes'
  | 'oneTimeMessageDismissed'
  | 'prefs'
  | 'premiumFeatures'
  | 'trophies'
  | 'uploadedAvatarHash';

type MemberFilter = 'admins' | 'all' | 'none' | 'normal' | 'owners';

type MemberType = 'admin' | 'normal';

type BoardBackgroundBrightness =
  'dark'
  | 'light'
  | 'unknown';

type BoardBackgroundFilter =
  'custom'
  | 'default'
  | 'none'
  | 'premium';

type BoardBackgroundField =
  'brightness'
  | 'fullSizeUrl'
  | 'scaled'
  | 'tile';

type CustomEmojiField = 'name' | 'url';

class BoardBackground extends BaseResource {
  constructor(
    auth: Auth,
    options?: ResourceConstructorOptions = {},
  ) {
    super(auth, 'boardBackground', options);
  }

  getBoardBackground(
    // Regular board backgrounds use the first argument, custom board
    // backgrounds use the "AllOrNone" argument.
    queryArgs?: {
      fields?: ArgumentGroup<BoardBackgroundField>,
    } | {
      fields?: AllOrNone,
    } = {},
  ): Promise<*> {
    return this.httpGet('/', queryArgs);
  }

  getBoardBackgrounds(
    queryArgs?: {
      filter?: ArgumentGroup<BoardBackgroundFilter>,
    } = {},
  ): Promise<*> {
    return this.httpGet('/', queryArgs);
  }

  updateBoardBackground(
    queryArgs?: {
      tile?: boolean,
      brightness?: BoardBackgroundBrightness,
    } = {},
  ): Promise<*> {
    return this.httpPut('/', queryArgs);
  }

  addBoardBackground(file: Object): Promise<*> {
    return this.httpPost('/', {}, file);
  }

  deleteBoardBackground(): Promise<*> {
    return this.httpDelete('/');
  }
}

class CustomEmoji extends BaseResource {
  constructor(
    auth: Auth,
    options?: ResourceConstructorOptions = {},
  ) {
    super(auth, 'customEmoji', options);
  }

  getCustomEmoji(
    queryArgs?: {
      fields?: ArgumentGroup<CustomEmojiField>,
    } = {},
  ): Promise<*> {
    return this.httpGet('/', queryArgs);
  }

  getCustomEmojis(
    queryArgs?: {
      filter?: AllOrNone,
    } = {},
  ): Promise<*> {
    return this.httpGet('/', queryArgs);
  }

  addCustomEmoji(
    file: Object,
    name: string,
  ): Promise<*> {
    return this.httpPost('/', { name }, file);
  }
}

class SavedSearch extends BaseResource {
  constructor(
    auth: Auth,
    options?: ResourceConstructorOptions = {},
  ) {
    super(auth, 'savedSearch', options);
  }

  getSavedSearch(): Promise<*> {
    return this.httpGet('/');
  }

  getSavedSearches(): Promise<*> {
    return this.httpGet('/');
  }

  updateSavedSearch(
    queryArgs?: {
      name?: string,
      query?: string,
      pos?: PositionNumbered,
    } = {},
  ): Promise<*> {
    return this.httpPut('/', queryArgs);
  }

  updateName(value: string): Promise<*> {
    return this.httpPut('/name', { value });
  }

  updatePosition(value: PositionNumbered): Promise<*> {
    return this.httpPut('/pos', { value });
  }

  updateQuery(value: string): Promise<*> {
    return this.httpPut('/query', { value });
  }

  addSavedSearch(
    queryArgs: {
      name: string,
      query: string,
      pos: PositionNumbered,
    },
  ): Promise<*> {
    return this.httpPost('/', queryArgs);
  }
}

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
      cardAttachments?: AttachmentFilter,
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
    } | {
      // This is the only option if calling from a different resource.
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

  getFilteredMembers(filter: MemberFilter): Promise<*> {
    return this.httpGet('/', { filter });
  }

  actions() {
    return new Action(this.auth, this.getOptionsForChild());
  }

  boardBackgrounds(boardBackgroundId?: string = '') {
    return new BoardBackground(
      this.auth, this.getOptionsForChild(boardBackgroundId));
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
      this.auth,
      this.getOptionsForChild(
        customBoardBackgroundId, '/customBoardBackgrounds'));
  }

  customEmoji(customEmojiId?: string = '') {
    return new CustomEmoji(
      this.auth, this.getOptionsForChild(customEmojiId, '/customEmoji'));
  }

  customStickers(customStickerId?: string = '') {
    return new Sticker(
      this.auth, this.getOptionsForChild(customStickerId, '/customStickers'));
  }

  getDeltas(
    queryArgs: {
      tags: string,
      ixLastUpdate: number,
    },
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
    } = {},
  ): Promise<*> {
    return this.httpPut('/', { ...queryArgs, separator: '/' });
  }

  /**
   * Updates the members associated with a parent card.
   * PUT /1/cards/:cardId/idMembers
   * @param {Array} value Array of member IDs to add to the card.
   * @see {@link https://developers.trello.com/advanced-reference/card#put-1-cards-card-id-or-shortlink-idmembers}
   */
  updateAssociations(value: Array<string>): Promise<*> {
    return this.httpPut('/', { value });
  }

  updateAvatarSource(value: AvatarSourceField): Promise<*> {
    return this.httpPut('/avatarSource', { value });
  }

  updateBio(value: string): Promise<*> {
    return this.httpPut('/bio', { value });
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
    value: string,
  ): Promise<*> {
    return this.httpPut(`/boardStars/${idBoardStar}/idBoard`, { value });
  }

  updateBoardStarPosition(
    idBoardStar: string,
    value: PositionNumbered,
  ): Promise<*> {
    return this.httpPut(`/boardStars/${idBoardStar}/pos`, { value });
  }

  updateDeactivatedStatus(value: boolean): Promise<*> {
    return this.httpPut('/deactivated', { value });
  }

  updateFullName(value: string): Promise<*> {
    return this.httpPut('/fullName', { value });
  }

  updateInitials(value: string): Promise<*> {
    return this.httpPut('/initials', { value });
  }

  updateMemberType(type: MemberType): Promise<*> {
    return this.httpPut('/', { type });
  }

  updateUsername(value: string): Promise<*> {
    return this.httpPut('/username', { value });
  }

  addMember(
    queryArgs: {
      email: string,
      fullName: string,
      type?: MemberType
    },
  ): Promise<*> {
    return this.httpPut('/', queryArgs);
  }

  addAvatar(file: Object): Promise<*> {
    return this.httpPost('/avatar', {}, file);
  }

  /**
   * Associates a member with a parent or child resource.  The resource path is
   *    overriden to remove the ID number from the endpoint.
   *
   * @example
   * POST > .../cards/[cardId]/idMembers?value=[memberId]?key=...
   * @see {@link https://developers.trello.com/advanced-reference/card#post-1-cards-card-id-or-shortlink-idmembers}
   */
  associateMember(): Promise<*> {
    this.resourcePath = this.resourcePath.split('/')[1];
    return this.httpPost('/', { value: this.instanceId });
  }

  starBoard(
    queryArgs: {
      idBoard: string,
      pos: PositionNumbered,
    },
  ): Promise<*> {
    return this.httpPost('/boardStars', queryArgs);
  }

  dismissOneTimeMessages(value: string): Promise<*> {
    return this.httpPost('/oneTimeMessagesDismissed', { value });
  }

  /**
   * Removes a member's association with a resource, doesn't actually delete it.
   *
   * @example
   * DELETE > .../cards/[cardId]/idMembers/[memberId]?key=...
   * @see {@link https://developers.trello.com/advanced-reference/card#post-1-cards-card-id-or-shortlink-idmembers}
   */
  dissociateMember(): Promise<*> {
    return this.httpDelete('/');
  }

  dissociateMemberFromAll(): Promise<*> {
    return this.httpDelete('/all');
  }
}
