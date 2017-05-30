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
  ActionChildrenUrlArgs,
  ActionDate,
  ActionType,
  ActionField,
  ActionsFormat,
  AllOrNone,
  ArgumentGroup,
  AttachmentField,
  AttachmentUrlArgs,
  Auth,
  CardAging,
  CardField,
  CardStatus,
  ChecklistField,
  EntityInstance,
  GroupPermission,
  Invitation,
  LabelColor,
  LabelField,
  ListField,
  ListStatus,
  MemberField,
  MemberLevel,
  Membership,
  OrganizationField,
  PermissionLevel,
  Position,
  PowerUp,
} from '../types';

export type BoardField =
  'closed'
  | 'dateLastActivity'
  | 'dateLastView'
  | 'desc'
  | 'descData'
  | 'idOrganization'
  | 'invitations'
  | 'invited'
  | 'labelNames'
  | 'memberships'
  | 'name'
  | 'pinned'
  | 'powerUps'
  | 'prefs'
  | 'shortLink'
  | 'shortUrl'
  | 'starred'
  | 'subscribed'
  | 'url';
export type BoardPref =
  'background'
  | 'calendarFeedEnabled'
  | 'cardAging'
  | 'cardCovers'
  | 'comments'
  | 'invitations'
  | 'permissionLevel'
  | 'selfJoin'
  | 'voting';
export type BoardStars = 'none' | 'mine';
export type MyPref =
  'emailPosition'
  | 'idEmailList'
  | 'showListGuide'
  | 'showSidebar'
  | 'showSidebarActivity'
  | 'showSidebarBoardActions'
  | 'showSidebarMembers';

type PrefsUrlArgs = {
  prefs_permissionLevel?: PermissionLevel,
  prefs_voting?: GroupPermission,
  prefs_comments?: GroupPermission,
  prefs_invitations?: Invitation,
  prefs_selfJoin?: boolean,
  prefs_cardCovers?: boolean,
  prefs_background?: string,
  prefs_cardAging?: CardAging,
};

/**
 * Class representing a Board entity.
 * @extends Entity
 */
export default class Board extends Entity {
  constructor(
    auth: Auth,
    boardId?: string = '',
    parent?: ?EntityInstance,
  ) {
    super(auth, 'board', boardId, parent);
  }

  getBoard(
    fields?: ArgumentGroup<BoardField>,
    urlArgs?: ActionChildrenUrlArgs & {
      actions_format?: ActionsFormat,
      actions_limit?: number,
      action_member?: boolean,
      action_member_fields?: ArgumentGroup<MemberField>,
      action_memberCreator?: boolean,
      action_memberCreator_fields?: ArgumentGroup<MemberField>,
      cards?: CardStatus,
      card_fields?: ArgumentGroup<CardField>,
      card_attachments?: boolean,
      card_attachment_fields?: ArgumentGroup<AttachmentField>,
      card_checklists?: AllOrNone,
      card_pluginData?: boolean,
      card_stickers?: boolean,
      boardStars?: BoardStars,
      labels?: AllOrNone,
      label_fields?: ArgumentGroup<LabelField>,
      labels_limit?: number, // Valid values 0 to 1000
      lists?: ListStatus,
      list_fields?: ArgumentGroup<ListField>,
      memberships?: ArgumentGroup<Membership>,
      memberships_member?: boolean,
      memberships_member_fields?: ArgumentGroup<MemberField>,
      members?: MemberLevel,
      member_fields?: ArgumentGroup<MemberField>,
      membersInvited?: MemberLevel,
      membersInvited_fields?: ArgumentGroup<MemberField>,
      pluginData?: boolean,
      checklists?: AllOrNone,
      checklist_fields?: ArgumentGroup<ChecklistField>,
      organization?: boolean,
      organization_fields?: ArgumentGroup<OrganizationField>,
      organization_memberships?: ArgumentGroup<Membership>,
      organization_pluginData?: boolean,
      myPrefs?: boolean,
      tags?: boolean,
    } = {},
  ): Promise<*> {
    return this.performRequest('get', { urlArgs: { ...urlArgs, fields } });
  }

  getFieldValue(field: BoardField): Promise<*> {
    if (typeof field !== 'string') {
      throw new InvalidStringError('field',
        'board#get-1-boards-board-id-field');
    }
    return this.performRequest('get', { path: field });
  }

