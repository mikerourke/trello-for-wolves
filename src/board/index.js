/* @flow */

/* Internal dependencies */
import {
  InvalidBooleanError,
  InvalidNumberError,
  InvalidStringError,
  StringLengthError,
} from '../errors';
import BaseEntity from '../base-entity';
import MyPref from './myPref';
import Pref from './pref';

/* Types */
import type {
  ActionChildrenQueryArgs,
  AllOrNone,
  ArgumentGroup,
  AttachmentField,
  Auth,
  BoardField,
  BoardStars,
  CardAging,
  CardField,
  CardStatus,
  ChecklistField,
  Format,
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
  PowerUp,
} from '../types';


type PrefsQueryArgs = {
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
};

type LabelNamesQueryArgs = {
  labelNames?: {
    green?: string,
    yellow?: string,
    orange?: string,
    red?: string,
    purple?: string,
    blue?: string,
    separator: string,
  },
};

/**
 * Class representing a Board entity.
 * @extends BaseEntity
 */
export default class Board extends BaseEntity {
  constructor(
    auth: Auth,
    boardId: string,
    parentType?: string,
    parentId?: string,
  ) {
    super(auth, 'board', boardId, parentType, parentId);
  }

  myPrefs() {
    return new MyPref(this.auth, this.entityId);
  }

  prefs() {
    return new Pref(this.auth, this.entityId);
  }

  getBoard(queryArgs?: ActionChildrenQueryArgs & {
    fields?: ArgumentGroup<BoardField>,
    actionsFormat?: Format,
    actionsLimit?: number,
    actionMember?: boolean,
    actionMemberFields?: ArgumentGroup<MemberField>,
    actionMemberCreator?: boolean,
    actionMemberCreatorFields?: ArgumentGroup<MemberField>,
    cards?: CardStatus,
    cardFields?: ArgumentGroup<CardField>,
    cardAttachments?: boolean,
    cardAttachmentFields?: ArgumentGroup<AttachmentField>,
    cardChecklists?: AllOrNone,
    cardPluginData?: boolean,
    cardStickers?: boolean,
    boardStars?: BoardStars,
    labels?: AllOrNone,
    labelFields?: ArgumentGroup<LabelField>,
    labelsLimit?: number, // Valid values 0 to 1000
    lists?: ListStatus,
    listFields?: ArgumentGroup<ListField>,
    memberships?: ArgumentGroup<Membership>,
    membershipsMember?: boolean,
    membershipsMemberFields?: ArgumentGroup<MemberField>,
    members?: MemberLevel,
    memberFields?: ArgumentGroup<MemberField>,
    membersInvited?: MemberLevel,
    membersInvitedFields?: ArgumentGroup<MemberField>,
    pluginData?: boolean,
    checklists?: AllOrNone,
    checklistFields?: ArgumentGroup<ChecklistField>,
    organization?: boolean,
    organizationFields?: ArgumentGroup<OrganizationField>,
    organizationMemberships?: ArgumentGroup<Membership>,
    organizationPluginData?: boolean,
    myPrefs?: boolean,
    tags?: boolean,
  } = {}): Promise<*> {
    return this.httpGet('/', queryArgs);
  }

  getFieldValue(field: BoardField): Promise<*> {
    if (typeof field !== 'string') {
      throw new InvalidStringError('field',
        'board#get-1-boards-board-id-field');
    }
    return this.httpGet(`/${field}`);
  }

  getBoardStars(queryArgs?: {
    filter?: BoardStars,
  }): Promise<*> {
    const { filter = '' } = queryArgs;
    if (typeof filter !== 'string') {
      throw new InvalidStringError('filter',
        this.getHelpLink('get', 'boardstars'));
    }
    return this.httpGet('/boardStars', queryArgs);
  }

  getDeltas(queryArgs: {
    tags: string,
    ixLastUpdate: number,
  }): Promise<*> {
    const { tags = '', ixLastUpdate = 0 } = queryArgs;
    const helpLink = this.getHelpLink('get', 'deltas');
    if (typeof tags !== 'string') {
      throw new InvalidStringError('tags', helpLink);
    }
    if (typeof ixLastUpdate !== 'number') {
      throw new InvalidNumberError('ixLastUpdate', helpLink);
    }
    return this.httpGet('/deltas', queryArgs);
  }

  getTags(): Promise<*> {
    return this.httpGet('/tags');
  }

  getMyPrefs(): Promise<*> {
    return this.httpGet('/myPrefs');
  }

  getPluginData(): Promise<*> {
    return this.httpGet('/pluginData');
  }

  updateBoard(queryArgs?: PrefsQueryArgs & LabelNamesQueryArgs & {
    name?: string,
    desc?: string,
    closed?: boolean,
    subscribed?: boolean,
    idOrganization?: string,
  } = {}): Promise<*> {
    const updatedArgs = queryArgs;
    updatedArgs.prefs.separator = '/';
    updatedArgs.labelNames.separator = '/';
    return this.httpPut('/', queryArgs);
  }

  updateClosedStatus(queryArgs: {
    value: boolean,
  }): Promise<*> {
    const { value } = queryArgs;
    if (typeof value !== 'boolean') {
      throw new InvalidBooleanError('value', this.getHelpLink('get', 'closed'));
    }
    return this.httpPut('/closed', queryArgs);
  }

  updateDescription(queryArgs: {
    value: string,
  }): Promise<*> {
    const { value } = queryArgs;
    if (typeof value !== 'string') {
      throw new InvalidStringError('value', this.getHelpLink('get', 'desc'));
    }
    if (value.length < 0 || value.length > 16384) {
      throw new StringLengthError('value');
    }
    return this.httpPut('/desc', queryArgs);
  }

  updateOrganizationId(queryArgs: {
    value: string,
  }): Promise<*> {
    return this.httpPut('/idOrganization', queryArgs);
  }

  updateLabelNameForColor(
    labelColor: LabelColor,
    queryArgs: {
      value: string,
    },
  ): Promise<*> {
    return this.httpPut(`/labelNames/${labelColor}`, queryArgs);
  }

  updateName(queryArgs: {
    value: string,
  }): Promise<*> {
    return this.httpPut('/name', queryArgs);
  }

  updateSubscribed(queryArgs: {
    value: boolean,
  }): Promise<*> {
    return this.httpPut('/subscribed', queryArgs);
  }

  createBoard(queryArgs: PrefsQueryArgs & {
    name: string,
    defaultLabels?: boolean,
    defaultLists?: boolean,
    desc?: string,
    idOrganization?: string,
    idBoardSource?: string,
    keepFromSource?: 'all' | Array<string>,
    powerUps?: ArgumentGroup<PowerUp>,
  }): Promise<*> {
    return this.httpPost('/', queryArgs);
  }

  generateCalendarKey(): Promise<*> {
    return this.httpPost('/calendarKey/generate');
  }

  generateEmailKey(): Promise<*> {
    return this.httpPost('/emailKey/generate');
  }

  addTags(queryArgs: {
    value: string,
  }): Promise<*> {
    return this.httpPost('/tags', queryArgs);
  }

  markAsViewed(): Promise<*> {
    return this.httpPost('/markAsViewed');
  }

  addPowerUps(queryArgs: {
    value: PowerUp,
  }): Promise<*> {
    return this.httpPost('/powerUps', queryArgs);
  }

  // TODO: Look into this.  Does the power up need to be specified as a value and in the endpoint?
  deletePowerUp(queryArgs: {
    value: PowerUp,
  }): Promise<*> {
    const { value } = queryArgs;
    return this.httpDelete(`/powerUps/${value}`, queryArgs);
  }
}
