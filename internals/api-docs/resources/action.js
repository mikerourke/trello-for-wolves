/**
 * @api {get} /actions/:actionId getAction
 * @apiVersion 1.0.0
 * @apiName getAction
 * @apiDescription Gets the details of the specified action.
 * @apiGroup action
 * @apiPermission read
 *
 * @apiParam {Boolean} [display=true]
 *    Include <code>display</code> data in the response.
 * @apiParam {Boolean} [entities=false]
 *    Include <code>entities</code> data in the response.
 * @apiParam {String[]="all","data","date","idMemberCreator","type"} [fields='"all"']
 *    Action fields to include in the response, can either be <code>"all"</code> or an array of field names.
 * @apiParam {Boolean} [member=true]
 *    Indicates if member fields should be included in response.
 * @apiParam {String[]="all","avatarHash","bio","bioData","confirmed","fullName","idPremOrgsAdmin","initials","memberType","products","status","url","username"} [memberFields='["avatarHash", "fullName", "initials", "username"]']
 *    Member fields to include in response, can either be <code>"all"</code> or an array of field names.
 * @apiParam {Boolean} [memberCreator=true]
 *    Indicates if member creator fields should be included in response.
 * @apiParam {String[]="all","avatarHash","bio","bioData","confirmed","fullName","idPremOrgsAdmin","initials","memberType","products","status","url","username"} [memberCreatorFields='["avatarHash", "fullName", "initials", "username"]']
 *    Member creator fields to include in response, can either be <code>"all"</code> or an array of field names.
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
 * @apiParam {String="data","date","idMemberCreator","type"} field
 *    Action field value to return in the response.
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
 * @apiParam {String[]="all","closed","dateLastActivity","dateLastView","desc","descData","idOrganization","invitations","invited","labelNames","memberships","name","pinned","powerUps","prefs","shortLink","shortUrl","starred","subscribed","url"} [fields='"all"']
 *    Board fields to include in response, can either be <code>"all"</code> or an array of field names.
 * @apiExample {js} Example:
 trello.actions('aCtIoNId').board().getBoard({...});
 */

/**
 * @api {get} /actions/:actionId/board/:field getBoardFieldValue
 * @apiVersion 1.0.0
 * @apiName getBoardFieldValue
 * @apiDescription Gets the value of the specified board field associated with the specified action.
 * @apiGroup action
 * @apiPermission read
 *
 * @apiParam {String="closed","dateLastActivity","dateLastView","desc","descData","idOrganization","invitations","invited","labelNames","memberships","name","pinned","powerUps","prefs","shortLink","shortUrl","starred","subscribed","url"} field
 *    Board field to get value for.
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
 * @apiParam {String[]="all","badges","checkItemStates","closed","dateLastActivity","desc","descData","due","email","idAttachmentCover","idBoard","idChecklists","idLabels","idList","idMembers","idMembersVoted","idShort","labels","manualCoverAttachment","name","pos","shortLink","shortUrl","subscribed","url"} [fields='"all"']
 *    Card fields to include in response, can either be <code>"all"</code> or
 *    an array of field names.
 * @apiExample {js} Example:
 trello.actions('aCtIoNId').card().getCard({...});
 */

/**
 * @api {get} /actions/:actionId/card/:field getCardFieldValue
 * @apiVersion 1.0.0
 * @apiName getCardFieldValue
 * @apiDescription Gets the value of the specified card field associated with the specified action.
 * @apiGroup action
 * @apiPermission read
 *
 * @apiParam {String="badges","checkItemStates","closed","dateLastActivity","desc","descData","due","email","idAttachmentCover","idBoard","idChecklists","idLabels","idList","idMembers","idMembersVoted","idShort","labels","manualCoverAttachment","name","pos","shortLink","shortUrl","subscribed","url"} field
 *    Card field to get value for.
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
 * @apiParam {String[]="all","closed","idBoard","name","pos","subscribed"} [fields='"all"']
 *    List fields to include in response, can either be <code>"all"</code> or an array of field names.
 * @apiExample {js} Example:
 trello.actions('aCtIoNId').list().getList({...});
 */

/**
 * @api {get} /actions/:actionId/list/:field getListFieldValue
 * @apiVersion 1.0.0
 * @apiName getListFieldValue
 * @apiDescription Gets the value of the specified list field associated with the specified action.
 * @apiGroup action
 * @apiPermission read
 *
 * @apiParam {String="closed","idBoard","name","pos","subscribed"} field
 *    List field to get value for.
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
 * @apiParam {String[]="all","avatarHash","avatarSource","bio","bioData","confirmed","email","fullName","gravatarHash","idBoards","idBoardsPinned","idOrganizations","idPremOrgsAdmin","initials","loginTypes","memberType","oneTimeMessagesDismissed","prefs","premiumFeatures","products","status","status","trophies","uploadedAvatarHash","url","username"} [fields='"all"']
 *    Member fields to include in response, can either be <code>"all"</code> or an array of field names.
 * @apiExample {js} Example:
 trello.actions('aCtIoNId').member().getMember({...});
 */

