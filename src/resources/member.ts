import BaseResource from './baseResource';
import Action, { ActionFilter, ActionField } from './action';
import { AttachmentField, AttachmentFilter } from './attachment';
import Board, { BoardField, BoardFilter } from './board';
import Card, { CardField, CardFilter } from './card';
import { ListFilter } from './list';
import { MembershipFilter } from './membership';
import Notification, {
  NotificationField,
  NotificationFilter,
} from './notification';
import Organization, {
  OrganizationField,
  OrganizationFilter,
} from './organization';
import Sticker from './sticker';
import Token from './token';
import {
  AllOrNone,
  ArgumentGroup,
  FilterDate,
  Format,
  PositionNumbered,
} from '../types';

export type AvatarSourceField = 'gravatar' | 'none' | 'upload';

export type MemberEnterpriseOnlyField =
  | 'avatarHash'
  | 'fullName'
  | 'initials'
  | 'username';

export type MemberField =
  | MemberEnterpriseOnlyField
  | 'bio'
  | 'bioData'
  | 'confirmed'
  | 'idPremOrgsAdmin'
  | 'memberType'
  | 'products'
  | 'status'
  | 'url';

export type MemberEveryField =
  | MemberField
  | 'avatarSource'
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

type BoardBackgroundBrightness = 'dark' | 'light' | 'unknown';

type BoardBackgroundField = 'brightness' | 'fullSizeUrl' | 'scaled' | 'tile';

type BoardBackgroundFilter = 'all' | 'custom' | 'default' | 'none' | 'premium';

type CustomEmojiField = 'name' | 'url';

/**
 * This class handles both the "boardBackground" and "customBoardBackground"
 *    resources.  For "customBoardBackgrounds", the resource path is overridden
 *    when an instance is created in the Member class.
 */
class BoardBackground extends BaseResource {
  public getBoardBackgrounds = (
    queryArgs?:
      | {
          // boardBackgrounds:
          filter?: BoardBackgroundFilter;
        }
      | {
          // customBoardBackgrounds:
          filter?: AllOrNone;
        },
  ): Promise<any> => this.httpGet('/', queryArgs);

  public getBoardBackground = (queryArgs?: {
    fields?: ArgumentGroup<BoardBackgroundField>;
  }): Promise<any> => this.httpGet('/', queryArgs);

  public updateBoardBackground = (queryArgs?: {
    tile?: boolean;
    brightness?: BoardBackgroundBrightness;
  }): Promise<any> => this.httpPut('/', queryArgs);

  public uploadBoardBackground = (file: Object): Promise<any> =>
    this.httpPost('/', { file });

  public deleteBoardBackground = (): Promise<any> => this.httpDelete('/');
}

class BoardStar extends BaseResource {
  public getBoardStars = (): Promise<any> => this.httpGet('/');

  public getBoardStar = (): Promise<any> => this.httpGet('/');

  public updateBoardStar = (queryArgs?: {
    pos?: PositionNumbered;
  }): Promise<any> => this.httpPut('/', queryArgs);

  public moveBoardStarToBoard = (idBoard: string): Promise<any> =>
    this.httpPut('/idBoard', { value: idBoard });

  public updatePosition = (value: PositionNumbered): Promise<any> =>
    this.httpPut('/pos', { value });

  public addBoardStar = (queryArgs: {
    idBoard: string;
    pos: PositionNumbered;
  }): Promise<any> => this.httpPost('/', queryArgs);

  public deleteBoardStar = (): Promise<any> => this.httpDelete('/');
}

class CustomEmoji extends BaseResource {
  public getCustomEmojis = (queryArgs?: { filter?: AllOrNone }): Promise<any> =>
    this.httpGet('/', queryArgs);

  public getCustomEmoji = (queryArgs?: {
    fields?: ArgumentGroup<CustomEmojiField>;
  }): Promise<any> => this.httpGet('/', queryArgs);

  public uploadCustomEmoji = (queryArgs: {
    name: string;
    file: Object;
  }): Promise<any> => this.httpPost('/', queryArgs);
}

class Pref extends BaseResource {
  public updateColorBlind = (value: boolean): Promise<any> =>
    this.httpPut('/colorBlind', { value });

  public updateLocale = (value: string): Promise<any> =>
    this.httpPut('/locale', { value });

  public updateMinutesBetweenSummaries = (value: number): Promise<any> =>
    this.httpPut('/minutesBetweenSummaries', { value });
}

class SavedSearch extends BaseResource {
  public getSavedSearches = (): Promise<any> => this.httpGet('/');

  public getSavedSearch = (): Promise<any> => this.httpGet('/');

