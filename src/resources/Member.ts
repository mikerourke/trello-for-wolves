// @flow
import { generateTypeMap } from '../utils/type-mapper';
import BaseResource from './BaseResource';
import Action from './Action';
import Board from './Board';
import Card from './Card';
import Notification from './Notification';
import Organization from './Organization';
import Sticker from './Sticker';
import Token from './Token';
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
} from '../typeDefs';

export const avatarSourceFieldMap = generateTypeMap('gravatar', 'none', 'upload');
export type AvatarSourceField = $Keys<typeof avatarSourceFieldMap>;

export const memberEnterpriseOnlyField = generateTypeMap(
  'avatarHash',
  'fullName',
  'initials',
  'username',
);
export type MemberEnterpriseOnlyField = $Keys<typeof memberEnterpriseOnlyField>;

const memberFieldMap = generateTypeMap(
  'bio',
  'bioData',
  'confirmed',
  'idPremOrgsAdmin',
  'memberType',
  'products',
  'status',
  'url',
);
export type MemberField = MemberEnterpriseOnlyField & $Keys<typeof memberFieldMap>;

export const memberOtherFieldsMap = generateTypeMap(
  'avatarSource',
  'email',
  'gravatarHash',
  'idBoards',
  'idBoardsPinned',
  'idOrganizations',
  'loginTypes',
  'oneTimeMessageDismissed',
  'prefs',
  'premiumFeatures',
  'trophies',
  'uploadedAvatarHash',
);
export type MemberEveryField = MemberField & $Keys<typeof memberOtherFieldsMap>;

export const memberFilterMap = generateTypeMap('admins', 'all', 'none', 'normal', 'owners');
export type MemberFilter = $Keys<typeof memberFilterMap>;

export const memberTypeMap = generateTypeMap('admin', 'normal');
export type MemberType = $Keys<typeof memberTypeMap>;

export const boardBackgroundBrightnessMap = generateTypeMap('dark', 'light', 'unknown');
type BoardBackgroundBrightness = $Keys<typeof boardBackgroundBrightnessMap>;

export const boardBackgroundFieldMap = generateTypeMap(
  'brightness',
  'fullSizeUrl',
  'scaled',
  'tile',
);
type BoardBackgroundField = $Keys<typeof boardBackgroundFieldMap>;

export const boardBackgroundFilterMap = generateTypeMap(
  'all',
  'custom',
  'default',
  'none',
  'premium',
);
type BoardBackgroundFilter = $Keys<typeof boardBackgroundFilterMap>;

export const customEmojiFieldMap = generateTypeMap('name', 'url');
type CustomEmojiField = $Keys<typeof customEmojiFieldMap>;

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
    },
  ): Promise<any> {
    return this.httpGet('/', queryArgs);
  }

  getBoardBackground(
    queryArgs?: {
      fields?: ArgumentGroup<BoardBackgroundField>,
    },
  ): Promise<any> {
    return this.httpGet('/', queryArgs);
  }

  updateBoardBackground(
    queryArgs?: {
      tile?: boolean,
      brightness?: BoardBackgroundBrightness,
    },
  ): Promise<any> {
    return this.httpPut('/', queryArgs);
  }

  uploadBoardBackground(file: Object): Promise<any> {
    return this.httpPost('/', { file });
  }

  deleteBoardBackground(): Promise<any> {
    return this.httpDelete('/');
  }
}

class BoardStar extends BaseResource {
  getBoardStars(): Promise<any> {
    return this.httpGet('/');
  }

  getBoardStar(): Promise<any> {
    return this.httpGet('/');
  }

  updateBoardStar(
    queryArgs?: {
      pos?: PositionNumbered,
    },
  ): Promise<any> {
    return this.httpPut('/', queryArgs);
  }

  moveBoardStarToBoard(idBoard: string): Promise<any> {
    return this.httpPut('/idBoard', { value: idBoard });
  }

