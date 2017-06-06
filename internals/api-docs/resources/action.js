/**
 * @api {path} /actions action
 * @apiVersion 1.0.0
 * @apiName action
 * @apiGroup overview
 * @apiDescription
 *    Actions are generated whenever an action occurs in Trello.
 *    For instance, when a user deletes a card, a <code>deleteCard</code> action
 *    is generated and includes information about the deleted card, the list the
 *    card was in, the board the card was on, the user that deleted the card,
 *    and the <code>idObject</code> of the action. Actions for Trello objects
 *    can be listed from nested action endpoints - e.g. the resource
 *    <code>GET board/:boardId/actions</code> lists all of the actions for the
 *    given board.
 */

/* Definitions */

/**
 * @apiDefine ActionFieldQueryArg
 * @apiParam {String="data","date","idMemberCreator","type"} field
 *    Action field value to return in the response.
 */

/**
 * @apiDefine ActionFieldsQueryArg
 * @apiParam {String="all","data","date","idMemberCreator","type"} [fields='"all"']
 *    Action fields to include in the response, can either be <code>"all"</code>
 *    or a comma separated list of field names.
 */

/**
 * @apiDefine ActionFilterQueryArg
 * @apiParam {String="all","addAttachmentToCard","addChecklistToCard","addMemberToBoard","addMemberToCard","addMemberToOrganization","addToOrganizationBoard","commentCard","convertToCardFromCheckItem","copyBoard","copyCard","copyCommentCard","createBoard","createCard","createList","createOrganization","deleteAttachmentFromCard","deleteBoardInvitation","deleteCard","deleteOrganizationInvitation","disablePowerUp","emailCard","enablePowerUp","makeAdminOfBoard","makeNormalMemberOfBoard","makeNormalMemberOfOrganization","makeObserverOfBoard","memberJoinedTrello","moveCardFromBoard","moveCardToBoard","moveListFromBoard","moveListToBoard","removeChecklistFromCard","removeFromOrganizationBoard","removeMemberFromCard","unconfirmedBoardInvitation","unconfirmedOrganizationInvitation","updateBoard","updateCard","updateCard:closed","updateCard:desc","updateCard:idList","updateCard:name","updateCheckItemStateOnCard","updateChecklist","updateList","updateList:closed","updateList:name","updateMember","updateOrganization"} [filter='"all"']
 *    Action types to include in the response, can either be <code>"all"</code>
 *    or a comma separated list of field names.
 */

/**
 * @apiDefine ActionsFilterNamedQueryArg
 * @apiParam {String="all","addAttachmentToCard","addChecklistToCard","addMemberToBoard","addMemberToCard","addMemberToOrganization","addToOrganizationBoard","commentCard","convertToCardFromCheckItem","copyBoard","copyCard","copyCommentCard","createBoard","createCard","createList","createOrganization","deleteAttachmentFromCard","deleteBoardInvitation","deleteCard","deleteOrganizationInvitation","disablePowerUp","emailCard","enablePowerUp","makeAdminOfBoard","makeNormalMemberOfBoard","makeNormalMemberOfOrganization","makeObserverOfBoard","memberJoinedTrello","moveCardFromBoard","moveCardToBoard","moveListFromBoard","moveListToBoard","removeChecklistFromCard","removeFromOrganizationBoard","removeMemberFromCard","unconfirmedBoardInvitation","unconfirmedOrganizationInvitation","updateBoard","updateCard","updateCard:closed","updateCard:desc","updateCard:idList","updateCard:name","updateCheckItemStateOnCard","updateChecklist","updateList","updateList:closed","updateList:name","updateMember","updateOrganization"} [actions='"all"']
 *    Action types to include in the response, can either be <code>"all"</code>
 *    or a comma separated list of field names.
 */

/**
 * @apiDefine ActionDisplayEntitiesQueryArgs
 * @apiParam {Boolean} [display=false] Include <code>display</code> data in the
 *    response.
 * @apiParam {Boolean} [entities=false] Include <code>entities</code> data in
 *    the response.
 */

/**
 * @apiDefine ActionIdModelsQueryArg
 * @apiParam {String} [idModels] Only return actions related to these model
 *    ids.
 */

/**
 * @apiDefine ActionInclusionQueryArgs
 * @apiParam {String="all","addAttachmentToCard","addChecklistToCard","addMemberToBoard","addMemberToCard","addMemberToOrganization","addToOrganizationBoard","commentCard","convertToCardFromCheckItem","copyBoard","copyCard","copyCommentCard","createBoard","createCard","createList","createOrganization","deleteAttachmentFromCard","deleteBoardInvitation","deleteCard","deleteOrganizationInvitation","disablePowerUp","emailCard","enablePowerUp","makeAdminOfBoard","makeNormalMemberOfBoard","makeNormalMemberOfOrganization","makeObserverOfBoard","memberJoinedTrello","moveCardFromBoard","moveCardToBoard","moveListFromBoard","moveListToBoard","removeChecklistFromCard","removeFromOrganizationBoard","removeMemberFromCard","unconfirmedBoardInvitation","unconfirmedOrganizationInvitation","updateBoard","updateCard","updateCard:closed","updateCard:desc","updateCard:idList","updateCard:name","updateCheckItemStateOnCard","updateChecklist","updateList","updateList:closed","updateList:name","updateMember","updateOrganization"} [actions='"all"']
 *    Action types to include in the response, can either be <code>"all"</code>
 *    or a comma separated list of field names.
 * @apiParam {String="all","data","date","idMemberCreator","type"} [actionFields='"all"']
 *    Action fields to include in the response, can either be <code>"all"</code>
 *    or a comma separated list of field names.
 */

