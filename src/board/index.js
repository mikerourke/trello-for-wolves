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

/**
 * @apiDefine BoardSharedGetQueryArgs
 * @apiParam {String="list","count","minimal"} [actionsFormat='"list"'] Format
 *    for returning actions in the response.
 * @apiParam {String="all","active","admin","deactivated","me","none","normal"} [memberships='"none"']
 *    Memberships to include in the response.
 */
type SharedGetQueryArgs =
  ActionInclusionQueryArgs &
  ActionLimitsQueryArgs &
  OrganizationInclusionQueryArgs &
  FieldsQueryArg<BoardField> &
  {
    actionsFormat?: Format,
    memberships?: ArgumentGroup<MembershipFilter>,
  };

/**
 * @api {path} /boards board
 * @apiVersion 1.0.0
 * @apiName board
 * @apiGroup overview
 * @apiDescription
 * Boards are the highest level concept within the Trello workflow. The Boards
 * API allows you to list, view, create, and edit Boards. Each Board has a
 * name, description, a set of members attached, and an ordered array of Lists.
 * <br><br>
 * Boards can be open or closed, starred, and/or subscribed. Each
 * Board belongs to an organization. Each board also has a set of preferences
 * that affect its visual display, and additional features that may have been
 * attached to the Board (such as Power-Ups).
 */
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

  /**
   * @api {get} /boards/:boardId getBoard
   * @apiVersion 1.0.0
   * @apiName getBoard
   * @apiDescription Get details of a single board.
   * @apiGroup board
   * @apiPermission read
   *
   * @apiUse ActionInclusionQueryArgs
   * @apiUse ActionLimitsQueryArgs
   * @apiUse ActionMemberInclusionQueryArgs
   * @apiUse BoardFieldsQueryArg
   * @apiUse BoardSharedGetQueryArgs
   * @apiUse CardAttachmentInclusionQueryArgs
   * @apiUse ChecklistInclusionQueryArgs
   * @apiUse LabelInclusionQueryArgs
   * @apiUse ListInclusionQueryArgs
   * @apiUse MemberCreatorInclusionQueryArgs
   * @apiUse MemberInclusionQueryArgs
   * @apiUse MembershipsMemberInclusionQueryArgs
   * @apiUse MembersInvitedInclusionQueryArgs
   * @apiUse OrganizationInclusionQueryArgs
   *
   * @apiParam {String="all","none"} [cardChecklists='"none"'] Indicates if card
   *    checklists should be included in response.
   * @apiParam {Boolean} [cardPluginData=false] Indicates if card plugin data
   *    should be included in response.
   * @apiParam {Boolean} [cardStickers=false] Indicates if card stickers data
   *    should be included in response.
   * @apiParam {String="mine","none"} [boardStars='"none"'] Board stars to include
   *    in response.
   * @apiParam {Number{0-1000}} [labelsLimit=50] Maximum number of labels to
   *    show in response.
   * @apiParam {Boolean} [pluginData=false] Indicates if plugin data should
   *    be included in response.
   * @apiParam {String="all","active","admin","deactivated","me","none","normal"} [organizationMemberships='"none"']
   *    Organization memberships to include in the response.
   * @apiParam {Boolean} [organizationPluginData=false] Indicates if
   *    organization plugin data should be included in response.
   * @apiParam {Boolean} [myPrefs=false] Indicates if <code>myPrefs</code> data
   *    should be included in response.
   * @apiParam {Boolean} [tags=false] Indicates if tags data should be included
   *    in response.
   * @apiExample {js} Example:
   trello.boards('BoArDId').getBoard({ ... });
   */
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
        cardChecklists?: AllOrNone,
        cardPluginData?: boolean,
        cardStickers?: boolean,
        boardStars?: BoardStars,
        labelsLimit?: number, // Valid values 0 to 1000
        pluginData?: boolean,
        organizationMemberships?: ArgumentGroup<MembershipFilter>,
        organizationPluginData?: boolean,
        myPrefs?: boolean,
        tags?: boolean,
      } = {},
  ): Promise<*> {
    return this.httpGet('/', queryArgs);
  }

  getBoards(queryArgs?: SharedGetQueryArgs &
    FilterQueryArg<BoardFilter> &
    {
      lists?: ListFilter,
    } = {},
  ): Promise<*> {
    return this.httpGet('/', queryArgs);
  }

  /**
   * @api {get} /boards/:boardId/:field getFieldValue
   * @apiVersion 1.0.0
   * @apiName getFieldValue
   * @apiDescription Gets the value of the specified field on a board.
   * @apiGroup board
   * @apiPermission read
   *
   * @apiUse BoardFieldQueryArg
   * @apiExample {js} Example:
   trello.boards('BoArDId').getFieldValue('closed');
   */
  getFieldValue(field: BoardField): Promise<*> {
    if (typeof field !== 'string') {
      throw new InvalidStringError('field', this.getHelpLink('get', 'field'));
    }
    return this.httpGet(`/${field}`);
  }

  getFilteredBoards(queryArgs: FilterQueryArg<BoardFilter>): Promise<*> {
    return this.httpGet('/', queryArgs);
  }

  /**
   * @api {get} /boards/:boardId/deltas getDeltas
   * @apiVersion 1.0.0
   * @apiName getDeltas
   * @apiDescription Gets the deltas for a board.
   * @apiGroup board
   * @apiPermission read
   *
   * @apiUse DeltasQueryArgs
   * @apiExample {js} Example:
   trello.boards('BoArDId').getDeltas('none', 5);
   */
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

  /**
   * @api {get} /boards/:boardId/tags getTags
   * @apiVersion 1.0.0
   * @apiName getTags
   * @apiDescription Gets the tags associated with a board.
   * @apiGroup board
   * @apiPermission read
   * @apiExample {js} Example:
   trello.boards('BoArDId').getTags();
   */
  getTags(): Promise<*> {
    return this.httpGet('/tags');
  }

  /**
   * @api {get} /boards/:boardId/myPrefs getMyPrefs
   * @apiVersion 1.0.0
   * @apiName getMyPrefs
   * @apiDescription Gets all myPrefs associated with a board.
   * @apiGroup board
   * @apiPermission read
   * @apiExample {js} Example:
   trello.boards('BoArDId').getMyPrefs();
   */
  getMyPrefs(): Promise<*> {
    return this.httpGet('/myPrefs');
  }

  /**
   * @api {get} /boards/:boardId/pluginData getPluginData
   * @apiVersion 1.0.0
   * @apiName getPluginData
   * @apiDescription Gets plugin data associated with a board.
   * @apiGroup board
   * @apiPermission read
   * @apiExample {js} Example:
   trello.boards('BoArDId').getPluginData();
   */
  getPluginData(): Promise<*> {
    return this.httpGet('/pluginData');
  }

  /**
   * @api {get} /boards/:boardId/boardStars getBoardStars
   * @apiVersion 1.0.0
   * @apiName getBoardStars
   * @apiDescription Gets the stars associated with a board.
   * @apiGroup board
   * @apiPermission read
   *
   * @apiUse BoardStarsFilterQueryArg
   * @apiExample {js} Example:
   trello.boards('BoArDId').getBoardStars('none');
   */
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

  addTags(queryArgs: ValueQueryArg<string>): Promise<*> {
    return this.httpPost('/tags', queryArgs);
  }

  markAsViewed(): Promise<*> {
    return this.httpPost('/markAsViewed');
  }

  addPowerUps(queryArgs: ValueQueryArg<PowerUp>): Promise<*> {
    return this.httpPost('/powerUps', queryArgs);
  }

  deletePowerUp(powerUp: PowerUp): Promise<*> {
    return this.httpDelete(`/powerUps/${powerUp}`);
  }
}
