// @flow
import BaseResource from './baseResource';
import Action from './action';
import Card from './card';
import Checklist from './checklist';
import Label from './label';
import List from './list';
import Member from './member';
import Membership from './membership';
import Organization from './organization';
import type {
  ActionField,
  ActionFilter,
  AllOrNone,
  ArgumentGroup,
  AttachmentField,
  AttachmentFilter,
  CardAging,
  CardField,
  CardFilter,
  ChecklistField,
  FilterDate,
  Format,
  KeepFromSourceField,
  LabelColor,
  LabelField,
  ListField,
  ListFilter,
  MemberField,
  MemberFilter,
  MembershipFilter,
  OrganizationField,
  PermissionLevel,
  Position,
} from '../types';

export type BoardField =
  | 'closed'
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

export type BoardFilter =
  | 'closed'
  | 'members'
  | 'open'
  | 'organization'
  | 'pinned'
  | 'public'
  | 'starred'
  | 'unpinned';

export type BoardMemberType = 'admin' | 'normal' | 'observer';

export type BoardStarsFilter = 'none' | 'mine';

type BoardPermissionLevel = PermissionLevel | 'org';

type GroupPermission = 'disabled' | 'members' | 'observers' | 'org' | 'public';

type Invitation = 'admins' | 'members';

type PowerUp = 'calendar' | 'cardAging' | 'recap' | 'voting';

class MyPref extends BaseResource {
  getMyPrefs(): Promise<any> {
    return this.httpGet('/');
  }

  /**
   * @api {put} /boards/:boardId/myPrefs/emailPosition updateEmailPosition
   * @apiVersion 1.0.0
   * @apiName updateEmailPosition
   * @apiDescription Update the position of the email address.
   * @apiGroup board
   * @apiPermission write
   *
   * @apiParam {String="bottom","top"} value New position of the email address.
   * @apiExample {js} Example:
   * trello.boards('BoArDId').myPrefs().updateEmailPosition('top');
   */
  updateEmailPosition(value: Position): Promise<any> {
    return this.httpPut('/emailPosition', { value });
  }

  /**
   * @api {put} /boards/:boardId/myPrefs/idEmailList moveToEmailList
   * @apiVersion 1.0.0
   * @apiName moveToEmailList
   * @apiDescription Move the board to the specified email list.
   * @apiGroup board
   * @apiPermission write
   *
   * @apiParam {String} value The ID of the email list.
   * @apiExample {js} Example:
   * trello.boards('BoArDId').myPrefs().moveToEmailList('eMaIlLiStId');
   */

  /**
   * @example
   * PUT > .../boards/[boardId]/myPrefs/idEmailList?value=[emailListId]&key=...
   * @see {@link https://developers.trello.com/advanced-reference/board#put-1-boards-board-id-myprefs-idemaillist}
   */
  /* istanbul ignore next: Requires special permissions */
  moveToEmailList(emailListId: string): Promise<any> {
    return this.httpPut('/idEmailList', { value: emailListId });
  }

  /**
   * @api {put} /boards/:boardId/myPrefs/showListGuide updateShowListGuide
   * @apiVersion 1.0.0
   * @apiName updateShowListGuide
   * @apiDescription Update the visibility of the list guide.
   * @apiGroup board
   * @apiPermission write
   *
   * @apiParam {Boolean} value Indicates if the list guide should be shown.
   * @apiExample {js} Example:
   * trello.boards('BoArDId').myPrefs().updateShowListGuide(true);
   */
  updateShowListGuide(value: boolean): Promise<any> {
    return this.httpPut('/showListGuide', { value });
  }

  /**
   * @api {put} /boards/:boardId/myPrefs/showSidebar updateShowSidebar
   * @apiVersion 1.0.0
   * @apiName updateShowSidebar
   * @apiDescription Update the visibility of the sidebar.
   * @apiGroup board
   * @apiPermission write
   *
   * @apiParam {Boolean} value Indicates if the sidebar should be shown.
   * @apiExample {js} Example:
   * trello.boards('BoArDId').myPrefs().updateShowSidebar(true);
   */
  updateShowSidebar(value: boolean): Promise<any> {
    return this.httpPut('/showSidebar', { value });
  }

  /**
   * @api {put} /boards/:boardId/myPrefs/showSidebarActivity updateShowSidebarActivity
   * @apiVersion 1.0.0
   * @apiName updateShowSidebarActivity
   * @apiDescription Update the visibility of sidebar activity.
   * @apiGroup board
   * @apiPermission write
   *
   * @apiParam {Boolean} value Indicates if the sidebar activity should be shown.
   * @apiExample {js} Example:
   * trello.boards('BoArDId').myPrefs().updateShowSidebarActivity(true);
   */
  updateShowSidebarActivity(value: boolean): Promise<any> {
    return this.httpPut('/showSidebarActivity', { value });
  }

  /**
   * @api {put} /boards/:boardId/myPrefs/showSidebarBoardActions updateShowSidebarBoardActions
   * @apiVersion 1.0.0
   * @apiName updateShowSidebarBoardActions
   * @apiDescription Update the visibility of sidebar board actions.
   * @apiGroup board
   * @apiPermission write
   *
   * @apiParam {Boolean} value Indicates if the sidebar board actions should be shown.
   * @apiExample {js} Example:
   * trello.boards('BoArDId').myPrefs().updateShowSidebarBoardActions(true);
   */
  updateShowSidebarBoardActions(value: boolean): Promise<any> {
    return this.httpPut('/showSidebarBoardActions', { value });
  }

  /**
   * @api {put} /boards/:boardId/myPrefs/showSidebarMembers updateShowSidebarMembers
   * @apiVersion 1.0.0
   * @apiName updateShowSidebarMembers
   * @apiDescription Update the visibility of sidebar members.
   * @apiGroup board
   * @apiPermission write
   *
   * @apiParam {Boolean} value Indicates if the sidebar members should be shown.
   * @apiExample {js} Example:
   * trello.boards('BoArDId').myPrefs().updateShowSidebarMembers(true);
   */
  updateShowSidebarMembers(value: boolean): Promise<any> {
    return this.httpPut('/showSidebarMembers', { value });
  }
}

class Pref extends BaseResource {
  updateBackground(value: string): Promise<any> {
    return this.httpPut('/background', { value });
  }

  updateCalendarFeedEnabled(value: boolean): Promise<any> {
    return this.httpPut('/calendarFeedEnabled', { value });
  }