/**
 * @apiDefine ActionLimitsQueryArgs
 * @apiParam {Boolean} [actionsEntities=false] Include <code>entities</code>
 *    data in the response.
 * @apiParam {Boolean} [actionsDisplay=false] Include <code>display</code>
 *    data in the response.
 * @apiParam {number{0-1000}} [actionsLimit=50] Limit to impose on actions
 *    included in response.
 */

/* Routes */

/**
 * @api {get} /actions/:actionId getAction
 * @apiVersion 1.0.0
 * @apiName getAction
 * @apiDescription Gets the details of the specified action.
 * @apiGroup action
 * @apiPermission read
 *
 * @apiUse ActionDisplayEntitiesQueryArgs
 * @apiUse ActionFieldsQueryArg
 * @apiUse MemberInclusionQueryArgs
 * @apiUse MemberCreatorInclusionQueryArgs
 * @apiExample {js} Example:
 trello.actions('aCtIoNId').getAction({...});
*/

/**
 * @api {get} /actions/:actionId/:field getFieldValue
 * @apiVersion 1.0.0
 * @apiName getFieldValue
 * @apiDescription Gets the field value for the specified action.
 * @apiGroup action
 * @apiPermission read
 *
 * @apiUse ActionFieldQueryArg
 * @apiExample {js} Example:
 trello.actions('aCtIoNId').getFieldValue('date');
 */

/**
 * @api {get} /actions/:actionId/board getBoard
 * @apiVersion 1.0.0
 * @apiName getBoard
 * @apiDescription Gets the board associated with the specified action.
 * @apiGroup action
 * @apiPermission read
 *
 * @apiUse BoardFieldsQueryArg
 * @apiExample {js} Example:
 trello.actions('aCtIoNId').board().getBoard({...});
 */

/**
 * @api {get} /actions/:actionId/board/:field getBoardFieldValue
 * @apiVersion 1.0.0
 * @apiName getBoardFieldValue
 * @apiDescription Gets the value of the specified board field associated
 *    with the specified action.
 * @apiGroup action
 * @apiPermission read
 *
 * @apiUse BoardFieldQueryArg
 * @apiExample {js} Example:
 trello.actions('aCtIoNId').board().getFieldValue('desc');
 */

/**
 * @api {get} /actions/:actionId/card getCard
 * @apiVersion 1.0.0
 * @apiName getCard
 * @apiDescription Gets the card associated with the specified action.
 * @apiGroup action
 * @apiPermission read
 *
 * @apiUse CardFieldsQueryArg
 * @apiExample {js} Example:
 trello.actions('aCtIoNId').card().getCard({...});
 */

/**
 * @api {get} /actions/:actionId/card/:field getCardFieldValue
 * @apiVersion 1.0.0
 * @apiName getCardFieldValue
 * @apiDescription Gets the value of the specified card field associated with
 *    the specified action.
 * @apiGroup action
 * @apiPermission read
 *
 * @apiUse CardFieldQueryArg
 * @apiExample {js} Example:
 trello.actions('aCtIoNId').card().getFieldValue('desc');
 */

/**
 * @api {get} /actions/:actionId/display getDisplay
 * @apiVersion 1.0.0
 * @apiName getDisplay
 * @apiDescription Gets the <code>display</code> data for the specified action.
 * @apiGroup action
 * @apiPermission read
 *
 * @apiExample {js} Example:
 trello.actions('aCtIoNId').getDisplay();
 */

/**
 * @api {get} /actions/:actionId/entities getEntities
 * @apiVersion 1.0.0
 * @apiName getEntities
 * @apiDescription Gets the <code>entities</code> data for the specified action.
 * @apiGroup action
 * @apiPermission read
 *
 * @apiExample {js} Example:
 trello.actions('aCtIoNId').getEntities();
 */

/**
 * @api {get} /actions/:actionId/list getList
 * @apiVersion 1.0.0
 * @apiName getList
 * @apiDescription Gets the list associated with the specified action.
 * @apiGroup action
 * @apiPermission read
 *
 * @apiUse ListFieldsQueryArg
 * @apiExample {js} Example:
 trello.actions('aCtIoNId').list().getList({...});
 */

