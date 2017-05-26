/* @flow */

/* External dependencies */
import Promise, { resolve } from 'bluebird';

/* Internal dependencies */
import { buildEndpointString } from '../lib/string-builder';
import request from '../lib/request';
import Action from './action';

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
  CardAging,
  CardFields,
  CardStatus,
  ChecklistFields,
  Entity,
  GroupPermission,
  Invitation,
  LabelFields,
  ListFields,
  ListStatus,
  MemberFields,
  MemberLevel,
  Memberships,
  OrganizationFields,
  PermissionLevel,
} from '../types';

type BoardStars = 'none' | 'mine';

export default class Board {
  auth: Auth;
  endpoint: string;
  entity: Entity;

  constructor(auth: Auth, boardId?: string = '', parent?: ?Entity) {
    this.auth = auth;
    this.endpoint = buildEndpointString('boards', boardId, parent);
    this.entity = { id: boardId, entityName: 'board' };
  }

  getBoard(options?: {
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
    return resolve(request(this.auth, 'get', this.endpoint, options));
  }

  getFieldValue(field: BoardField): Promise<*> {
    return resolve(request(this.auth, 'get', `${this.endpoint}/${field}`));
  }

  getStars(filter?: BoardStars = 'mine'): Promise<*> {
    return resolve(
      request(this.auth, 'get', `${this.endpoint}/boardStars`, { filter }));
  }

  getDeltas(tags: string, ixLastUpdate: number): Promise<*> {
    return resolve(request(this.auth, 'get', `${this.endpoint}/deltas`,
      { tags, ixLastUpdate }));
  }

  getTags(): Promise<*> {
    return resolve(request(this.auth, 'get', `${this.endpoint}/tags`));
  }

  getMyPrefs(): Promise<*> {
    return resolve(request(this.auth, 'get', `${this.endpoint}/myPrefs`));
  }

  getPluginData(): Promise<*> {
    return resolve(request(this.auth, 'get', `${this.endpoint}/pluginData`));
  }

  updateBoard(options?: {
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
    },
    labelNames?: {
      green?: string,
      yellow?: string,
      orange?: string,
      red?: string,
      purple?: string,
      blue?: string,
    },
  }): Promise<*> {
    return resolve(request(this.auth, 'put', `${this.endpoint}`, options));
  }

  actions() {
    return new Action(this.auth, '', this.entity);
  }
}