  updateCardAging(value: CardAging): Promise<any> {
    return this.httpPut('/cardAging', { value });
  }

  updateCardCovers(value: boolean): Promise<any> {
    return this.httpPut('/cardCovers', { value });
  }

  updateComments(value: GroupPermission): Promise<any> {
    return this.httpPut('/comments', { value });
  }

  updateInvitations(value: Invitation): Promise<any> {
    return this.httpPut('/invitations', { value });
  }

  updatePermissionLevel(value: BoardPermissionLevel): Promise<any> {
    return this.httpPut('/permissionLevel', { value });
  }

  updateSelfJoin(value: boolean): Promise<any> {
    return this.httpPut('/selfJoin', { value });
  }

  updateVoting(value: GroupPermission): Promise<any> {
    return this.httpPut('/voting', { value });
  }
}

/**
 * @namespace Board
 */
export default class Board extends BaseResource {
  getBoards(queryArgs?: {
    filter?: ArgumentGroup<BoardFilter>,
    fields?: ArgumentGroup<BoardField>,
    actions?: ArgumentGroup<ActionFilter>,
    actionsEntities?: boolean,
    actionsLimit?: number,
    actionsFormat?: Format,
    actionsSince?: FilterDate,
    actionFields?: ArgumentGroup<ActionField>,
    memberships?: ArgumentGroup<MembershipFilter>,
    organization?: boolean,
    organizationFields?: ArgumentGroup<OrganizationField>,
    lists?: ListFilter,
  }): Promise<any> {
    return this.httpGet('/', queryArgs);
  }