  public updateSavedSearch = (queryArgs?: {
    name?: string;
    query?: string;
    pos?: PositionNumbered;
  }): Promise<any> => this.httpPut('/', queryArgs);

  public updateName = (value: string): Promise<any> =>
    this.httpPut('/name', { value });

  public updatePosition = (value: PositionNumbered): Promise<any> =>
    this.httpPut('/pos', { value });

  public updateQuery = (value: string): Promise<any> =>
    this.httpPut('/query', { value });

  public addSavedSearch = (queryArgs: {
    name: string;
    query: string;
    pos: PositionNumbered;
  }): Promise<any> => this.httpPost('/', queryArgs);

  public deleteSavedSearch = (): Promise<any> => this.httpDelete('/');
}

/**
 * @namespace Member
 */
export default class Member extends BaseResource {
  public getMembers = (queryArgs?: {
    fields?: ArgumentGroup<MemberEveryField>;
    limit?: number;
  }): Promise<any> => this.httpGet('/', queryArgs);

  public getMember = (
    queryArgs?:
      | {
          actions?: ArgumentGroup<ActionFilter>;
          actionsEntities?: boolean;
          actionsDisplay?: boolean;
          actionsLimit?: number;
          actionFields?: ArgumentGroup<ActionField>;
          actionsSince?: FilterDate;
          actionBefore?: Date | null;
          cards?: CardFilter;
          cardFields?: ArgumentGroup<CardField>;
          cardMembers?: boolean;
          cardMemberFields?: ArgumentGroup<MemberField>;
          cardAttachments?: AttachmentFilter;
          cardAttachmentFields?: ArgumentGroup<AttachmentField>;
          cardStickers?: boolean;
          boards?: ArgumentGroup<BoardFilter>;
          boardFields?: ArgumentGroup<BoardField>;
          boardActions?: ArgumentGroup<ActionFilter>;
          boardActionsEntities?: boolean;
          boardActionsDisplay?: boolean;
          boardActionsFormat?: Format;
          boardActionsSince?: FilterDate;
          boardActionsLimit?: number;
          boardActionFields?: ArgumentGroup<ActionField>;
          boardLists?: ArgumentGroup<ListFilter>;
          boardMemberships?: ArgumentGroup<MembershipFilter>;
          boardOrganization?: boolean;
          boardOrganizationFields?: ArgumentGroup<OrganizationField>;
          boardsInvited?: ArgumentGroup<BoardFilter>;
          boardsInvitedFields?: ArgumentGroup<BoardField>;
          boardStars?: boolean;
          savedSearches?: boolean;
          organizations?: ArgumentGroup<OrganizationFilter>;
          organizationFields?: ArgumentGroup<OrganizationField>;
          organizationPaidAccount?: boolean;
          organizationsInvited?: OrganizationFilter;
          organizationsInvitedFields?: ArgumentGroup<OrganizationField>;
          notifications?: ArgumentGroup<NotificationFilter>;
          notificationsEntities?: boolean;
          notificationsDisplay?: boolean;
          notificationsLimit?: number;
          notificationFields?: ArgumentGroup<NotificationField>;
          notificationMemberCreator?: boolean;
          notificationMemberCreatorFields?: ArgumentGroup<MemberField>;
          notificationBefore?: string | null;
          notificationSince?: string | null;
          tokens?: AllOrNone;
          paidAccount?: boolean;
          boardBackgrounds?: ArgumentGroup<BoardBackgroundFilter>;
          customBoardBackgrounds?: AllOrNone;
          customStickers?: AllOrNone;
          customEmoji?: AllOrNone;
          fields?: ArgumentGroup<MemberEveryField>;
        }
      | {
          // This is the only option if calling from a different resource.
          fields?: ArgumentGroup<MemberEveryField>;
        },
  ): Promise<any> => this.httpGet('/', queryArgs);

  public getMembersFilteredBy = (filter: MemberFilter): Promise<any> =>
    this.httpGet('/', { filter });

  public getFieldValue = (field: MemberEveryField): Promise<any> =>
    this.httpGet(`/${field}`);

  public actions = () => new Action(this.config, `${this.routePath}/actions`);

  public boardBackgrounds = (backgroundId: string = '') =>
    new BoardBackground(
      this.config,
      `${this.routePath}/boardBackgrounds/${backgroundId}`,
    );

  public boardStars = (boardStarId: string = '') =>
    new BoardStar(this.config, `${this.routePath}/boardStars/${boardStarId}`);

  public boards = () => new Board(this.config, `${this.routePath}/boards`);

  public boardsInvited = () =>
    new Board(this.config, `${this.routePath}/boardsInvited`);

  public cards = () => new Card(this.config, `${this.routePath}/cards`);