/**
 * @api {get} /actions/:actionId/member/:field getMemberFieldValue
 * @apiVersion 1.0.0
 * @apiName getMemberFieldValue
 * @apiDescription Gets the value of the specified member field associated with the specified action.
 * @apiGroup action
 * @apiPermission read
 *
 * @apiParam {String="avatarHash","avatarSource","bio","bioData","confirmed","email","fullName","gravatarHash","idBoards","idBoardsPinned","idOrganizations","idPremOrgsAdmin","initials","loginTypes","memberType","oneTimeMessagesDismissed","prefs","premiumFeatures","products","status","status","trophies","uploadedAvatarHash","url","username"} field
 *    Member field to get value for.
 * @apiExample {js} Example:
 trello.actions('aCtIoNId').member().getFieldValue('fullName');
 */

/**
 * @api {get} /actions/:actionId/memberCreator getMemberCreator
 * @apiVersion 1.0.0
 * @apiName getMemberCreator
 * @apiDescription Gets the member creator associated with the specified action.
 * @apiGroup action
 * @apiPermission read
 *
 * @apiParam {String[]="all","avatarHash","avatarSource","bio","bioData","confirmed","email","fullName","gravatarHash","idBoards","idBoardsPinned","idOrganizations","idPremOrgsAdmin","initials","loginTypes","memberType","oneTimeMessagesDismissed","prefs","premiumFeatures","products","status","status","trophies","uploadedAvatarHash","url","username"} [fields='"all"']
 *    Member fields to include in response, can either be <code>"all"</code> or an array of field names.
 * @apiExample {js} Example:
 trello.actions('aCtIoNId').memberCreator().getMember({...});
 */

/**
 * @api {get} /actions/:actionId/memberCreator/:field getMemberCreatorFieldValue
 * @apiVersion 1.0.0
 * @apiName getMemberCreatorFieldValue
 * @apiDescription Gets the value of the specified member creator field associated with the specified action.
 * @apiGroup action
 * @apiPermission read
 *
 * @apiParam {String="avatarHash","avatarSource","bio","bioData","confirmed","email","fullName","gravatarHash","idBoards","idBoardsPinned","idOrganizations","idPremOrgsAdmin","initials","loginTypes","memberType","oneTimeMessagesDismissed","prefs","premiumFeatures","products","status","status","trophies","uploadedAvatarHash","url","username"} field
 *    Member field to get value for.
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
 * @apiParam {String[]="all","billableMemberCount","desc","descData","displayName","idBoards","invitations","invited","logoHash","memberships","name","powerUps","prefs","premiumFeatures","products","url","website"} [fields='"all"']
 *    Organization fields to include in response, can either be <code>"all"</code> or an array of field names.
 * @apiExample {js} Example:
 trello.actions('aCtIoNId').organization().getOrganization({...});
 */

/**
 * @api {get} /actions/:actionId/organization/:field getOrganizationFieldValue
 * @apiVersion 1.0.0
 * @apiName getOrganizationFieldValue
 * @apiDescription Gets the value of the specified organization field associated with the specified action.
 * @apiGroup action
 * @apiPermission read
 *
 * @apiParam {String="billableMemberCount","desc","descData","displayName","idBoards","invitations","invited","logoHash","memberships","name","powerUps","prefs","premiumFeatures","products","url","website"} field
 *    Organization field to get value for.
 * @apiExample {js} Example:
 trello.actions('aCtIoNId').organization().getFieldValue('fullName');
 */

/**
 * @api {put} /actions/:actionId updateAction
 * @apiVersion 1.0.0
 * @apiName updateAction
 * @apiDescription Updates the text associated with the action.
 *    Note: You can only use <code>PUT</code> on <code>commentCard</code> actions to update the comment. PUTing a new text value will also update the comment on the card.
 * @apiGroup action
 * @apiPermission write
 *
 * @apiParam {String{1..16384}} [text]
 *    Updated text for the comment.
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
 *    Note: You can only use <code>PUT</code> on <code>commentCard</code> actions to update the
 *    comment. PUTing a new text value will also update the comment on the card.
 * @apiGroup action
 * @apiPermission write
 *
 * @apiParam {String{1..16384}} [value]
 *    Updated text for the comment.
 * @apiExample {js} Example:
 trello.actions('aCtIoNId').updateText('This is the updated comment text.');
 */

/**
 * @api {delete} /actions/:actionId deleteAction
 * @apiVersion 1.0.0
 * @apiName deleteAction
 * @apiDescription Deletes the action.
 *    Note: You can only use <code>DELETE</code> on <code>commentCard</code> actions.
 *    Deleting a <code>commentCard</code> action will also delete the comment on the card.
 *    You can only delete a <code>commentCard</code> action if you are the one that created the
 *    comment, you have more permissions on the board than the person that created the comment,
 *    or the person that created the comment has deleted their account.
 * @apiGroup action
 * @apiPermission write
 *
 * @apiExample {js} Example:
 trello.actions('aCtIoNId').deleteAction();
 */