  /**
   * @api {get} /boards/:boardId getBoard
   * @apiVersion 1.0.0
   * @apiName getBoard
   * @apiDescription Get details of a single board.
   * @apiGroup board
   * @apiPermission read
   *
   * @apiUse ActionTypesFilter
   * @apiParam {Boolean} [actionsDisplay=false]
   *    Include <code>display</code> data in the response.
   * @apiParam {Boolean} [actionsEntities=false]
   *    Include <code>entities</code> data in the response.
   * @apiParam {String="list","count","minimal"} [actionsFormat='"list"']
   *    Format for returning actions in the response.
   * @apiParam {String} [actionsSince]
   *    Starting date for actions to include in the response.  Valid values are a
   *    date, <code>null</code> or <code>"lastView"</code>.
   * @apiParam {number{0-1000}} [actionsLimit=50]
   *    Limit to impose on actions included in response.
   * @apiParam {String[]="all","data","date","idMemberCreator","type"} [actionFields='"all"']
   *    Action fields to include in the response, can either be <code>"all"</code> or
   *    an array of field names.
   * @apiParam {Boolean} [actionMember=true]
   *    Indicates if member fields should be included in response for actions.
   * @apiParam {String[]="all","avatarHash","bio","bioData","confirmed","fullName",
   * "idPremOrgsAdmin","initials","memberType","products","status","url",
   * "username"} [actionMemberFields='["avatarHash", "fullName", "initials", "username"]']
   *    Member fields for actions to include in response, can either be <code>"all"</code>
   *    or an array of field names.
   * @apiParam {Boolean} [actionMemberCreator=true]
   *    Indicates if member creator fields should be included in response for actions.
   * @apiParam {String[]="all","avatarHash","bio","bioData","confirmed","fullName",
   * "idPremOrgsAdmin","initials","memberType","products","status","url",
   * "username"} [actionMemberCreatorFields='["avatarHash", "fullName", "initials", "username"]']
   *    Member creator fields for actions to include in response, can either
   *    be <code>"all"</code> or an array of field names.
   * @apiParam {String="all","closed","none","open","visible"} [cards='"none"']
   *    Limit cards in the response.
   * @apiParam {String[]="all","badges","checkItemStates","closed","dateLastActivity",
   * "desc","descData","due","email","idAttachmentCover","idBoard","idChecklists",
   * "idLabels","idList","idMembers","idMembersVoted","idShort","labels",
   * "manualCoverAttachment","name","pos","shortLink","shortUrl",
   * "subscribed","url"} [cardFields='"all"']
   *    Card fields to include in response, can either be <code>"all"</code> or
   *    an array of field names.
   * @apiParam {Boolean=true,false,"cover"} [cardAttachments=false]
   *    If <code>true</code>, include all attachments, if <code>false</code>, include
   *    none, and if <code>"cover"</code>, include only card cover attachments.
   * @apiParam {String[]="all","bytes","date","edgeColor","idMember","isUpload",
   * "mimeType","name","previews","url"} [cardAttachmentFields='"all"']
   *    Card attachment fields to include in the response, can either be
   *    <code>"all"</code> or an array of field names.
   * @apiParam {String="all","none"} [cardChecklists='"none"']
   *    Checklists to include in response.
   * @apiParam {Boolean} [cardPluginData=false]
   *    Indicates if card plugin data should be included in response.
   * @apiParam {Boolean} [cardStickers=false]
   *    Indicates if card stickers data should be included in response.
   * @apiParam {String="mine","none"} [boardStars='"none"']
   *    Board stars to include in response.
   * @apiParam {String="all","none"} [labels='"none"']
   *    Labels to include in response.
   * @apiParam {String[]="all","color","idBoard","name","uses"} [labelFields='"all"']
   *    Label fields to include in response, can either be <code>"all"</code>
   *    or an array of field names.
   * @apiParam {Number{0-1000}} [labelsLimit=50]
   *    Maximum number of labels to show in response.
   * @apiParam {String="all","closed","none","open"} [list='"none"']
   *    Limit response to include specified statuses.
   * @apiParam {String[]="all","closed","idBoard","name","pos","subscribed"} [listFields='"all"']
   *    List fields to include in response, can either be <code>"all"</code>
   *    or an array of field names.
   * @apiParam {String[]="all","active","admin","deactivated","me","none",
   * "normal"} [memberships='"none"']
   *    Memberships to include in the response, can either be <code>"all"</code>
   *    or an array of field names.
   * @apiParam {Boolean} [membershipsMember=false]
   *    Indicates if membership member fields should be included in response.
   * @apiParam {String[]="all","avatarHash","bio","bioData","confirmed","fullName",
   * "idPremOrgsAdmin","initials","memberType","products","status","url",
   * "username"} [membershipsMemberFields='["fullName", "username"]']
   *    Membership member fields to include in response, can either
   *    be <code>"all"</code> or an array of field names.
   * @apiParam {String="admins","all","none","normal","owners"} [members='"none"']
   *    Member level types to include in the response
   * @apiParam {String[]="all","avatarHash","bio","bioData","confirmed","fullName",
   * "idPremOrgsAdmin","initials","memberType","products","status","url",
   * "username"} [memberFields='["avatarHash", "fullName", "initials", "username", "confirmed"]']
   *    Member fields to include in response, can either be <code>"all"</code> or
   *    an array of field names.
   * @apiParam {String="admins","all","none","normal","owners"} [membersInvited='"none"']
   *    Member levels for invited members that should be included in response.
   * @apiParam {String[]="all","avatarHash","bio","bioData","confirmed","fullName",
   * "idPremOrgsAdmin","initials","memberType","products","status","url",
   * "username"} [membersInvitedFields='["avatarHash", "fullName", "initials", "username"]']
   *    Invited member fields to include in response, can either
   *    be <code>"all"</code> or an array of field names.
   * @apiParam {Boolean} [pluginData=false]
   *    Indicates if plugin data should be included in response.
   * @apiParam {String="all","none"} [checklists='"none"']
   *    Checklist data to include in the response.
   * @apiParam {String[]="all","idBoard","idCard","name","pos"} [checklistFields='"all"']
   *    Checklist fields to include in response, can either be <code>"all"</code> or
   *    an array of field names.
   * @apiParam {Boolean} [organization=false]
   *    Include organization data in the response.
   * @apiParam {String[]="all","billableMemberCount","desc","descData","displayName",
   * "idBoards","invitations","invited","logoHash","memberships","name","powerUps",
   * "prefs","premiumFeatures","products","url",
   * "website"} [organizationFields='["name", "displayName"]']
   *    Organization fields to include in the response, can either be <code>"all"</code>
   *    or an array of field names.
   * @apiParam {String[]="all","active","admin","deactivated","me",
   * "none","normal"} [organizationMemberships='"none"']
   *    Organization memberships to include in the response, can either
   *    be <code>"all"</code> or an array of field names.
   * @apiParam {Boolean} [organizationPluginData=false]
   *    Indicates if organization plugin data should be included in response.
   * @apiParam {Boolean} [myPrefs=false]
   *    Indicates if myPrefs data should be included in response.
   * @apiParam {Boolean} [tags=false]
   *    Indicates if tags data should be included in response.
   * @apiParam {String[]="all","closed","dateLastActivity","dateLastView","desc",
   * "descData","idOrganization","invitations","invited","labelNames","memberships",
   * "name","pinned","powerUps","prefs","shortLink","shortUrl","starred",
   * "subscribed","url"} [fields='"all"']
   *    Board fields to include in response, can either be <code>"all"</code> or
   *    an array of field names.
   * @apiExample {js} Example:
   * trello.boards('BoArDId').getBoard({ ... });
   */
  getBoard(
    queryArgs?:
      | {
          actions?: ArgumentGroup<ActionFilter>,
          actionsEntities?: boolean,
          actionsDisplay?: boolean,
          actionsFormat?: Format,
          actionsSince?: FilterDate,
          actionsLimit?: number,
          actionFields?: ArgumentGroup<ActionField>,
          actionMember?: boolean,
          actionMemberFields?: ArgumentGroup<MemberField>,
          actionMemberCreator?: boolean,
          actionMemberCreatorFields?: ArgumentGroup<MemberField>,
          cards?: CardFilter,
          cardFields?: ArgumentGroup<CardField>,
          cardAttachments?: AttachmentFilter,
          cardAttachmentFields?: ArgumentGroup<AttachmentField>,
          cardChecklists?: AllOrNone,
          cardPluginData?: boolean,
          cardStickers?: boolean,
          boardStars?: BoardStarsFilter,
          labels?: AllOrNone,
          labelFields?: ArgumentGroup<LabelField>,
          labelsLimit?: number,
          lists?: ListFilter,
          listFields?: ArgumentGroup<ListField>,
          memberships?: ArgumentGroup<MembershipFilter>,
          membershipsMember?: boolean,
          membershipsMemberFields?: ArgumentGroup<MemberField>,
          members?: MemberFilter,
          memberFields?: ArgumentGroup<MemberField>,
          membersInvited?: MemberFilter,
          membersInvitedFields?: ArgumentGroup<MemberField>,
          pluginData?: boolean,
          checklists?: AllOrNone,
          checklistFields?: ArgumentGroup<ChecklistField>,
          organization?: boolean,
          organizationFields?: ArgumentGroup<OrganizationField>,
          organizationMemberships?: ArgumentGroup<MembershipFilter>,
          organizationPluginData?: boolean,
          myPrefs?: boolean,
          tags?: boolean,
          fields?: ArgumentGroup<BoardField>,
        }
      | {
          // This is the only option if calling from a different resource.
          fields?: ArgumentGroup<BoardField>,
        },
  ): Promise<any> {
    return this.httpGet('/', queryArgs);
  }

  getBoardsFilteredBy(filter: ArgumentGroup<BoardFilter>): Promise<any> {
    return this.httpGet('/', { filter });
  }

  /**
   * @api {get} /boards/:boardId/:field getFieldValue
   * @apiVersion 1.0.0
   * @apiName getFieldValue
   * @apiDescription Gets the value of the specified field on a board.
   * @apiGroup board
   * @apiPermission read
   *
   * @apiParam {String="closed","dateLastActivity","dateLastView","desc","descData",
   * "idOrganization","invitations","invited","labelNames","memberships","name",
   * "pinned","powerUps","prefs","shortLink","shortUrl","starred","subscribed",
   * "url"} field
   *    Board field to get value for.
   * @apiExample {js} Example:
   * trello.boards('BoArDId').getFieldValue('closed');
   */
  getFieldValue(field: BoardField): Promise<any> {
    return this.httpGet(`/${field}`);
  }

