/* @flow */

/* Internal dependencies */
import {
  InvalidBooleanError,
  InvalidNumberError,
  InvalidStringError,
  StringLengthError,
} from '../utils/errors';
import BaseResource from '../base-resource';
import Action from '../action';
import Card from '../card';
import Checklist from '../checklist';
import Label from '../label';
import List from '../list';
import Member from '../member';
import Membership from '../membership';
import Organization from '../organization';
import MyPref from './myPref';
import Pref from './pref';

/* Types */
import type {
  ActionInclusionQueryArgs,
  ActionLimitsQueryArgs,
  ActionMemberInclusionQueryArgs,
  AllOrNone,
  ArgumentGroup,
  Auth,
  BoardField,
  BoardFilter,
  BoardStars,
  CardAttachmentInclusionQueryArgs,
  CardInclusionQueryArgs,
  ChecklistInclusionQueryArgs,
  DeltasQueryArgs,
  FieldsQueryArg,
  FilterDate,
  FilterQueryArg,
  Format,
  LabelColor,
  LabelInclusionQueryArgs,
  ListFilter,
  ListInclusionQueryArgs,
  MemberCreatorInclusionQueryArgs,
  MemberInclusionQueryArgs,
  MembershipFilter,
  MembershipsMemberInclusionQueryArgs,
  MembersInvitedInclusionQueryArgs,
  OrganizationInclusionQueryArgs,
  PowerUp,
  PrefsQueryArgs,
  ResourceConstructorOptions,
} from '../types';

type LabelNamesQueryArgs = {
  labelNames?: {
    green?: string,
    yellow?: string,
    orange?: string,
    red?: string,
    purple?: string,
    blue?: string,
  },
};

type SharedGetQueryArgs =
  ActionInclusionQueryArgs &
  ActionLimitsQueryArgs &
  OrganizationInclusionQueryArgs &
  FieldsQueryArg<BoardField> &
  {
    actionsFormat?: Format,
    memberships?: ArgumentGroup<MembershipFilter>,
  };

export default class Board extends BaseResource {
  constructor(
    auth: Auth,
    options?: ResourceConstructorOptions = {},
  ) {
    super(auth, 'board', options);
  }

  getBoard(
    queryArgs?: SharedGetQueryArgs &
      ActionMemberInclusionQueryArgs &
      CardAttachmentInclusionQueryArgs &
      CardInclusionQueryArgs &
      ChecklistInclusionQueryArgs &
      LabelInclusionQueryArgs &
      ListInclusionQueryArgs &
      MemberCreatorInclusionQueryArgs &
      MemberInclusionQueryArgs &
      MembershipsMemberInclusionQueryArgs &
      MembersInvitedInclusionQueryArgs &
      {
        actionsSince?: FilterDate,
        cardChecklists?: AllOrNone,
        cardPluginData?: boolean,
        cardStickers?: boolean,
        boardStars?: BoardStars,
        labelsLimit?: number,
        pluginData?: boolean,
        organizationMemberships?: ArgumentGroup<MembershipFilter>,
        organizationPluginData?: boolean,
        myPrefs?: boolean,
        tags?: boolean,
      } = {},
  ): Promise<*> {
    return this.httpGet('/', queryArgs);
  }

  getBoards(
    queryArgs?: SharedGetQueryArgs &
      FilterQueryArg<BoardFilter> &
      {
        lists?: ListFilter,
      } = {},
  ): Promise<*> {
    return this.httpGet('/', queryArgs);
  }

  getFieldValue(field: BoardField): Promise<*> {
    if (typeof field !== 'string') {
      throw new InvalidStringError('field', this.getHelpLink('get', 'field'));
    }
    return this.httpGet(`/${field}`);
  }

  getFilteredBoards(queryArgs: FilterQueryArg<BoardFilter>): Promise<*> {
    return this.httpGet('/', queryArgs);
  }

  actions() {
    return new Action(this.auth, this.getOptionsForChild());
  }