  updatePosition(value: PositionNumbered): Promise<any> {
    return this.httpPut('/pos', { value });
  }

  addBoardStar(
    queryArgs: {
      idBoard: string,
      pos: PositionNumbered,
    },
  ): Promise<any> {
    return this.httpPost('/', queryArgs);
  }

  deleteBoardStar(): Promise<any> {
    return this.httpDelete('/');
  }
}

class CustomEmoji extends BaseResource {
  getCustomEmojis(
    queryArgs?: {
      filter?: AllOrNone,
    },
  ): Promise<any> {
    return this.httpGet('/', queryArgs);
  }

  getCustomEmoji(
    queryArgs?: {
      fields?: ArgumentGroup<CustomEmojiField>,
    },
  ): Promise<any> {
    return this.httpGet('/', queryArgs);
  }

  uploadCustomEmoji(
    queryArgs: {
      name: string,
      file: Object,
    },
  ): Promise<any> {
    return this.httpPost('/', queryArgs);
  }
}

class Pref extends BaseResource {
  updateColorBlind(value: boolean): Promise<any> {
    return this.httpPut('/colorBlind', { value });
  }

  updateLocale(value: string): Promise<any> {
    return this.httpPut('/locale', { value });
  }

  updateMinutesBetweenSummaries(value: number): Promise<any> {
    return this.httpPut('/minutesBetweenSummaries', { value });
  }
}

class SavedSearch extends BaseResource {
  getSavedSearches(): Promise<any> {
    return this.httpGet('/');
  }

  getSavedSearch(): Promise<any> {
    return this.httpGet('/');
  }

  updateSavedSearch(
    queryArgs?: {
      name?: string,
      query?: string,
      pos?: PositionNumbered,
    },
  ): Promise<any> {
    return this.httpPut('/', queryArgs);
  }

  updateName(value: string): Promise<any> {
    return this.httpPut('/name', { value });
  }

  updatePosition(value: PositionNumbered): Promise<any> {
    return this.httpPut('/pos', { value });
  }

  updateQuery(value: string): Promise<any> {
    return this.httpPut('/query', { value });
  }

  addSavedSearch(
    queryArgs: {
      name: string,
      query: string,
      pos: PositionNumbered,
    },
  ): Promise<any> {
    return this.httpPost('/', queryArgs);
  }