  /**
   * @api {get} /boards/:boardId/actions getActionsForBoard
   * @apiVersion 1.0.0
   * @apiName getActionsForBoard
   * @apiDescription Gets the actions associated with the specified board.
   * @apiGroup board
   * @apiPermission read
   *
   * @apiUse ActionTypesFilter
   * @apiParam {Boolean} [entities=false]
   *    Include <code>entities</code> data in the response.
   * @apiParam {Boolean} [display=false]
   *    Include <code>display</code> data in the response.
   * @apiParam {String[]="all","data","date","idMemberCreator","type"} [fields='"all"']
   *    Action fields to include in the response, can either be <code>"all"</code>
   *    or an array of field names.
   * @apiParam {number{0-1000}} [limit=50]
   *    Limit to impose on actions included in response.
   * @apiParam {String="list","count","minimal"} [format='"list"']
   *    Format for returning actions in the response.
   * @apiParam {String} [since]
   *    Starting date for actions to include in the response.  Valid values are
   *    a date, <code>null</code> or <code>"lastView"</code>.
   * @apiParam {Date} [before]
   *    End date for actions to include in the response.
   * @apiParam {number{0-1000}} [page=0]
   *    Page of data to return in response.
   * @apiParam {String} [idModels]
   *    Only return actions related to these model ids.
   * @apiParam {Boolean} [member=true]
   *    Indicates if member fields should be included in response.
   * @apiParam {String[]="all","avatarHash","bio","bioData","confirmed","fullName",
   * "idPremOrgsAdmin","initials","memberType","products","status",
   * "url","username"} [memberFields='["avatarHash", "fullName", "initials", "username"]']
   *    Member fields to include in response, can either be <code>"all"</code> or
   *    an array of field names.
   * @apiParam {Boolean} [memberCreator=true]
   *    Indicates if member creator fields should be included in response.
   * @apiParam {String[]="all","avatarHash","bio","bioData","confirmed","fullName",
   * "idPremOrgsAdmin","initials","memberType","products","status",
   * "url","username"} [memberCreatorFields='["avatarHash", "fullName", "initials", "username"]']
   *    Member creator fields to include in response, can either be <code>"all"</code>
   *    or an array of field names.
   * @apiExample {js} Example:
   * trello.boards('BoArDId').actions().getActions({...});
   */
  actions() {
    return new Action(this.config, `${this.routePath}/actions`);
  }

  /**
   * @api {get} /boards/:boardId/boardPlugins getBoardPlugins
   * @apiVersion 1.0.0
   * @apiName getBoardPlugins
   * @apiDescription Get the enabled Power-Ups on a board.
   * @apiGroup board
   * @apiPermission read
   * @apiExample {js} Example:
   * trello.boards('BoArDId').getBoardPlugins();
   */
  getBoardPlugins(): Promise<any> {
    return this.httpGet('/boardPlugins');
  }

  /**
   * @api {get} /boards/:boardId/boardStars getBoardStars
   * @apiVersion 1.0.0
   * @apiName getBoardStars
   * @apiDescription Gets the stars associated with a board.
   * @apiGroup board
   * @apiPermission read
   *
   * @apiParam {String="mine","none"} [filter='"mine"']
   *    Board stars to include in response.
   * @apiExample {js} Example:
   * trello.boards('BoArDId').getBoardStars('none');
   */
  getBoardStars(queryArgs?: { filter?: BoardStarsFilter }): Promise<any> {
    return this.httpGet('/boardStars', queryArgs);
  }

  /**
   * @api {get} /boards/:boardId/cards getCardsInBoard
   * @apiVersion 1.0.0
   * @apiName getCardsForBoard
   * @apiDescription Gets the cards associated with the specified board.
   * @apiGroup board
   * @apiPermission read
   *
   * @apiUse ActionTypesFilter
   * @apiParam {Boolean=true,false,"cover"} [attachments=false]
   *    If <code>true</code>, include all attachments, if <code>false</code>,
   *    include none, and if <code>"cover"</code>, include only card cover attachments.
   * @apiParam {String[]="all","bytes","date","edgeColor","idMember","isUpload",
   * "mimeType","name","previews","url"} [attachmentFields='"all"']
   *    Attachment fields to include in the response, can either
   *    be <code>"all"</code> or an array of field names.
   * @apiParam {Boolean} [stickers=false]
   *    Indicates if sticker data should be included in the response.
   * @apiParam {Boolean} [members=false]
   *    Indicates if member fields should be included in response.
   * @apiParam {String[]="all","avatarHash","bio","bioData","confirmed","fullName",
   * "idPremOrgsAdmin","initials","memberType","products","status",
   * "url","username"} [memberFields='["avatarHash", "fullName", "initials", "username"]']
   *    Member fields to include in response, can either be <code>"all"</code> or
   *    an array of field names.
   * @apiParam {Boolean} [checkItemStates=false]
   *    Indicates if check item state data should be included in response.
   * @apiParam {String="all","none"} [checklists='"none"']
   *    Checklists to include in response.
   * @apiParam {number{0-1000}} [limit]
   *    Limit to impose on actions included in response.
   * @apiParam {Date} [since]
   *    Starting date for actions to include in the response, can be either a
   *    date or <code>null</code>.
   * @apiParam {Date} [before]
   *    End date for actions to include in the response, can be either a
   *    date or <code>null</code>.
   * @apiParam {String="all","closed","none","open","visible"} [filter='"visible"']
   *    Limit cards in the response.
   * @apiParam {String[]="all","badges","checkItemStates","closed","dateLastActivity",
   * "desc","descData","due","email","idAttachmentCover","idBoard","idChecklists",
   * "idLabels","idList","idMembers","idMembersVoted","idShort","labels",
   * "manualCoverAttachment","name","pos","shortLink","shortUrl",
   * "subscribed","url"} [fields='"all"']
   *    Card fields to include in response, can either be <code>"all"</code> or
   *    an array of field names.
   * @apiExample {js} Example:
   * trello.boards('BoArDId').cards().getCards({...});
   */

  /**
   * @api {get} /boards/:boardId/cards/:filter getCardsFilteredByInBoard
   * @apiVersion 1.0.0
   * @apiName getCardsFilteredByInBoard
   * @apiDescription Gets the cards associated with the specified board that
   *    match the filter criteria.
   * @apiGroup board
   * @apiPermission read
   *
   * @apiParam {String="all","closed","none","open","visible"} [filter='"all"']
   *    Card types to include in the response.
   * @apiExample {js} Example:
   * trello.boards('BoArDId').cards().getCardsFilteredBy('all');
   */

