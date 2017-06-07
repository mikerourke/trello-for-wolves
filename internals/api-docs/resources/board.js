/**
 * @api {path} /boards board
 * @apiVersion 1.0.0
 * @apiName board
 * @apiGroup overview
 * @apiDescription
 *    Boards are the highest level concept within the Trello workflow. The
 *    Boards API allows you to list, view, create, and edit Boards. Each Board
 *    has a name, description, a set of members attached, and an ordered array
 *    of Lists.
 *    <br><br>
 *    Boards can be open or closed, starred, and/or subscribed. Each
 *    Board belongs to an organization. Each board also has a set of preferences
 *    that affect its visual display, and additional features that may have been
 *    attached to the Board (such as Power-Ups).
 */

/**
 * @apiDefine BoardFieldQueryArg
 * @apiParam {String="closed","dateLastActivity","dateLastView","desc","descData","idOrganization","invitations","invited","labelNames","memberships","name","pinned","powerUps","prefs","shortLink","shortUrl","starred","subscribed","url"} field
 *    Board field to get value for.
 */

/**
 * @apiDefine BoardFieldsQueryArg
 * @apiParam {String="all","closed","dateLastActivity","dateLastView","desc","descData","idOrganization","invitations","invited","labelNames","memberships","name","pinned","powerUps","prefs","shortLink","shortUrl","starred","subscribed","url"} [fields='"all"']
 *    Board fields to include in response, can either be <code>"all"</code> or
 *    an array of field names.
 */

/**
 * @apiDefine BoardStarsFilterQueryArg
 * @apiParam {String="mine","none"} [filter='"mine"'] Board stars to include in
 *    response.
 */

/**
 * @apiDefine BoardInclusionQueryArgs
 * @apiParam {Boolean} [board=true] If <code>true</code>, include board data
 *    in the response.
 * @apiParam {String="all","closed","dateLastActivity","dateLastView","desc","descData","idOrganization","invitations","invited","labelNames","memberships","name","pinned","powerUps","prefs","shortLink","shortUrl","starred","subscribed","url"} [boardFields='"all"']
 *    Board fields to include in response, can either be <code>"all"</code> or
 *    an array of field names.
 */

/**
 * @apiDefine BoardSharedGetQueryArgs
 * @apiParam {String="list","count","minimal"} [actionsFormat='"list"'] Format
 *    for returning actions in the response.
 * @apiParam {String="all","active","admin","deactivated","me","none","normal"} [memberships='"none"']
 *    Memberships to include in the response.
 */

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
 * @apiParam {String="lastView",date,null} [actionsSince] Starting date for
 *    actions to include in the response.
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

/**
 * @api {get} /boards/:boardId/actions getActionsForBoard
 * @apiVersion 1.0.0
 * @apiName getActionsForBoard
 * @apiDescription Gets the actions associated with the specified board.
 * @apiGroup board
 * @apiPermission read
 *
 * @apiUse ActionDisplayEntitiesQueryArgs
 * @apiUse ActionFilterQueryArg
 * @apiUse ActionFieldsQueryArg
 * @apiUse ActionIdModelsQueryArg
 * @apiUse MemberInclusionQueryArgs
 * @apiUse MemberCreatorInclusionQueryArgs
 * @apiUse PageQueryArg
 * @apiUse WithinLimitsQueryArgs
 * @apiExample {js} Example:
 trello.boards('BoArDId').action().getActions({...});
 */

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

/**
 * @api {get} /boards/:boardId/cards getCardsInBoard
 * @apiVersion 1.0.0
 * @apiName getCardsForBoard
 * @apiDescription Gets the cards associated with the specified board.
 * @apiGroup board
 * @apiPermission read
 *
 * @apiUse ActionsFilterNamedQueryArg
 * @apiUse ActionIdModelsQueryArg
 * @apiUse AttachmentInclusionQueryArgs
 * @apiUse CardFieldsQueryArg
 * @apiUse LimitQueryArg
 * @apiUse MemberInclusionQueryArgs
 * @apiUse MemberCreatorInclusionQueryArgs
 * @apiUse PageQueryArg
 * @apiUse WithinLimitsQueryArgs
 * @apiParam {Boolean} [checkItemStates=false] Indicates if checklist item
 *    state data should be included in the response.
 * @apiParam {String="all","none"} [checklists='"none"'] Checklist data to
 *    include in the response.
 * @apiParam {Boolean} [stickers=false] Indicates if sticker data should be
 *    included in the response.
 * @apiExample {js} Example:
 trello.boards('BoArDId').cards().getCards({...});
 */