  getBoardStars(filter?: BoardStars = 'mine'): Promise<*> {
    if (typeof filter !== 'string') {
      throw new InvalidStringError('filter',
        'board#get-1-boards-board-id-boardstars');
    }
    return this.performRequest('get', {
      path: 'boardStars',
      urlArgs: { filter },
    });
  }

  getDeltas(tags: string, ixLastUpdate: number): Promise<*> {
    if (typeof tags !== 'string') {
      throw new InvalidStringError('tags',
        'board#get-1-boards-board-id-deltas');
    }
    return this.performRequest('get', {
      path: 'deltas',
      urlArgs: { tags, ixLastUpdate },
    });
  }

  getTags(): Promise<*> {
    return this.performRequest('get', { path: 'tags' });
  }

  getMyPrefs(): Promise<*> {
    return this.performRequest('get', { path: 'myPrefs' });
  }

  getPluginData(): Promise<*> {
    return this.performRequest('get', { path: 'pluginData' });
  }

  updateBoard(urlArgs?: PrefsUrlArgs & {
    name?: string,
    desc?: string,
    closed?: boolean,
    subscribed?: boolean,
    idOrganization?: string,
    labelNames_green?: string,
    labelNames_yellow?: string,
    labelNames_orange?: string,
    labelNames_red?: string,
    labelNames_purple?: string,
    labelNames_blue?: string,
  } = {}): Promise<*> {
    // TODO: Test this to make sure it works.
    const updatedArgs = {};
    Object.keys(urlArgs).forEach((argKey) => {
      const updatedKey = argKey.replace('_', '/');
      updatedArgs[updatedKey] = urlArgs[argKey];
    });
    return this.performRequest('put', { urlArgs: updatedArgs });
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

  updateOrganizationId(value: string): Promise<*> {
    return this.performRequest('put', {
      path: 'idOrganization',
      urlArgs: { value },
    });
  }

  updateLabelNameForColor(
    labelColor: LabelColor,
    newValue: string,
  ): Promise<*> {
    return this.performRequest('put', {
      path: `labelNames/${labelColor}`,
      urlArgs: { value: newValue },
    });
  }

  updateMyPref(
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
      path: `myPrefs/${myPrefName}`,
      urlArgs: { value },
    });
  }

  updateName(value: string): Promise<*> {
    return this.performRequest('put', { path: 'name', urlArgs: { value } });
  }

  updatePref(
    prefName: BoardPref,
    value: boolean | string | CardAging | Invitation | GroupPermission |
           PermissionLevel,
  ): Promise<*> {
    return this.performRequest('put', {
      path: `prefs/${prefName}`,
      urlArgs: { value },
    });
  }

  updateSubscribed(value: boolean): Promise<*> {
    return this.performRequest('put', {
      path: 'subscribed',
      urlArgs: { value },
    });
  }

  createBoard(
    name: string,
    urlArgs?: PrefsUrlArgs & {
      defaultLabels?: boolean,
      defaultLists?: boolean,
      desc?: string,
      idOrganization?: string,
      idBoardSource?: string,
      keepFromSource?: 'all' | Array<string>,
      powerUps?: ArgumentGroup<PowerUp>,
    } = {},
  ): Promise<*> {
    const updatedArgs = { ...urlArgs, name };
    return this.performRequest('post', { urlArgs: updatedArgs });
  }

  generateCalendarKey() {
    return this.performRequest('post', { path: 'calendarKey/generate' });
  }

  generateEmailKey() {
    return this.performRequest('post', { path: 'emailKey/generate' });
  }

  addTags(value: string) {
    return this.performRequest('post', { path: 'tags', urlArgs: { value } });
  }

  markAsViewed() {
    return this.performRequest('post', { path: 'markAsViewed' });
  }

  addPowerUps(value: PowerUp) {
    return this.performRequest('post', {
      path: 'powerUps',
      urlArgs: { value },
    });
  }

  // TODO: Look into this.  Does the power up need to be specified as a value and in the endpoint?
  deletePowerUp(value: PowerUp) {
    return this.performRequest('delete', {
      path: `powerUps/${value}`,
      urlArgs: { value },
    });
  }
}