  public customBoardBackgrounds = (backgroundId: string = '') =>
    new BoardBackground(
      this.config,
      `${this.routePath}/customBoardBackgrounds/${backgroundId}`,
    );

  public customEmoji = (customEmojiId: string = '') =>
    new CustomEmoji(
      this.config,
      `${this.routePath}/customEmoji/${customEmojiId}`,
    );

  public customStickers = (customStickerId: string = '') =>
    new Sticker(
      this.config,
      `${this.routePath}/customStickers/${customStickerId}`,
    );

  public getDeltas = (queryArgs: {
    tags: string;
    ixLastUpdate: number;
  }): Promise<any> => this.httpGet('/deltas', queryArgs);

  public notifications = () =>
    new Notification(this.config, `${this.routePath}/notifications`);

  public organizations = () =>
    new Organization(this.config, `${this.routePath}/organizations`);

  public organizationsInvited = () =>
    new Organization(this.config, `${this.routePath}/organizationsInvited`);

  public savedSearches = (savedSearchId: string = '') =>
    new SavedSearch(
      this.config,
      `${this.routePath}/savedSearches/${savedSearchId}`,
    );

  public tokens = () => new Token(this.config, `${this.routePath}/tokens`);

  public updateMember = (queryArgs?: {
    fullName?: string;
    initials?: string;
    username?: string;
    bio?: string;
    avatarSource?: AvatarSourceField;
    prefs?: {
      colorBlind?: boolean;
      locale?: string;
      minutesBetweenSummaries?: number;
    };
  }): Promise<any> => this.httpPut('/', { ...queryArgs, separator: '/' });

  public updateAvatarSource = (value: AvatarSourceField): Promise<any> =>
    this.httpPut('/avatarSource', { value });

  public updateBio = (value: string): Promise<any> =>
    this.httpPut('/bio', { value });

  public updateFullName = (value: string): Promise<any> =>
    this.httpPut('/fullName', { value });

  public updateInitials = (value: string): Promise<any> =>
    this.httpPut('/initials', { value });

  public prefs = () => new Pref(this.config, `${this.routePath}/prefs`);

  public updateUsername = (value: string): Promise<any> =>
    this.httpPut('/username', { value });

  /**
   * Updates the deactivated status for a member associated with an
   *    Organization.
   * @memberOf Organization
   * @example PUT /1/organizations/:organizationId/members/:memberId
   * @see {@link https://developers.trello.com/advanced-reference/organization#put-1-organizations-idorg-or-name-members-idmember-deactivated}
   */
  public updateDeactivatedStatus = (value: boolean): Promise<any> =>
    this.httpPut('/deactivated', { value });

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
  public updateMemberType = (type: MemberType): Promise<any> =>
    this.httpPut('/', { type });

  /**
   * Adds a member to an Organization.
   * @memberOf Organization
   * @example PUT /1/organizations/:organizationId/members
   * @see {@link https://developers.trello.com/advanced-reference/organization#put-1-organizations-idorg-or-name-members}
   */
  public addMember = (queryArgs: {
    email: string;
    fullName: string;
    type?: MemberType;
  }): Promise<any> => this.httpPut('/', queryArgs);

  public uploadAvatar = (file: Object): Promise<any> =>
    this.httpPost('/avatar', { file });

  public dismissOneTimeMessages = (value: string): Promise<any> =>
    this.httpPost('/oneTimeMessagesDismissed', { value });

  /**
   * Deletes a member created for a Board.
   * @memberOf Board
   * @example DELETE /1/boards/:boardId/members/:memberId
   * @see {@link https://developers.trello.com/advanced-reference/board#delete-1-boards-board-id-members-idmember}
   */
  public deleteMember = (): Promise<any> => this.httpDelete('/');

  /**
   * Removes a member's association with an Organization, doesn't
   *    actually delete it.
   * @memberOf Organization
   * @example DELETE /1/organizations/:organizationId/members/:memberId
   * @see {@link https://developers.trello.com/advanced-reference/organization#delete-1-organizations-idorg-or-name-members-idmember}
   */
  public dissociateMember = (): Promise<any> => this.httpDelete('/');

  /**
   * This will remove a member from your Organization AND remove the member
   *    from all Boards associated with an Organization.
   * @memberOf Organization
   * @example DELETE /1/organizations/:organizationId/members/:memberId/all
   * @see {@link https://developers.trello.com/advanced-reference/organization#delete-1-organizations-idorg-or-name-members-idmember-all}
   */
  public dissociateMemberFromAll = (): Promise<any> => this.httpDelete('/all');

  public updateVote(isVoting: boolean): Promise<any> {
    if (isVoting) {
      return this.httpPost('/', { value: this.associationId });
    }
    return this.httpDelete(`/${this.associationId}`);
  }
}