  deleteSavedSearch(): Promise<any> {
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
    },
  ): Promise<any> {
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
    },
  ): Promise<any> {
    return this.httpGet('/', queryArgs);
  }

  getMembersFilteredBy(filter: MemberFilter): Promise<any> {
    return this.httpGet('/', { filter });
  }

  getFieldValue(field: MemberEveryField): Promise<any> {
    return this.httpGet(`/${field}`);
  }

  actions() {
    return new Action(this.config, `${this.routePath}/actions`);
  }

  boardBackgrounds(backgroundId?: string = '') {
    return new BoardBackground(this.config, `${this.routePath}/boardBackgrounds/${backgroundId}`);
  }

  boardStars(boardStarId?: string = '') {
    return new BoardStar(this.config, `${this.routePath}/boardStars/${boardStarId}`);
  }

  boards() {
    return new Board(this.config, `${this.routePath}/boards`);
  }

  boardsInvited() {
    return new Board(this.config, `${this.routePath}/boardsInvited`);
  }

  cards() {
    return new Card(this.config, `${this.routePath}/cards`);
  }

  customBoardBackgrounds(backgroundId?: string = '') {
    return new BoardBackground(
      this.config, `${this.routePath}/customBoardBackgrounds/${backgroundId}`);
  }

  customEmoji(customEmojiId?: string = '') {
    return new CustomEmoji(this.config, `${this.routePath}/customEmoji/${customEmojiId}`);
  }

  customStickers(customStickerId?: string = '') {
    return new Sticker(this.config, `${this.routePath}/customStickers/${customStickerId}`);
  }

  /* istanbul ignore next: Requires Business Class subscription */
  getDeltas(
    queryArgs: {
      tags: string,
      ixLastUpdate: number,
    },
  ): Promise<any> {
    return this.httpGet('/deltas', queryArgs);
  }

  notifications() {
    return new Notification(this.config, `${this.routePath}/notifications`);
  }

  organizations() {
    return new Organization(this.config, `${this.routePath}/organizations`);
  }

  organizationsInvited() {
    return new Organization(
      this.config, `${this.routePath}/organizationsInvited`);
  }

  savedSearches(savedSearchId?: string = '') {
    return new SavedSearch(this.config, `${this.routePath}/savedSearches/${savedSearchId}`);
  }

  tokens() {
    return new Token(this.config, `${this.routePath}/tokens`);
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
    },
  ): Promise<any> {
    return this.httpPut('/', { ...queryArgs, separator: '/' });
  }

  updateAvatarSource(value: AvatarSourceField): Promise<any> {
    return this.httpPut('/avatarSource', { value });
  }

  updateBio(value: string): Promise<any> {
    return this.httpPut('/bio', { value });
  }

  updateFullName(value: string): Promise<any> {
    return this.httpPut('/fullName', { value });
  }

  updateInitials(value: string): Promise<any> {
    return this.httpPut('/initials', { value });
  }

  prefs() {
    return new Pref(this.config, `${this.routePath}/prefs`);
  }

  updateUsername(value: string): Promise<any> {
    return this.httpPut('/username', { value });
  }

  /**
   * Updates the deactivated status for a member associated with an
   *    Organization.
   * @memberOf Organization
   * @example PUT /1/organizations/:organizationId/members/:memberId
   * @see {@link https://developers.trello.com/advanced-reference/organization#put-1-organizations-idorg-or-name-members-idmember-deactivated}
   */
  updateDeactivatedStatus(value: boolean): Promise<any> {
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
  updateMemberType(type: MemberType): Promise<any> {
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
  ): Promise<any> {
    return this.httpPut('/', queryArgs);
  }

  /* istanbul ignore next: I never ran this test because I don't want to mess with my Avatar. */
  uploadAvatar(file: Object): Promise<any> {
    return this.httpPost('/avatar', { file });
  }

  /* istanbul ignore next: I need to determine a message type for this. */
  dismissOneTimeMessages(value: string): Promise<any> {
    return this.httpPost('/oneTimeMessagesDismissed', { value });
  }

  /**
   * Deletes a member created for a Board.
   * @memberOf Board
   * @example DELETE /1/boards/:boardId/members/:memberId
   * @see {@link https://developers.trello.com/advanced-reference/board#delete-1-boards-board-id-members-idmember}
   */
  /* istanbul ignore next: This passed, I don't want to keep creating and deleting members. */
  deleteMember(): Promise<any> {
    return this.httpDelete('/');
  }

  /**
   * Removes a member's association with an Organization, doesn't
   *    actually delete it.
   * @memberOf Organization
   * @example DELETE /1/organizations/:organizationId/members/:memberId
   * @see {@link https://developers.trello.com/advanced-reference/organization#delete-1-organizations-idorg-or-name-members-idmember}
   */
  dissociateMember(): Promise<any> {
    return this.httpDelete('/');
  }

  /**
   * This will remove a member from your Organization AND remove the member
   *    from all Boards associated with an Organization.
   * @memberOf Organization
   * @example DELETE /1/organizations/:organizationId/members/:memberId/all
   * @see {@link https://developers.trello.com/advanced-reference/organization#delete-1-organizations-idorg-or-name-members-idmember-all}
   */
  /* istanbul ignore next: Requires Business Class. */
  dissociateMemberFromAll(): Promise<any> {
    return this.httpDelete('/all');
  }

  /* istanbul ignore next: Requires special permissions */
  updateVote(isVoting: boolean): Promise<any> {
    if (isVoting) {
      return this.httpPost('/', { value: this.associationId });
    }
    return this.httpDelete(`/${this.associationId}`);
  }
}
