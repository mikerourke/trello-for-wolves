/* @flow */

/* Internal dependencies */
import {
  InvalidBooleanError,
  InvalidNumberError,
  InvalidStringError,
  StringLengthError,
} from '../utils/errors';
import BaseResource from '../base-resource';
import MyPref from './myPref';
import Pref from './pref';

/* Types */
import type {
  ActionInclusionQueryArgs,
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
  FilterQueryArg,
  Format,
  LabelColor,
  LabelInclusionQueryArgs,
  ListInclusionQueryArgs,
  MemberCreatorInclusionQueryArgs,
  MemberField,
  MemberLevel,
  Membership,
  MembershipsMemberInclusionQueryArgs,
  MembersInvitedInclusionQueryArgs,
  OrganizationInclusionQueryArgs,
  PowerUp,
  PrefsQueryArgs,
  ResourceConstructorOptions,
  ValueQueryArg,
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

export default class Board extends BaseResource {
  constructor(
    auth: Auth,
    options?: ResourceConstructorOptions = {},
  ) {
    super(auth, 'board', options);
  }

  myPrefs() {
    return new MyPref(this.auth, this.instanceId);
  }

  prefs() {
    return new Pref(this.auth, this.instanceId);
  }

  getBoard(queryArgs?: ActionInclusionQueryArgs &
    CardAttachmentInclusionQueryArgs &
    CardInclusionQueryArgs &
    ChecklistInclusionQueryArgs &
    LabelInclusionQueryArgs &
    ListInclusionQueryArgs &
    MemberCreatorInclusionQueryArgs &
    MembershipsMemberInclusionQueryArgs &
    MembersInvitedInclusionQueryArgs &
    OrganizationInclusionQueryArgs &
    FieldsQueryArg<BoardField> &
    {
      actionsEntities?: boolean,
      actionsDisplay?: boolean,
      actionsLimit?: number,
      actionsFormat?: Format,
      actionMember?: boolean,
      actionMemberFields?: ArgumentGroup<MemberField>,
      actionMemberCreator?: boolean,
      actionMemberCreatorFields?: ArgumentGroup<MemberField>,
      cardChecklists?: AllOrNone,
      cardPluginData?: boolean,
      cardStickers?: boolean,
      boardStars?: BoardStars,
      labelsLimit?: number, // Valid values 0 to 1000
      memberships?: ArgumentGroup<Membership>,
      members?: MemberLevel,
      memberFields?: ArgumentGroup<MemberField>,
      pluginData?: boolean,
      organizationMemberships?: ArgumentGroup<Membership>,
      organizationPluginData?: boolean,
      myPrefs?: boolean,
      tags?: boolean,
    } = {},
  ): Promise<*> {
    return this.httpGet('/', queryArgs);
  }

  getFieldValue(field: BoardField): Promise<*> {
    if (typeof field !== 'string') {
      throw new InvalidStringError('field',
        'board#get-1-boards-board-id-field');
    }
    return this.httpGet(`/${field}`);
  }

  getFilteredBoards(queryArgs: FilterQueryArg<BoardFilter>): Promise<*> {
    return this.httpGet('/', queryArgs);
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

  getMyPrefs(): Promise<*> {
    return this.httpGet('/myPrefs');
  }

  getPluginData(): Promise<*> {
    return this.httpGet('/pluginData');
  }

  getStars(queryArgs?: FilterQueryArg<BoardStars>): Promise<*> {
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

  updateBoard(queryArgs?: PrefsQueryArgs &
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

  updateClosedStatus(queryArgs: ValueQueryArg<boolean>): Promise<*> {
    const { value } = queryArgs;
    if (typeof value !== 'boolean') {
      throw new InvalidBooleanError('value', this.getHelpLink('get', 'closed'));
    }
    return this.httpPut('/closed', queryArgs);
  }

  updateDescription(queryArgs: ValueQueryArg<string>): Promise<*> {
    const { value } = queryArgs;
    if (typeof value !== 'string') {
      throw new InvalidStringError('value', this.getHelpLink('get', 'desc'));
    }
    if (value.length < 0 || value.length > 16384) {
      throw new StringLengthError('value');
    }
    return this.httpPut('/desc', queryArgs);
  }

  updateOrganizationId(queryArgs: ValueQueryArg<string>): Promise<*> {
    return this.httpPut('/idOrganization', queryArgs);
  }

  updateLabelNameForColor(
    labelColor: LabelColor,
    queryArgs: ValueQueryArg<string>,
  ): Promise<*> {
    return this.httpPut(`/labelNames/${labelColor}`, queryArgs);
  }

  updateName(queryArgs: ValueQueryArg<string>): Promise<*> {
    return this.httpPut('/name', queryArgs);
  }

  updateSubscribed(queryArgs: ValueQueryArg<boolean>): Promise<*> {
    return this.httpPut('/subscribed', queryArgs);
  }

  createBoard(queryArgs: PrefsQueryArgs & {
    name: string,
    defaultLabels?: boolean,
    defaultLists?: boolean,
    desc?: string,
    idBoardSource?: string,
    idOrganization?: string,
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

  addTags(queryArgs: ValueQueryArg<string>): Promise<*> {
    return this.httpPost('/tags', queryArgs);
  }

  markAsViewed(): Promise<*> {
    return this.httpPost('/markAsViewed');
  }

  addPowerUps(queryArgs: ValueQueryArg<PowerUp>): Promise<*> {
    return this.httpPost('/powerUps', queryArgs);
  }

  // TODO: Look into this.  Does the power up need to be specified as a value and in the endpoint?
  deletePowerUp(queryArgs: ValueQueryArg<PowerUp>): Promise<*> {
    const { value } = queryArgs;
    return this.httpDelete(`/powerUps/${value}`, queryArgs);
  }
}
