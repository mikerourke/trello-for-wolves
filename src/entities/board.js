/* @flow */

/* External dependencies */
import Promise from 'bluebird';

/* Internal dependencies */
import {
  InvalidBooleanError,
  InvalidStringError,
  StringLengthError,
} from '../lib/errors';
import Entity from './entity';

/* Types */
import type {
  ActionDate,
  ActionFields,
  Actions,
  ActionsFormat,
  AllOrNone,
  AttachmentFields,
  Auth,
  BoardField,
  BoardFields,
  BoardPref,
  BoardStars,
  CardAging,
  CardFields,
  CardStatus,
  ChecklistFields,
  EntityInstance,
  GroupPermission,
  Invitation,
  LabelFields,
  ListFields,
  ListStatus,
  MemberFields,
  MemberLevel,
  Memberships,
  MyPref,
  OrganizationFields,
  PermissionLevel,
  Position,
  PowerUps,
} from '../types';

/**
 * Class representing a Board entity.
 * @extends Entity
 */
export default class Board extends Entity {
  /**
   * Create a new board.
   * @param {Auth} auth Auth object containing Trello API key and token.
   * @param {string} boardId ID of the board.
   * @param {EntityInstance} [parent] Parent entity associated with this
   *    instance.
   */
  constructor(
    auth: Auth,
    boardId?: string = '',
    parent?: ?EntityInstance,
  ) {
    super(auth, 'board', boardId, parent);
  }

  /**
   * Get details of a single board with ID.
   * @param {Object} urlArgs Arguments to pass to API call.
   * @returns {Promise}
   * @see {@link https://developers.trello.com/advanced-reference/board#get-1-boards-board-id|GET /1/boards/:boardId}
   */
  getBoard(urlArgs?: {
    actions?: Actions,
    actionsEntities?: boolean,
    actionsDisplay?: boolean,
    actionsFormat?: ActionsFormat,
    actionsSince?: ActionDate,
    actionsLimit?: number,
    actionFields?: ActionFields,
    actionMember?: boolean,
    actionMemberFields?: MemberFields,
    actionMemberCreator?: boolean,
    actionMemberCreatorFields?: MemberFields,
    cards?: CardStatus,
    cardFields?: CardFields,
    cardAttachments?: boolean,
    cardAttachmentFields?: AttachmentFields,
    cardChecklists?: AllOrNone,
    cardPluginData?: boolean,
    cardStickers?: boolean,
    boardStars?: BoardStars,
    labels?: AllOrNone,
    labelFields?: LabelFields,
    labelsLimit?: number, // Valid values 0 to 1000
    list?: ListStatus,
    listFields?: ListFields,
    memberships?: Memberships,
    membershipsMember?: boolean,
    membershipsMemberFields?: MemberFields,
    members?: MemberLevel,
    memberFields?: MemberFields,
    membersInvited?: MemberLevel,
    membersInvitedFields?: MemberFields,
    pluginData?: boolean,
    checklists?: AllOrNone,
    checklistFields?: ChecklistFields,
    organization?: boolean,
    organizationFields?: OrganizationFields,
    organizationMemberships?: Memberships,
    organizationPluginData?: boolean,
    myPrefs?: boolean,
    tags?: boolean,
    fields?: BoardFields,
  } = {}): Promise<*> {
    return this.performRequest('get', { urlArgs });
  }

  /**
   * Gets the value of the specified field on a board.
   * @param {BoardField} field Field to get value for.
   * @returns {Promise}
   * @see {@link https://developers.trello.com/advanced-reference/board#get-1-boards-board-id-field|GET /1/boards/:boardId/:field}
   */
  getFieldValue(field: BoardField): Promise<*> {
    if (typeof field !== 'string') {
      throw new InvalidStringError('field',
        'board#get-1-boards-board-id-field');
    }
    return this.performRequest('get', { path: field });
  }

  /**
   * Returns the stars associated with a board.
   * @param {BoardStars} filter Filter to specify which stars to get.
   * @returns {Promise}
   * @see {@link https://developers.trello.com/advanced-reference/board#get-1-boards-board-boardstars|GET /1/boards/:boardId/boardStars}
   */
  getStars(filter?: BoardStars = 'mine'): Promise<*> {
    if (typeof filter !== 'string') {
      throw new InvalidStringError('filter',
        'board#get-1-boards-board-id-boardstars');
    }
    return this.performRequest('get', {
      path: 'boardStars', urlArgs: { filter } });
  }

  /**
   * Returns the deltas associated with a board.
   * @param {string} tags Tags to get deltas for.
   * @param {number} ixLastUpdate Index of last update.
   * @returns {Promise}
   * @see {@link https://developers.trello.com/advanced-reference/board#get-1-boards-board-deltas|GET /1/boards/:boardId/deltas}
   */
  getDeltas(tags: string, ixLastUpdate: number): Promise<*> {
    if (typeof tags !== 'string') {
      throw new InvalidStringError('tags',
        'board#get-1-boards-board-id-deltas');
    }
    return this.performRequest('get', {
      path: 'deltas', urlArgs: { tags, ixLastUpdate } });
  }

  /**
   * Returns the tags associated with a board.
   * @returns {Promise}
   * @see {@link https://developers.trello.com/advanced-reference/board#get-1-boards-board-idtags|GET /1/boards/:boardId/tags}
   */
  getTags(): Promise<*> {
    return this.performRequest('get', { path: 'tags' });
  }