  /**
   * @api {get} /boards/:boardId/cards/:cardId getCardInBoard
   * @apiVersion 1.0.0
   * @apiName getCardInBoard
   * @apiDescription Gets the card data with the specified ID for the specified board.
   * @apiGroup board
   * @apiPermission read
   *
   * @apiUse ActionTypesFilter
   * @apiParam {Boolean=true,false,"cover"} [attachments=false]
   *    If <code>true</code>, include all attachments, if <code>false</code>,
   *    include none, and if <code>"cover"</code>, include only card cover
   *    attachments.
   * @apiParam {String[]="all","bytes","date","edgeColor","idMember","isUpload",
   * "mimeType","name","previews","url"} [attachmentFields='"all"']
   *    Attachment fields to include in the response, can either
   *    be <code>"all"</code> or an array of field names.
   * @apiParam {Boolean} [actionsEntities=false]
   *    Include <code>entities</code> data in the response.
   * @apiParam {Boolean} [actionsDisplay=false]
   *    Include <code>display</code> data in the response.
   * @apiParam {number{0-1000}} [actionsLimit=50]
   *    Limit to impose on actions included in response.
   * @apiParam {String[]="all","data","date","idMemberCreator","type"} [actionFields='"all"']
   *    Action fields to include in the response, can either be <code>"all"</code> or
   *    an array of field names.
   * @apiParam {String[]="all","avatarHash","bio","bioData","confirmed","fullName",
   * "idPremOrgsAdmin","initials","memberType","products","status",
   * "url","username"} [actionMemberCreatorFields='["avatarHash", "fullName", "initials", "username"]']
   *    Member creator fields for actions to include in response, can either
   *    be <code>"all"</code> or an array of field names.
   * @apiParam {Boolean} [members=false]
   *    Indicates if member fields should be included in response.
   * @apiParam {String[]="all","avatarHash","bio","bioData","confirmed",
   * "fullName","idPremOrgsAdmin","initials","memberType","products","status",
   * "url","username"} [memberFields='["avatarHash", "fullName", "initials", "username"]']
   *    Member fields to include in response, can either be <code>"all"</code> or
   *    an array of field names.
   * @apiParam {Boolean} [checkItemStates=true]
   *    Indicates if check item state data should be included in response.
   * @apiParam {String[]="all","idCheckItem","state"} [checkItemStateFields='"all"']
   *    Check item state fields to include in response, can either be <code>"all"</code>
   *    or an array of field names.
   * @apiParam {Boolean} [labels=true]
   *    Indicates if label data should be included in the response.
   * @apiParam {String="all","none"} [checklists='"none"']
   *    Checklist data to include in the response.
   * @apiParam {String[]="all","idBoard","idCard","name","pos"} [checklistFields='"all"']
   *    Checklist fields to include in response, can either be <code>"all"</code> or
   *    an array of field names.
   * @apiParam {String[]="all","badges","checkItemStates","closed","dateLastActivity",
   * "desc","descData","due","email","idAttachmentCover","idBoard","idChecklists",
   * "idLabels","idList","idMembers","idMembersVoted","idShort","labels",
   * "manualCoverAttachment","name","pos","shortLink","shortUrl",
   * "subscribed","url"} [fields='"all"']
   *    Card fields to include in response, can either be <code>"all"</code> or
   *    an array of field names.
   * @apiExample {js} Example:
   * trello.boards('BoArDId').cards('CaRdId').getCard({...});
   */
  cards(cardId?: string = '') {
    return new Card(this.config, `${this.routePath}/cards/${cardId}`);
  }

  /**
   * @api {get} /boards/:boardId/checklists getChecklistsInBoard
   * @apiVersion 1.0.0
   * @apiName getChecklistsInBoard
   * @apiDescription Gets the checklists associated with the specified board.
   * @apiGroup board
   * @apiPermission read
   *
   * @apiParam {String="all","closed","none","open","visible"} [cards='"none"']
   *    Limit cards in the response.
   * @apiParam {String[]="all","badges","checkItemStates","closed","dateLastActivity",
   * "desc","descData","due","email","idAttachmentCover","idBoard","idChecklists",
   * "idLabels","idList","idMembers","idMembersVoted","idShort","labels",
   * "manualCoverAttachment","name","pos","shortLink","shortUrl",
   * "subscribed","url"} [cardFields='"all"']
   *    Card fields to include in response, can either be <code>"all"</code> or
   *    an array of field names.
   * @apiParam {String="all","none"} [checkItems='"all"']
   *    Checklist items to include in response.
   * @apiParam {String[]="all","name","nameData","pos","state","value"} [checkItemFields='["name", "nameData", "pos", "state"]']
   *    Checklist item fields to include in response, can either
   *    be <code>"all"</code> or an array of field names.
   * @apiParam {String="all","none"} [filter='"all"']
   *    Checklist types to include in response.
   * @apiParam {String[]="all","idBoard","idCard","name","pos"} [fields='"all"']
   *    Checklist fields to include in response, can either
   *    be <code>"all"</code> or an array of field names.
   * @apiExample {js} Example:
   * trello.boards('BoArDId').checklists().getChecklists({...});
   */
  checklists() {
    return new Checklist(this.config, `${this.routePath}/checklists`);
  }

  /**
   * @api {get} /boards/:boardId/customFields getCustomFields
   * @apiVersion 1.0.0
   * @apiName getCustomFields
   * @apiDescription Get the Custom Field Definitions that exist on a board.
   * @apiGroup board
   * @apiPermission read
   * @apiExample {js} Example:
   * trello.boards('BoArDId').getCustomFields();
   */
  getCustomFields(): Promise<any> {
    return this.httpGet('/customFields');
  }

  /**
   * @api {get} /boards/:boardId/deltas getDeltas
   * @apiVersion 1.0.0
   * @apiName getDeltas
   * @apiDescription Gets the deltas for a board.
   * @apiGroup board
   * @apiPermission read
   *
   * @apiParam {String} tags
   *    A valid tag for subscribing.
   * @apiParam {Number{-1-Infinity}} ixLastUpdate
   *    Index of last update.
   * @apiExample {js} Example:
   * trello.boards('BoArDId').getDeltas('none', 5);
   */
  /* istanbul ignore next: Requires Business Class subscription */
  getDeltas(queryArgs: { tags: string, ixLastUpdate: number }): Promise<any> {
    return this.httpGet('/deltas', queryArgs);
  }

