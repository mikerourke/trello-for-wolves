/* @flow */

/* External dependencies */
import Promise, { resolve } from 'bluebird';

/* Internal dependencies */
import {
  InvalidBooleanError,
  InvalidStringError,
  StringLengthError,
} from '../lib/errors';
import request from '../lib/request';
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
} from '../types';

/**
 * Class representing a Board entity.
 * @extends Entity
 */
export default class Board extends Entity {
  constructor(
    auth: Auth,
    boardId?: string = '',
    parent?: ?EntityInstance
  ) {
    super(auth, 'board', boardId, parent);
  }

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
  }): Promise<*> {
    return this.performRequest('get', { urlArgs });
  }

  getFieldValue(field: BoardField): Promise<*> {
    if (typeof field !== 'string') {
      throw new InvalidStringError('field',
        'board#get-1-boards-board-id-field');
    }
    return this.performRequest('get', { path: field });
  }

  getStars(filter?: BoardStars = 'mine'): Promise<*> {
    if (typeof filter !== 'string') {
      throw new InvalidStringError('filter',
        'board#get-1-boards-board-id-boardstars');
    }
    return this.performRequest('get', {
      path: 'boardStars', urlArgs: { filter }});
  }

  getDeltas(tags: string, ixLastUpdate: number): Promise<*> {
    if (typeof tags !== 'string') {
      throw new InvalidStringError('tags',
        'board#get-1-boards-board-id-deltas');
    }
    return this.performRequest('get', {
      path: 'deltas', urlArgs: { tags, ixLastUpdate } });
  }

  getTags(): Promise<*> {
    return this.performRequest('get', 'tags');
  }

  getMyPrefs(): Promise<*> {
    return this.performRequest('get', 'myPrefs');
  }

  getPluginData(): Promise<*> {
    return this.performRequest('get', 'pluginData');
  }

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
  }): Promise<*> {
    if (urlArgs) {
      urlArgs.prefs.separator = '/';
      urlArgs.labelNames.separator = '/';
    }
    return this.performRequest('put', { urlArgs });
  }

  updateClosedStatus(value: boolean): Promise<*> {
    if (typeof value !== 'boolean') {
      throw new InvalidBooleanError('value',
        'board#put-1-boards-board-id-closed');
    }
    return this.performRequest('put', { path: 'closed', urlArgs: { value } });
  }

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

  updateMyPrefs(
    myPrefName: MyPref,
    value: boolean | string | Position
  ): Promise<*> {
    const lowerCasePref = myPrefName.toString().toLowerCase();
    const helpUrl = `board#put-1-boards-board-id-myprefs-${lowerCasePref}`;

    if ((myPrefName === 'emailPosition' || myPrefName === 'idEmailList')
        && typeof value !== 'string') {
      throw new InvalidStringError(myPrefName, helpUrl);
    } else {
      if (typeof value !== 'boolean') {
        throw new InvalidBooleanError(myPrefName, helpUrl);
      }
    }
    return this.performRequest('put', {
      path: `myPrefs/${myPrefName}`, urlArgs: { value } });
  }
}