/**
 * @api {get} /actions/:actionId/list/:field getListFieldValue
 * @apiVersion 1.0.0
 * @apiName getListFieldValue
 * @apiDescription Gets the value of the specified list field associated with
 *    the specified action.
 * @apiGroup action
 * @apiPermission read
 *
 * @apiUse ListFieldQueryArg
 * @apiExample {js} Example:
 trello.actions('aCtIoNId').list().getFieldValue('name');
 */

/**
 * @api {get} /actions/:actionId/member getMember
 * @apiVersion 1.0.0
 * @apiName getMember
 * @apiDescription Gets the member associated with the specified action.
 * @apiGroup action
 * @apiPermission read
 *
 * @apiUse MemberEveryFieldsQueryArg
 * @apiExample {js} Example:
 trello.actions('aCtIoNId').member().getMember({...});
 */

/**
 * @api {get} /actions/:actionId/member/:field getMemberFieldValue
 * @apiVersion 1.0.0
 * @apiName getMemberFieldValue
 * @apiDescription Gets the value of the specified member field associated
 *    with the specified action.
 * @apiGroup action
 * @apiPermission read
 *
 * @apiUse MemberEveryFieldQueryArg
 * @apiExample {js} Example:
 trello.actions('aCtIoNId').member().getFieldValue('fullName');
 */

/**
 * @api {get} /actions/:actionId/memberCreator getMemberCreator
 * @apiVersion 1.0.0
 * @apiName getMemberCreator
 * @apiDescription Gets the member creator associated with the specified
 *    action.
 * @apiGroup action
 * @apiPermission read
 *
 * @apiUse MemberEveryFieldsQueryArg
 * @apiExample {js} Example:
 trello.actions('aCtIoNId').memberCreator().getMember({...});
 */

/**
 * @api {get} /actions/:actionId/memberCreator/:field getMemberCreatorFieldValue
 * @apiVersion 1.0.0
 * @apiName getMemberCreatorFieldValue
 * @apiDescription Gets the value of the specified member creator field
 *    associated with the specified action.
 * @apiGroup action
 * @apiPermission read
 *
 * @apiUse MemberEveryFieldQueryArg
 * @apiExample {js} Example:
 trello.actions('aCtIoNId').memberCreator().getFieldValue('fullName');
 */

/**
 * @api {get} /actions/:actionId/organization getOrganization
 * @apiVersion 1.0.0
 * @apiName getOrganization
 * @apiDescription Gets the organization associated with the specified action.
 * @apiGroup action
 * @apiPermission read
 *
 * @apiUse OrganizationFieldsQueryArg
 * @apiExample {js} Example:
 trello.actions('aCtIoNId').organization().getOrganization({...});
 */

/**
 * @api {get} /actions/:actionId/organization/:field getOrganizationFieldValue
 * @apiVersion 1.0.0
 * @apiName getOrganizationFieldValue
 * @apiDescription Gets the value of the specified organization field
 *    associated with the specified action.
 * @apiGroup action
 * @apiPermission read
 *
 * @apiUse OrganizationFieldQueryArg
 * @apiExample {js} Example:
 trello.actions('aCtIoNId').organization().getFieldValue('fullName');
 */

/**
 * @api {put} /actions/:actionId updateAction
 * @apiVersion 1.0.0
 * @apiName updateAction
 * @apiDescription Updates the text associated with the action.
 *    Note: You can only use <code>PUT</code> on <code>commentCard</code>
 *    actions to update the comment. PUTing a new text value will also
 *    update the comment on the card.
 * @apiGroup action
 * @apiPermission write
 *
 * @apiParam {String{1..16384}} [text] Updated text for the comment.
 * @apiExample {js} Example:
 trello.actions('aCtIoNId').updateAction({
   text: 'This is the updated comment text.'
 });
 */

/**
 * @api {put} /actions/:actionId/text updateText
 * @apiVersion 1.0.0
 * @apiName updateText
 * @apiDescription Updates the text associated with the action.
 *    Note: You can only use <code>PUT</code> on <code>commentCard</code>
 *    actions to update the comment. PUTing a new text value will also
 *    update the comment on the card.
 * @apiGroup action
 * @apiPermission write
 *
 * @apiParam {String{1..16384}} [value] Updated text for the comment.
 * @apiExample {js} Example:
 trello.actions('aCtIoNId').updateText('This is the updated comment text.');
 */

/**
 * @api {delete} /actions/:actionId deleteAction
 * @apiVersion 1.0.0
 * @apiName deleteAction
 * @apiDescription Deletes the action.
 *    Note: You can only use <code>DELETE</code> on <code>commentCard</code>
 *    actions.  Deleting a <code>commentCard</code> action will also delete the
 *    comment on the card. You can only delete a <code>commentCard</code> action
 *    if you are the one that created the comment, you have more permissions
 *    on the board than the person that created the comment, or the person
 *    that created the comment has deleted their account.
 * @apiGroup action
 * @apiPermission write
 *
 * @apiExample {js} Example:
 trello.actions('aCtIoNId').deleteAction();
 */