  /**
   * @api {get} /boards/:boardId/tags getTags
   * @apiVersion 1.0.0
   * @apiName getTags
   * @apiDescription Returns a list of idTags that represent the collections that
   *    the board has been added to.
   * @apiGroup board
   * @apiPermission read
   * @apiExample {js} Example:
   * trello.boards('BoArDId').getTags();
   */
  /* istanbul ignore next: Requires Business Class subscription */
  getTags(): Promise<any> {
    return this.httpGet('/idTags');
  }

  /**
   * @api {get} /boards/:boardId/labels getLabelsInBoard
   * @apiVersion 1.0.0
   * @apiName getLabelsInBoard
   * @apiDescription Gets the labels for a board.
   * @apiGroup board
   * @apiPermission read
   *
   * @apiParam {String[]="all","color","idBoard","name","uses"} [fields='"all"']
   *    Label fields to include in response, can either be <code>"all"</code> or
   *    an array of field names.
   * @apiParam {Number{0-1000}} [limit=50]
   *    Number of records to limit for response.
   * @apiExample {js} Example:
   * trello.boards('BoArDId').labels().getLabels({...});
   */

  /**
   * @api {get} /boards/:boardId/label/:labelId getLabelInBoard
   * @apiVersion 1.0.0
   * @apiName getLabelInBoard
   * @apiDescription Gets the label data with the specified ID for the specified
   *    board.
   * @apiGroup board
   * @apiPermission read
   *
   * @apiParam {String[]="all","color","idBoard","name","uses"} [fields='"all"']
   *    Label fields to include in response, can either be <code>"all"</code> or
   *    an array of field names.
   * @apiExample {js} Example:
   * trello.boards('BoArDId').labels('LaBeLiD').getLabel({...});
   */
  labels(labelId?: string = '') {
    return new Label(this.config, `${this.routePath}/labels/${labelId}`);
  }

  /**
   * @api {get} /boards/:boardId/lists getListsInBoard
   * @apiVersion 1.0.0
   * @apiName getListsInBoard
   * @apiDescription Gets the lists for a board.
   * @apiGroup board
   * @apiPermission read
   *
   * @apiParam {String="all","closed","none","open","visible"} [cards='"none"']
   *    Limit cards in the response.
   * @apiParam {String[]="all","badges","checkItemStates","closed","dateLastActivity",
   * "desc","descData","due","email","idAttachmentCover","idBoard","idChecklists",
   * "idLabels","idList","idMembers","idMembersVoted","idShort","labels",
   * "manualCoverAttachment","name","pos","shortLink","shortUrl",
   * "subscribed","url"} [cardFields='"all"']
   *    Card fields to include in response, can either be <code>"all"</code> or
   *    an array of field names.
   * @apiParam {String="all","closed","none","open"} [filter='"open"']
   *    Limit response to include specified statuses.
   * @apiParam {String[]="all","closed","idBoard","name","pos","subscribed"} [fields='"all"']
   *    List fields to include in response, can either be <code>"all"</code> or
   *    an array of field names.
   * @apiExample {js} Example:
   * trello.boards('BoArDId').lists().getLists({...});
   */

  /**
   * @api {get} /boards/:boardId/list/:filter getListsFilteredByInBoard
   * @apiVersion 1.0.0
   * @apiName getListsFilteredByInBoard
   * @apiDescription Gets the lists associated with the specified board that
   *    matches the filter criteria.
   * @apiGroup board
   * @apiPermission read
   *
   * @apiParam {String="all","closed","none","open"} filter
   *    Limit response to include specified statuses.
   * @apiExample {js} Example:
   * trello.boards('BoArDId').lists().getListsFilteredBy('closed');
   */
  lists() {
    return new List(this.config, `${this.routePath}/lists`);
  }

  /**
   * @api {get} /boards/:boardId/members getMembersInBoard
   * @apiVersion 1.0.0
   * @apiName getMembersInBoard
   * @apiDescription Gets the members for a board.
   * @apiGroup board
   * @apiPermission read
   *
   * @apiParam {String="admins","all","none","normal","owners"} [filter='"all"']
   *    Member level types to include in the response.
   * @apiParam {String[]="all","avatarHash","bioData","idPremOrgsAdmin","memberType",
   * "products","status","url"} [fields='["fullName", "username"]']
   *    Member fields to include in response, can either be <code>"all"</code> or
   *    an array of field names.
   * @apiParam {Boolean} [activity=false]
   *    Indicates if activity should be included in the response. This works for
   *    premium organizations only.
   * @apiExample {js} Example:
   * trello.boards('BoArDId').members().getMembers({...});
   */

  /**
   * @api {get} /boards/:boardId/member/:filter getMembersFilteredByInBoard
   * @apiVersion 1.0.0
   * @apiName getMembersFilteredByInBoard
   * @apiDescription Gets the members associated with the specified board that
   *    matches the filter criteria.
   * @apiGroup board
   * @apiPermission read
   *
   * @apiParam {String="admins","all","none","normal","owners"} filter
   *    Member level types to include in the response
   * @apiExample {js} Example:
   * trello.boards('BoArDId').members().getMembersFilteredBy('normal');
   */