/**
 * @api {get} /boards/:boardId/cards/:filter getFilteredCardsInBoard
 * @apiVersion 1.0.0
 * @apiName getFilteredCardsForBoard
 * @apiDescription Gets the cards associated with the specified board that
 *    match the filter criteria.
 * @apiGroup board
 * @apiPermission read
 *
 * @apiUse CardFilterQueryArg
 * @apiExample {js} Example:
 trello.boards('BoArDId').cards().getFilteredCards('all');
 */

/**
 * @api {get} /boards/:boardId/cards/:cardId getCardInBoard
 * @apiVersion 1.0.0
 * @apiName getCardInBoard
 * @apiDescription Gets the card data with the specified ID for the
 *    specified board.
 * @apiGroup board
 * @apiPermission read
 *
 * @apiUse ActionInclusionQueryArgs
 * @apiUse ActionLimitsQueryArgs
 * @apiUse ActionsFilterNamedQueryArg
 * @apiUse AttachmentInclusionQueryArgs
 * @apiUse CardFieldsQueryArg
 * @apiUse CardFilterQueryArg
 * @apiUse CheckItemStateInclusionQueryArgs
 * @apiUse ChecklistInclusionQueryArgs
 * @apiUse MemberInclusionQueryArgs
 * @apiParam {String="all","avatarHash","bio","bioData","confirmed","fullName","idPremOrgsAdmin","initials","memberType","products","status","url","username"} [actionMemberCreatorFields='"avatarHash,fullName,initials,username"']
 *    Action member creator fields to include in response, can either be
 *    <code>"all"</code> or an array of field names.
 * @apiParam {Boolean} [labels=true] Indicates if label data should be
 *    included in the response.
 * @apiExample {js} Example:
 trello.boards('BoArDId').cards('CaRdId').getCard({...});
 */

/**
 * @api {get} /boards/:boardId/checklists getChecklistsInBoard
 * @apiVersion 1.0.0
 * @apiName getChecklistsInBoard
 * @apiDescription Gets the checklists associated with the specified board.
 * @apiGroup board
 * @apiPermission read
 *
 * @apiUse CardInclusionQueryArgs
 * @apiUse CheckItemInclusionQueryArgs
 * @apiUse ChecklistFieldsQueryArg
 * @apiUse ChecklistFilterQueryArg
 * @apiExample {js} Example:
 trello.boards('BoArDId').checklists().getChecklists({...});
 */

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

/**
 * @api {get} /boards/:boardId/labels getLabelsInBoard
 * @apiVersion 1.0.0
 * @apiName getLabelsInBoard
 * @apiDescription Gets the labels for a board.
 * @apiGroup board
 * @apiPermission read
 *
 * @apiUse LabelFieldsQueryArg
 * @apiUse LimitQueryArg
 * @apiExample {js} Example:
 trello.boards('BoArDId').labels().getLabels({...});
 */

/**
 * @api {get} /boards/:boardId/label/:labelId getLabelInBoard
 * @apiVersion 1.0.0
 * @apiName getLabelInBoard
 * @apiDescription Gets the label data with the specified ID for the
 *    specified board.
 * @apiGroup board
 * @apiPermission read
 *
 * @apiUse LabelFieldsQueryArg
 * @apiExample {js} Example:
 trello.boards('BoArDId').labels('LaBeLiD').getLabel({...});
 */

/**
 * @api {get} /boards/:boardId/lists getListsInBoard
 * @apiVersion 1.0.0
 * @apiName getListsInBoard
 * @apiDescription Gets the lists for a board.
 * @apiGroup board
 * @apiPermission read
 *
 * @apiUse CardInclusionQueryArgs
 * @apiUse ListFieldsQueryArg
 * @apiUse ListFilterQueryArg
 * @apiExample {js} Example:
 trello.boards('BoArDId').lists().getLists({...});
 */