  getBoardStars(queryArgs?: FilterQueryArg<BoardStars>): Promise<*> {
    let filter = '';
    if (queryArgs) {
      filter = queryArgs.filter;
    }
    if (typeof filter !== 'string') {
      throw new InvalidStringError('filter',
        this.getHelpLink('get', 'boardstars'));
    }
    return this.httpGet('/boardStars', queryArgs);
  }

  cards(cardId?: string = '') {
    return new Card(this.auth, this.getOptionsForChild(cardId));
  }

  checklists() {
    return new Checklist(this.auth, this.getOptionsForChild());
  }

  getDeltas(queryArgs: DeltasQueryArgs): Promise<*> {
    const { tags, ixLastUpdate } = queryArgs;
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

  labels(labelId?: string = '') {
    return new Label(this.auth, this.getOptionsForChild(labelId));
  }

  lists() {
    return new List(this.auth, this.getOptionsForChild());
  }

  members(memberId?: string = '') {
    return new Member(this.auth, this.getOptionsForChild(memberId));
  }

  membersInvited() {
    return new Member(
      this.auth, this.getOptionsForChild('', '/membersInvited'));
  }

  memberships(membershipId?: string = '') {
    return new Membership(this.auth, this.getOptionsForChild(membershipId));
  }

  myPrefs() {
    return new MyPref(this.auth, this.instanceId);
  }

  organization() {
    // "organization" must be singular for board requests.
    return new Organization(
      this.auth, this.getOptionsForChild('', '/organization'));
  }

  getPluginData(): Promise<*> {
    return this.httpGet('/pluginData');
  }

  updateBoard(
    queryArgs?: PrefsQueryArgs &
      LabelNamesQueryArgs &
      {
        name?: string,
        desc?: string,
        closed?: boolean,
        subscribed?: boolean,
        idOrganization?: string,
        separator?: string,
      } = {},
  ): Promise<*> {
    return this.httpPut('/', { ...queryArgs, separator: '/' });
  }

  updateClosedStatus(value: boolean): Promise<*> {
    if (typeof value !== 'boolean') {
      throw new InvalidBooleanError('value', this.getHelpLink('get', 'closed'));
    }
    return this.httpPut('/closed', { value });
  }

  updateDescription(value: string): Promise<*> {
    if (typeof value !== 'string') {
      throw new InvalidStringError('value', this.getHelpLink('get', 'desc'));
    }
    if (value.length < 0 || value.length > 16384) {
      throw new StringLengthError('value');
    }
    return this.httpPut('/desc', { value });
  }

  updateOrganizationId(value: string): Promise<*> {
    return this.httpPut('/idOrganization', { value });
  }

  updateLabelNameForColor(
    labelColor: LabelColor,
    value: string,
  ): Promise<*> {
    return this.httpPut(`/labelNames/${labelColor}`, { value });
  }

  updateName(value: string): Promise<*> {
    return this.httpPut('/name', { value });
  }

  prefs() {
    return new Pref(this.auth, this.instanceId);
  }

  updateSubscribed(value: boolean): Promise<*> {
    return this.httpPut('/subscribed', { value });
  }

  createBoard(
    queryArgs: PrefsQueryArgs &
      {
        name: string,
        defaultLabels?: boolean,
        defaultLists?: boolean,
        desc?: string,
        idBoardSource?: string,
        idOrganization?: string,
        keepFromSource?: 'all' | Array<string>,
        powerUps?: ArgumentGroup<PowerUp>,
      },
  ): Promise<*> {
    return this.httpPost('/', queryArgs);
  }

  generateCalendarKey(): Promise<*> {
    return this.httpPost('/calendarKey/generate');
  }

  generateEmailKey(): Promise<*> {
    return this.httpPost('/emailKey/generate');
  }

  addTags(value: string): Promise<*> {
    return this.httpPost('/tags', { value });
  }

  markAsViewed(): Promise<*> {
    return this.httpPost('/markAsViewed');
  }

  addPowerUps(value: PowerUp): Promise<*> {
    return this.httpPost('/powerUps', { value });
  }

  deletePowerUp(powerUp: PowerUp): Promise<*> {
    return this.httpDelete(`/powerUps/${powerUp}`);
  }
}