  /**
   * @api {get} /boards/:boardId/member/:memberId/cards getCardsForMemberInBoard
   * @apiVersion 1.0.0
   * @apiName getCardsForMemberInBoard
   * @apiDescription Gets the card data associated with the specified member on
   *    this board.
   * @apiGroup board
   * @apiPermission read
   *
   * @apiUse ActionTypesFilter
   * @apiParam {Boolean=true,false,"cover"} [attachments=false]
   *    If <code>true</code>, include all attachments, if <code>false</code>,
   *    include none, and if <code>"cover"</code>, include only card cover attachments.
   * @apiParam {String[]="all","bytes","date","edgeColor","idMember","isUpload",
   * "mimeType","name","previews","url"} [attachmentFields='"all"']
   *    Attachment fields to include in the response, can either
   *    be <code>"all"</code> or an array of field names.
   * @apiParam {Boolean} [members=false]
   *    Indicates if member fields should be included in response.
   * @apiParam {String[]="all","avatarHash","bio","bioData","confirmed","fullName",
   * "idPremOrgsAdmin","initials","memberType","products","status",
   * "url","username"} [memberFields='["avatarHash", "fullName", "initials", "username"]']
   *    Member fields to include in response, can either be <code>"all"</code> or
   *    an array of field names.
   * @apiParam {Boolean} [checkItemStates=false]
   *    Indicates if check item state data should be included in response.
   * @apiParam {String="all","none"} [checklists='"none"']
   *    Checklist data to include in the response.
   * @apiParam {Boolean} [board=false]
   *    If <code>true</code>, include board data in the response.
   * @apiParam {String[]="all","closed","dateLastActivity","dateLastView",
   * "desc","descData","idOrganization","invitations","invited","labelNames",
   * "memberships","name","pinned","powerUps","prefs","shortLink","shortUrl",
   * "starred","subscribed","url"} [boardFields='["name", "desc", "closed", "idOrganization", "pinned", "url", "prefs"]']
   *    Board fields to include in response, can either be <code>"all"</code> or
   *    an array of field names.
   * @apiParam {Boolean} [list=false]
   *    Include list fields in the response.
   * @apiParam {String[]="all","closed","idBoard","name","pos","subscribed"} [listFields='"all"']
   *    List fields to include in response, can either be <code>"all"</code> or
   *    an array of field names.
   * @apiParam {String="all","closed","none","open","visible"} [filter='"visible"']
   *    Card types to include in the response.
   * @apiParam {String[]="all","badges","checkItemStates","closed",
   * "dateLastActivity","desc","descData","due","email","idAttachmentCover",
   * "idBoard","idChecklists","idLabels","idList","idMembers","idMembersVoted",
   * "idShort","labels","manualCoverAttachment","name","pos","shortLink",
   * "shortUrl","subscribed","url"} [fields='"all"']
   *    Card fields to include in response, can either be <code>"all"</code> or
   *    an array of field names.
   * @apiExample {js} Example:
   * trello.boards('BoArDId').members('MeMbErId').cards().getCards({...});
   */
  members(memberId?: string = '') {
    return new Member(this.config, `${this.routePath}/members/${memberId}`);
  }

  /**
   * @api {get} /boards/:boardId/membersInvited getMembersInvitedToBoard
   * @apiVersion 1.0.0
   * @apiName getMembersInvitedToBoard
   * @apiDescription Gets the members invited for a board.
   * @apiGroup board
   * @apiPermission read
   *
   * @apiParam {String[]="all","avatarHash","avatarSource","bio","bioData",
   * "confirmed","email","fullName","gravatarHash","idBoards","idBoardsPinned",
   * "idOrganizations","idPremOrgsAdmin","initials","loginTypes",
   * "memberType","oneTimeMessagesDismissed","prefs","premiumFeatures",
   * "products","status","status","trophies","uploadedAvatarHash",
   * "url","username"} [fields='"all"']
   *    Member fields to include in response, can either be <code>"all"</code> or
   *    an array of field names.
   * @apiExample {js} Example:
   * trello.boards('BoArDId').membersInvited().getMembers({...});
   */

  /**
   * @api {get} /boards/:boardId/membersInvited/:field getMembersInvitedFieldValue
   * @apiVersion 1.0.0
   * @apiName getMembersInvitedFieldValue
   * @apiDescription Gets the field value of the members invited for a board.
   * @apiGroup board
   * @apiPermission read
   *
   * @apiParam {String="avatarHash","avatarSource","bio","bioData","confirmed",
   * "email","fullName","gravatarHash","idBoards","idBoardsPinned","idOrganizations",
   * "idPremOrgsAdmin","initials","loginTypes","memberType","oneTimeMessagesDismissed",
   * "prefs","premiumFeatures","products","status","status","trophies",
   * "uploadedAvatarHash","url","username"} field
   *    Members invited field to get value for.
   * @apiExample {js} Example:
   * trello.boards('BoArDId').membersInvited().getFieldValue('bio');
   */
  membersInvited() {
    return new Member(this.config, `${this.routePath}/membersInvited`);
  }

  /**
   * @api {get} /boards/:boardId/memberships getMembershipsForBoard
   * @apiVersion 1.0.0
   * @apiName getMembershipsForBoard
   * @apiDescription Gets the memberships associated with a board.
   * @apiGroup board
   * @apiPermission read
   *
   * @apiParam {String[]="all","active","admin","deactivated","me","none","normal"} [filter='"all"']
   *    Membership types to include in response.
   * @apiParam {Boolean} [member=false]
   *    Indicates if member fields should be included in response.
   * @apiParam {String[]="all","avatarHash","bioData","idPremOrgsAdmin",
   * "memberType","products","status","url"} [memberFields='["fullName", "username"]']
   *    Member fields to include in response, can either be <code>"all"</code> or
   *    an array of field names.
   * @apiExample {js} Example:
   * trello.boards('BoArDId').memberships().getMemberships({...});
   */

  /**
   * @api {get} /boards/:boardId/memberships/:membershipId getMembershipForBoard
   * @apiVersion 1.0.0
   * @apiName getMembershipForBoard
   * @apiDescription Gets the membership data with the specified ID for the
   *    specified board.
   * @apiGroup board
   * @apiPermission read
   *
   * @apiParam {Boolean} [member=false]
   *    Indicates if member fields should be included in response.
   * @apiParam {String[]="all","avatarHash","bio",bioData","confirmed","fullName",
   * "idPremOrgsAdmin","initials","memberType","products","status",
   * "url","username"} [memberFields='["fullName", "username"]']
   *    Member fields to include in response, can either be <code>"all"</code> or
   *    an array of field names.
   * @apiExample {js} Example:
   * trello.boards('BoArDId').memberships('mEmbErShIpId').getMembership({...});
   */
  memberships(membershipId?: string = '') {
    return new Membership(
      this.config,
      `${this.routePath}/memberships/${membershipId}`,
    );
  }

  /**
   * @api {get} /boards/:boardId/myPrefs getMyPrefs
   * @apiVersion 1.0.0
   * @apiName getMyPrefs
   * @apiDescription Gets all myPrefs associated with a board.
   * @apiGroup board
   * @apiPermission read
   * @apiExample {js} Example:
   * trello.boards('BoArDId').myPrefs().getMyPrefs();
   */
  myPrefs() {
    return new MyPref(this.config, `${this.routePath}/myPrefs`);
  }