/**
 * @api {get} /boards/:boardId/list/:filter getFilteredListsInBoard
 * @apiVersion 1.0.0
 * @apiName getFilteredListsInBoard
 * @apiDescription Gets the lists associated with the specified board that
 *    match the filter criteria.
 * @apiGroup board
 * @apiPermission read
 *
 * @apiUse ListFilterQueryArg
 * @apiExample {js} Example:
 trello.boards('BoArDId').lists().getFilteredLists('closed');
 */

/**
 * @api {get} /boards/:boardId/members getMembersInBoard
 * @apiVersion 1.0.0
 * @apiName getMembersInBoard
 * @apiDescription Gets the members for a board.
 * @apiGroup board
 * @apiPermission read
 *
 * @apiUse MemberFieldsQueryArg
 * @apiUse MemberFilterQueryArg
 * @apiParam {Boolean} [activity=false] Indicates if activity should be
 *    included in the response.  This works for premium organizations
 *    only.
 * @apiExample {js} Example:
 trello.boards('BoArDId').members().getMembers({...});
 */

/**
 * @api {get} /boards/:boardId/member/:filter getFilteredMembersInBoard
 * @apiVersion 1.0.0
 * @apiName getFilteredMembersInBoard
 * @apiDescription Gets the members associated with the specified board that
 *    match the filter criteria.
 * @apiGroup board
 * @apiPermission read
 *
 * @apiUse MemberFilterQueryArg
 * @apiExample {js} Example:
 trello.boards('BoArDId').members().getFilteredMembers('normal');
 */

/**
 * @api {get} /boards/:boardId/member/:memberId getCardsForMemberInBoard
 * @apiVersion 1.0.0
 * @apiName getMemberInBoard
 * @apiDescription Gets the card data associated with the specified member
 *    on this board.
 * @apiGroup board
 * @apiPermission read
 *
 * @apiUse ActionsFilterNamedQueryArg
 * @apiUse AttachmentInclusionQueryArgs
 * @apiUse BoardInclusionQueryArgs
 * @apiUse CardFieldsQueryArg
 * @apiUse CardFilterQueryArg
 * @apiUse ListInclusionQueryArgs
 * @apiUse MemberInclusionQueryArgs
 * @apiParam {Boolean} [checkItemStates=true] Indicates if check item state
 *    data should be included in response.
 * @apiParam {String="all","none"} [checklists='"none"'] Checklist data to
 *    include in the response.
 * @apiExample {js} Example:
 trello.boards('BoArDId').members('MeMbErId').cards().getCards({...});
 */

/**
 * @api {get} /boards/:boardId/membersInvited getMembersInvitedToBoard
 * @apiVersion 1.0.0
 * @apiName getMembersInvitedToBoard
 * @apiDescription Gets the members invited for a board.
 * @apiGroup board
 * @apiPermission read
 *
 * @apiUse MemberEveryFieldsQueryArg
 * @apiExample {js} Example:
 trello.boards('BoArDId').membersInvited().getMembers({...});
 */

/**
 * @api {get} /boards/:boardId/membersInvited getMembersInvitedFieldValue
 * @apiVersion 1.0.0
 * @apiName getMembersInvitedFieldValue
 * @apiDescription Gets the field value of the members invited for a board.
 * @apiGroup board
 * @apiPermission read
 *
 * @apiUse MemberEveryFieldQueryArg
 * @apiExample {js} Example:
 trello.boards('BoArDId').membersInvited().getFieldValue('bio');
 */

/**
 * @api {get} /boards/:boardId/myPrefs getMyPrefs
 * @apiVersion 1.0.0
 * @apiName getMyPrefs
 * @apiDescription Gets all myPrefs associated with a board.
 * @apiGroup board
 * @apiPermission read
 * @apiExample {js} Example:
 trello.boards('BoArDId').myPrefs().getMyPrefs();
 */

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
