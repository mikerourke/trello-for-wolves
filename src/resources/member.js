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

export type MemberFilter = 'admins' | 'all' | 'none' | 'normal' | 'owners';

export type MemberType = 'admin' | 'normal';

type BoardBackgroundBrightness =
  'dark'
  | 'light'
  | 'unknown';

type BoardBackgroundField =
  'brightness'
  | 'fullSizeUrl'
  | 'scaled'
  | 'tile';

type BoardBackgroundFilter =
  'all'
  | 'custom'
  | 'default'
  | 'none'
  | 'premium';

type CustomEmojiField = 'name' | 'url';

/**
 * This class handles both the "boardBackground" and "customBoardBackground"
 *    resources.  For "customBoardBackgrounds", the resource path is overridden
 *    when an instance is created in the Member class.
 */
class BoardBackground extends BaseResource {
  getBoardBackgrounds(
    queryArgs?: {
      // boardBackgrounds:
      filter?: BoardBackgroundFilter,
    } | {
      // customBoardBackgrounds:
      filter?: AllOrNone
    }= {},
  ): Promise<*> {
    return this.httpGet('/', queryArgs);
  }

  getBoardBackground(
    queryArgs?: {
      fields?: ArgumentGroup<BoardBackgroundField>,
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

  uploadBoardBackground(file: Object): Promise<*> {
    return this.httpPost('/', {}, file);
  }

  deleteBoardBackground(): Promise<*> {
    return this.httpDelete('/');
  }
}

class BoardStar extends BaseResource {
  getBoardStars(): Promise<*> {
    return this.httpGet('/');
  }

  getBoardStar(): Promise<*> {
    return this.httpGet('/');
  }

  updateBoardStar(
    queryArgs?: {
      pos?: PositionNumbered,
    } = {},
  ): Promise<*> {
    return this.httpPut('/', queryArgs);
  }

  moveBoardStarToBoard(idBoard: string): Promise<*> {
    return this.httpPut('/idBoard', { value: idBoard });
  }

  updatePosition(value: PositionNumbered): Promise<*> {
    return this.httpPut('/pos', { value });
  }

  addBoardStar(
    queryArgs: {
      idBoard: string,
      pos: PositionNumbered,
    },
  ): Promise<*> {
    return this.httpPost('/', queryArgs);
  }

  deleteBoardStar(): Promise<*> {
    return this.httpDelete('/');
  }
}

class CustomEmoji extends BaseResource {
  getCustomEmojis(
    queryArgs?: {
      filter?: AllOrNone,
    } = {},
  ): Promise<*> {
    return this.httpGet('/', queryArgs);
  }

  getCustomEmoji(
    queryArgs?: {
      fields?: ArgumentGroup<CustomEmojiField>,
    } = {},
  ): Promise<*> {
    return this.httpGet('/', queryArgs);
  }

  uploadCustomEmoji(
    file: Object,
    name: string,
  ): Promise<*> {
    return this.httpPost('/', { name }, file);
  }
}

class Pref extends BaseResource {
  updateColorBlind(value: boolean): Promise<*> {
    return this.httpPut('/colorBlind', { value });
  }

  updateLocale(value: string): Promise<*> {
    return this.httpPut('/locale', { value });
  }

  updateMinutesBetweenSummaries(value: number): Promise<*> {
    return this.httpPut('/minutesBetweenSummaries', { value });
  }
}

class SavedSearch extends BaseResource {
  getSavedSearches(): Promise<*> {
    return this.httpGet('/');
  }

  getSavedSearch(): Promise<*> {
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

  deleteSavedSearch(): Promise<*> {
    return this.httpDelete('/');
  }
}

/**
 * @namespace Member
 */
export default class Member extends BaseResource {
  getMembers(
    queryArgs?: {
      fields?: ArgumentGroup<MemberEveryField>,
      limit?: number,
    } = {},
  ): Promise<*> {
    return this.httpGet('/', queryArgs);
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
      boardBackgrounds?: ArgumentGroup<BoardBackgroundFilter>,
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

  getFieldValue(field: MemberEveryField): Promise<*> {
    return this.httpGet(`/${field}`);
  }

  getFilteredMembers(filter: MemberFilter): Promise<*> {
    return this.httpGet('/', { filter });
  }

  actions() {
    return new Action(this.auth, `${this.routePath}/actions`);
  }

  boardBackgrounds(boardBackgroundId?: string = '') {
    return new BoardBackground(
      this.auth, `${this.routePath}/boardBackgrounds/${boardBackgroundId}`);
  }

  boardStars(boardStarId?: string = '') {
    return new BoardStar(
      this.auth, `${this.routePath}/boardStars/${boardStarId}`);
  }

  boards() {
    return new Board(this.auth, `${this.routePath}/boards`);
  }

  boardsInvited() {
    return new Board(this.auth, `${this.routePath}/boardsInvited`);
  }

  cards() {
    return new Card(this.auth, `${this.routePath}/cards`);
  }

  customBoardBackgrounds(customBoardBackgroundId?: string = '') {
    return new BoardBackground(
      this.auth,
      `${this.routePath}/customBoardBackgrounds/${customBoardBackgroundId}`);
  }

  customEmoji(customEmojiId?: string = '') {
    return new CustomEmoji(
      this.auth, `${this.routePath}/customEmojis/${customEmojiId}`);
  }

  customStickers(customStickerId?: string = '') {
    return new Sticker(
      this.auth, `${this.routePath}/customStickers/${customStickerId}`);
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
    return new Notification(this.auth, `${this.routePath}/notifications`);
  }

  organizations() {
    return new Organization(this.auth, `${this.routePath}/organizations`);
  }

  organizationsInvited() {
    return new Organization(
      this.auth, `${this.routePath}/organizationsInvited`);
  }

  savedSearches(savedSearchId?: string = '') {
    return new SavedSearch(
      this.auth, `${this.routePath}/savedSearches/${savedSearchId}`);
  }

  tokens() {
    return new Token(this.auth, `${this.routePath}/tokens`);
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

  updateAvatarSource(value: AvatarSourceField): Promise<*> {
    return this.httpPut('/avatarSource', { value });
  }

  updateBio(value: string): Promise<*> {
    return this.httpPut('/bio', { value });
  }

  updateFullName(value: string): Promise<*> {
    return this.httpPut('/fullName', { value });
  }

  updateInitials(value: string): Promise<*> {
    return this.httpPut('/initials', { value });
  }

  prefs() {
    return new Pref(this.auth, `${this.routePath}/prefs`);
  }

  updateUsername(value: string): Promise<*> {
    return this.httpPut('/username', { value });
  }

  /**
   * Updates the deactivated status for a member associated with an
   *    Organization.
   * @memberOf Organization
   * @example PUT /1/organizations/:organizationId/members/:memberId
   * @see {@link https://developers.trello.com/advanced-reference/organization#put-1-organizations-idorg-or-name-members-idmember-deactivated}
   */
  updateDeactivatedStatus(value: boolean): Promise<*> {
    return this.httpPut('/deactivated', { value });
  }

  /**
   * Updates the member type for a member associated with a Board or
   *    Organization.
   * @memberOf Board
   * @example PUT /1/boards/:boardId/members/:memberId
   * @see {@link https://developers.trello.com/advanced-reference/board#put-1-boards-board-id-members-idmember}
   *
   * @memberOf Organization
   * @example PUT /1/organizations/:organizationId/members/:memberId
   * @see {@link https://developers.trello.com/advanced-reference/organization#put-1-organizations-idorg-or-name-members-idmember}
   */
  updateMemberType(type: MemberType): Promise<*> {
    return this.httpPut('/', { type });
  }

  /**
   * Adds a member to an Organization.
   * @memberOf Organization
   * @example PUT /1/organizations/:organizationId/members
   * @see {@link https://developers.trello.com/advanced-reference/organization#put-1-organizations-idorg-or-name-members}
   */
  addMember(
    queryArgs: {
      email: string,
      fullName: string,
      type?: MemberType
    },
  ): Promise<*> {
    return this.httpPut('/', queryArgs);
  }

  uploadAvatar(file: Object): Promise<*> {
    return this.httpPost('/avatar', {}, file);
  }

  dismissOneTimeMessages(value: string): Promise<*> {
    return this.httpPost('/oneTimeMessagesDismissed', { value });
  }

  /**
   * Deletes a member created for a Board.
   * @memberOf Board
   * @example DELETE /1/boards/:boardId/members/:memberId
   * @see {@link https://developers.trello.com/advanced-reference/board#delete-1-boards-board-id-members-idmember}
   */
  deleteMember(): Promise<*> {
    return this.httpDelete('/');
  }

  /**
   * Removes a member's association with a Card or Organization, doesn't
   *    actually delete it.
   * @memberOf Organization
   * @example DELETE /1/organizations/:organizationId/members/:memberId
   * @see {@link https://developers.trello.com/advanced-reference/organization#delete-1-organizations-idorg-or-name-members-idmember}
   */
  dissociateMember(): Promise<*> {
    return this.httpDelete('/');
  }

  rescindVote(): Promise<*> {
    return this.httpDelete('/');
  }

  /**
   * This will remove a member from your Organization AND remove the member
   *    from all Boards associated with an Organization.
   * @memberOf Organization
   * @example DELETE /1/organizations/:organizationId/members/:memberId/all
   * @see {@link https://developers.trello.com/advanced-reference/organization#delete-1-organizations-idorg-or-name-members-idmember-all}
   */
  dissociateMemberFromAll(): Promise<*> {
    return this.httpDelete('/all');
  }
}