  /**
   * @api {get} /boards/:boardId/organization getOrganizationForBoard
   * @apiVersion 1.0.0
   * @apiName getOrganizationForBoard
   * @apiDescription Gets the organization the board is associated with.
   * @apiGroup board
   * @apiPermission read
   *
   * @apiParam {String[]="billableMemberCount","desc","descData","displayName",
   * "idBoards","invitations","invited","logoHash","memberships","name",
   * "powerUps","prefs","premiumFeatures","products","url",
   * "website"} [fields='"all"']
   *   Organization fields to include in response, can either be <code>"all"</code> or
   *   an array of field names.
   * @apiExample {js} Example:
   * trello.boards('BoArDId').organization().getOrganization({...});
   */

  /**
   * @api {get} /boards/:boardId/organization/:field getOrganizationFieldValue
   * @apiVersion 1.0.0
   * @apiName getOrganizationForBoard
   * @apiDescription Gets the field value for the organization associated with
   *    the board.
   * @apiGroup board
   * @apiPermission read
   *
   * @apiParam {String="billableMemberCount","desc","descData","displayName",
   * "idBoards","invitations","invited","logoHash","memberships","name","powerUps",
   * "prefs","premiumFeatures","products","url","website"} field
   *   Organization field to get value for.
   * @apiExample {js} Example:
   * trello.boards('BoArDId').organization().getFieldValue('desc');
   */
  organization() {
    return new Organization(this.config, `${this.routePath}/organization`);
  }

  /**
   * @api {get} /boards/:boardId/pluginData getPluginData
   * @apiVersion 1.0.0
   * @apiName getPluginData
   * @apiDescription Gets plugin data associated with a board.
   * @apiGroup board
   * @apiPermission read
   * @apiExample {js} Example:
   * trello.boards('BoArDId').getPluginData();
   */
  getPluginData(): Promise<any> {
    return this.httpGet('/pluginData');
  }

  /**
   * @api {get} /boards/:boardId/plugins getPlugins
   * @apiVersion 1.0.0
   * @apiName getPlugins
   * @apiDescription List the Power-Ups for a board.
   * @apiGroup board
   * @apiPermission read
   *
   * @apiParam {String="enabled","available"} [filter='"enabled"']
   *    Status of the plugin.
   * @apiExample {js} Example:
   * trello.boards('BoArDId').getPlugins();
   */
  getPluginData(): Promise<any> {
    return this.httpGet('/pluginData');
  }

  updateBoard(queryArgs?: {
    name?: string,
    desc?: string,
    closed?: boolean,
    subscribed?: boolean,
    idOrganization?: string,
    prefs?: {
      permissionLevel?: BoardPermissionLevel,
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
  }): Promise<any> {
    return this.httpPut('/', { ...queryArgs, separator: '/' });
  }

  updateClosedStatus(value: boolean): Promise<any> {
    return this.httpPut('/closed', { value });
  }

  updateDescription(value: string): Promise<any> {
    return this.httpPut('/desc', { value });
  }

  moveToOrganization(organizationId: string): Promise<any> {
    return this.httpPut('/idOrganization', { value: organizationId });
  }

  updateLabelNameForColor(labelColor: LabelColor, value: string): Promise<any> {
    return this.httpPut(`/labelNames/${labelColor}`, { value });
  }

  updateName(value: string): Promise<any> {
    return this.httpPut('/name', { value });
  }

  prefs() {
    return new Pref(this.config, `${this.routePath}/prefs`);
  }

  updateSubscribed(value: boolean): Promise<any> {
    return this.httpPut('/subscribed', { value });
  }

  addBoard(queryArgs: {
    name: string,
    defaultLabels?: boolean,
    defaultLists?: boolean,
    desc?: string,
    idOrganization?: string,
    idBoardSource?: string,
    keepFromSource?: ArgumentGroup<KeepFromSourceField>,
    powerUps?: ArgumentGroup<PowerUp>,
    prefs?: {
      permissionLevel?: PermissionLevel,
      voting?: GroupPermission,
      comments?: GroupPermission,
      invitations?: Invitation,
      selfJoin?: boolean,
      cardCovers?: boolean,
      background?: string,
      cardAging?: CardAging,
    },
  }): Promise<any> {
    return this.httpPost('/', { ...queryArgs, separator: '_' });
  }

  /**
   * @api {post} /boards/:boardId/calendarKey/generate generateCalendarKey
   * @apiVersion 1.0.0
   * @apiName generateCalendarKey
   * @apiDescription Generate a new key for the calendar to make use of.
   * @apiGroup board
   * @apiPermission write
   * @apiExample {js} Example:
   * trello.boards('BoArDId').generateCalendarKey();
   */
  /* istanbul ignore next: This works, I don't want to keep re-testing it. */
  generateCalendarKey(): Promise<any> {
    return this.httpPost('/calendarKey/generate');
  }

  /**
   * @api {post} /boards/:boardId/emailKey/generate generateEmailKey
   * @apiVersion 1.0.0
   * @apiName generateEmailKey
   * @apiDescription Generate a new key to be used for email.
   * @apiGroup board
   * @apiPermission write
   * @apiExample {js} Example:
   * trello.boards('BoArDId').generateEmailKey();
   */
  /* istanbul ignore next: This works, I don't want to keep re-testing it. */
  generateEmailKey(): Promise<any> {
    return this.httpPost('/emailKey/generate');
  }

  /**
   * @api {post} /boards/:boardId/idTags addTags
   * @apiVersion 1.0.0
   * @apiName addTags
   * @apiDescription Generate a new key to be used for email.
   * @apiGroup board
   * @apiPermission write
   *
   * @apiParam {String} value The id of a tag from the organization to which this board belongs.
   * @apiExample {js} Example:
   * trello.boards('BoArDId').addTags('TaGiD');
   */
  /* istanbul ignore next: Requires Business Class subscription */
  addTags(value: string): Promise<any> {
    return this.httpPost('/tags', { value });
  }

  /**
   * @api {post} /boards/:boardId/markedAsViewed markAsViewed
   * @apiVersion 1.0.0
   * @apiName markAsViewed
   * @apiDescription Mark a board as viewed.
   * @apiGroup board
   * @apiPermission write
   * @apiExample {js} Example:
   * trello.boards('BoArDId').generateEmailKey();
   */
  markAsViewed(): Promise<any> {
    return this.httpPost('/markAsViewed');
  }

  /* istanbul ignore next: Requires special permissions */
  addPowerUp(value: PowerUp): Promise<any> {
    return this.httpPost('/powerUps', { value });
  }

  deletePowerUp(powerUp: PowerUp): Promise<any> {
    return this.httpDelete(`/powerUps/${powerUp}`);
  }
}