  /**
   * Returns myPrefs associated with a board.
   * @returns {Promise}
   * @see {@link https://developers.trello.com/advanced-reference/board#get-1-boards-board-myprefs|GET /1/boards/:boardId/myPrefs}
   */
  getMyPrefs(): Promise<*> {
    return this.performRequest('get', { path: 'myPrefs' });
  }

  /**
   * Returns plugin data associated with a board.
   * @returns {Promise}
   * @see {@link https://developers.trello.com/advanced-reference/board#get-1-boards-board-plugindata|GET /1/boards/:boardId/pluginData}
   */
  getPluginData(): Promise<*> {
    return this.performRequest('get', { path: 'pluginData' });
  }

  /**
   * Updates board with specified parameters.
   * @param {Object} [urlArgs={}] Arguments to pass for updating.
   * @returns {Promise}
   * @see {@link https://developers.trello.com/advanced-reference/board#put-1-boards-board-id|PUT /1/boards/:boardId}
   */
  updateBoard(urlArgs?: {
    name?: string,
    desc?: string,
    closed?: boolean,
    subscribed?: boolean,
    idOrganization?: string,
    prefs?: {
      permissionLevel?: PermissionLevel,
      selfJoin?: boolean,
      cardCovers?: boolean,
      invitations?: Invitation,
      voting?: GroupPermission,
      comments?: GroupPermission,
      background?: string,
      cardAging?: CardAging,
      calendarFeedEnabled?: boolean,
      separator?: string,
    },
    labelNames?: {
      green?: string,
      yellow?: string,
      orange?: string,
      red?: string,
      purple?: string,
      blue?: string,
      separator?: string,
    },
  } = {}): Promise<*> {
    if (urlArgs.prefs) {
      urlArgs.prefs.separator = '/';
    }
    if (urlArgs.labelNames) {
      urlArgs.labelNames.separator = '/';
    }
    return this.performRequest('put', { urlArgs });
  }

  /**
   * Updates the closed status of the board.
   * @param {boolean} value New closed status of the board.
   * @returns {Promise}
   * @see {@link https://developers.trello.com/advanced-reference/board#put-1-boards-board-id-closed|PUT /1/boards/:boardId/closed}
   */
  updateClosedStatus(value: boolean): Promise<*> {
    if (typeof value !== 'boolean') {
      throw new InvalidBooleanError('value',
        'board#put-1-boards-board-id-closed');
    }
    return this.performRequest('put', { path: 'closed', urlArgs: { value } });
  }

  /**
   * Updates the description of the board.
   * @param {string} value New description of the board.
   * @returns {Promise}
   * @see {@link https://developers.trello.com/advanced-reference/board#put-1-boards-board-id-desc|PUT /1/boards/:boardId/desc}
   */
  updateDescription(value: string): Promise<*> {
    if (typeof value !== 'string') {
      throw new InvalidStringError('value',
        'board#put-1-boards-board-id-desc');
    }
    if (value.length < 0 || value.length > 16384) {
      throw new StringLengthError('value');
    }
    return this.performRequest('put', { path: 'desc', urlArgs: { value } });
  }

  /**
   * Updates the specified myPref for the board.
   * @param {MyPref} myPrefName Name of the myPref to update.
   * @param {boolean|string|Position} value New value for myPref.
   * @returns {Promise}
   * @see {@link https://developers.trello.com/advanced-reference/board#put-1-boards-board-id-myprefs-emailposition|PUT /1/boards/:boardId/myPrefs/[myPrefName]}
   */
  updateMyPrefs(
    myPrefName: MyPref,
    value: boolean | string | Position,
  ): Promise<*> {
    const lowerCasePref = myPrefName.toString().toLowerCase();
    const helpUrl = `board#put-1-boards-board-id-myprefs-${lowerCasePref}`;

    if ((myPrefName === 'emailPosition' || myPrefName === 'idEmailList')
        && typeof value !== 'string') {
      throw new InvalidStringError(myPrefName, helpUrl);
    }
    if (typeof value !== 'boolean') {
      throw new InvalidBooleanError(myPrefName, helpUrl);
    }
    return this.performRequest('put', {
      path: `myPrefs/${myPrefName}`, urlArgs: { value } });
  }

  updatePref(
    prefName: BoardPref,
    value: string | boolean | CardAging | GroupPermission |
      Invitation | PermissionLevel,
  ): Promise<*> {
    return this.performRequest('put',
      { path: `prefs/${prefName}`, urlArgs: { value } });
  }

  updateSubscribed(value: boolean): Promise<*> {
    return this.performRequest('put',
      { path: 'subscribed', urlArgs: { value } });
  }

  createBoard(
    name: string,
    urlArgs?: {
      defaultLabels?: boolean,
      defaultLists?: boolean,
      desc?: string,
      idOrganization?: string,
      idBoardSource?: string,
      keepFromSource?: 'all' | Array<string>,
      powerUps?: PowerUps,
      prefs?: {
        permissionLevel?: PermissionLevel,
        voting?: GroupPermission,
        comments?: GroupPermission,
        invitations?: Invitation,
        selfJoin?: boolean,
        cardCovers?: boolean,
        background?: string,
        cardAging?: CardAging,
        separator?: string,
      },
    } = {},
  ): Promise<*> {
    if (urlArgs.prefs) {
      urlArgs.prefs.separator = '_';
    }
    const updatedArgs = Object.assign({}, { name }, urlArgs);
    return this.performRequest('post', { urlArgs: updatedArgs });
  }
}
