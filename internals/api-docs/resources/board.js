/**
 * @api {get} /boards/:boardId getBoard
 * @apiVersion 1.0.0
 * @apiName getBoard
 * @apiDescription Get details of a single board.
 * @apiGroup board
 * @apiPermission read
 *
 * @apiParam {String[]="all","addAttachmentToCard","addChecklistToCard","addMemberToBoard","addMemberToCard","addMemberToOrganization","addToOrganizationBoard","commentCard","convertToCardFromCheckItem","copyBoard","copyCard","copyCommentCard","createBoard","createCard","createList","createOrganization","deleteAttachmentFromCard","deleteBoardInvitation","deleteCard","deleteOrganizationInvitation","disablePowerUp","emailCard","enablePowerUp","makeAdminOfBoard","makeNormalMemberOfBoard","makeNormalMemberOfOrganization","makeObserverOfBoard","memberJoinedTrello","moveCardFromBoard","moveCardToBoard","moveListFromBoard","moveListToBoard","removeChecklistFromCard","removeFromOrganizationBoard","removeMemberFromCard","unconfirmedBoardInvitation","unconfirmedOrganizationInvitation","updateBoard","updateCard","updateCard:closed","updateCard:desc","updateCard:idList","updateCard:name","updateCheckItemStateOnCard","updateChecklist","updateList","updateList:closed","updateList:name","updateMember","updateOrganization"} [actions='"all"']
 *    Action types to include in the response, can either be <code>"all"</code> or an array of field names.
 * @apiParam {Boolean} [actionsEntities=false]
 *    Include <code>entities</code> data in the response.
 * @apiParam {Boolean} [actionsDisplay=false]
 *    Include <code>display</code> data in the response.
 * @apiParam {String="list","count","minimal"} [actionsFormat='"list"']
 *    Format for returning actions in the response.
 * @apiParam {String} [actionsSince]
 *    Starting date for actions to include in the response.  Valid values are a date, <code>null</code> or <code>"lastView"</code>.
 * @apiParam {number{0-1000}} [actionsLimit=50]
 *    Limit to impose on actions included in response.
 * @apiParam {String[]="all","data","date","idMemberCreator","type"} [actionFields='"all"']
 *    Action fields to include in the response, can either be <code>"all"</code> or an array of field names.
 * @apiParam {Boolean} [actionMember=true]
 *    Indicates if member fields should be included in response for actions.
 * @apiParam {String[]="all","avatarHash","bio","bioData","confirmed","fullName","idPremOrgsAdmin","initials","memberType","products","status","url","username"} [actionMemberFields='["avatarHash", "fullName", "initials", "username"]']
 *    Member fields for actions to include in response, can either be <code>"all"</code> or an array of field names.
 * @apiParam {Boolean} [actionMemberCreator=true]
 *    Indicates if member creator fields should be included in response for actions.
 * @apiParam {String[]="all","avatarHash","bio","bioData","confirmed","fullName","idPremOrgsAdmin","initials","memberType","products","status","url","username"} [actionMemberCreatorFields='["avatarHash", "fullName", "initials", "username"]']
 *    Member creator fields for actions to include in response, can either be <code>"all"</code> or an array of field names.
 * @apiParam {String="all","closed","none","open","visible"} [cards='"none"']
 *    Limit cards in the response.
 * @apiParam {String[]="all","badges","checkItemStates","closed","dateLastActivity","desc","descData","due","email","idAttachmentCover","idBoard","idChecklists","idLabels","idList","idMembers","idMembersVoted","idShort","labels","manualCoverAttachment","name","pos","shortLink","shortUrl","subscribed","url"} [cardFields='"all"']
 *    Card fields to include in response, can either be <code>"all"</code> or an array of field names.
 * @apiParam {Boolean=true,false,"cover"} [cardAttachments=true]
 *    If <code>true</code>, include all attachments, if <code>false</code>, include none, and if <code>"cover"</code>, include only card cover attachments.
 * @apiParam {String[]="all","bytes","date","edgeColor","idMember","isUpload","mimeType","name","previews","url"} [cardAttachmentFields='"all"']
 *    Card attachment fields to include in the response, can either be <code>"all"</code> or an array of field names.
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
 *    Label fields to include in response, can either be <code>"all"</code> or an array of field names.
 * @apiParam {Number{0-1000}} [labelsLimit=50]
 *    Maximum number of labels to show in response.
 * @apiParam {String[]="all","closed","none","open"} [list='"all"']
 *    Limit response to include specified statuses, can either be <code>"all"</code> or an array of field names.
 * @apiParam {String[]="all","closed","idBoard","name","pos","subscribed"} [listFields='"all"']
 *    List fields to include in response, can either be <code>"all"</code> or an array of field names.
 * @apiParam {String[]="all","active","admin","deactivated","me","none","normal"} [memberships='"none"']
 *    Memberships to include in the response, can either be <code>"all"</code> or an array of field names.
 * @apiParam {Boolean} [membershipsMember=true]
 *    Indicates if membership member fields should be included in response.
 * @apiParam {String[]="all","avatarHash","bio","bioData","confirmed","fullName","idPremOrgsAdmin","initials","memberType","products","status","url","username"} [memberCreatorFields='["avatarHash", "fullName", "initials", "username"]']
 *    Membership member fields to include in response, can either be <code>"all"</code> or an array of field names.
 * @apiParam {String="admins","all","none","normal","owners"} [members='"none"']
 *    Member level types to include in the response
 * @apiParam {String[]="all","avatarHash","bio","bioData","confirmed","fullName","idPremOrgsAdmin","initials","memberType","products","status","url","username"} [memberFields='["avatarHash", "fullName", "initials", "username"]']
 *    Member fields to include in response, can either be <code>"all"</code> or an array of field names.
 * @apiParam {String="admins","all","none","normal","owners"} [membersInvited='"none"']
 *    Member levels for invited members that should be included in response.
 * @apiParam {String[]="all","avatarHash","bio","bioData","confirmed","fullName","idPremOrgsAdmin","initials","memberType","products","status","url","username"} [membersInvitedFields='["avatarHash", "fullName", "initials", "username"]']
 *    Invited member fields to include in response, can either be <code>"all"</code> or an array of field names.
 * @apiParam {Boolean} [pluginData=false]
 *    Indicates if plugin data should be included in response.
 * @apiParam {String="all","none"} [checklists='"none"']
 *    Checklist data to include in the response.
 * @apiParam {String[]="all","idBoard","idCard","name","pos"} [checklistFields='"all"']
 *    Checklist fields to include in response, can either be <code>"all"</code> or an array of field names.
 * @apiParam {String[]="all","closed","none","open"} [list='"all"']
 *    Limit response to include specified statuses, can either be <code>"all"</code> or an array of field names.
 * @apiParam {String[]="all","closed","idBoard","name","pos","subscribed"} [listFields='"all"']
 *    List fields to include in response, can either be <code>"all"</code> or an array of field names.
 * @apiParam {Boolean} [memberCreator=true]
 *    Indicates if member creator fields should be included in response.
 * @apiParam {String[]="all","avatarHash","bio","bioData","confirmed","fullName","idPremOrgsAdmin","initials","memberType","products","status","url","username"} [memberCreatorFields='["avatarHash", "fullName", "initials", "username"]']
 *    Member creator fields to include in response, can either be <code>"all"</code> or an array of field names.
 * @apiParam {Boolean} [organization=false]
 *    Include organization data in the response.
 * @apiParam {String[]="all","billableMemberCount","desc","descData","displayName","idBoards","invitations","invited","logoHash","memberships","name","powerUps","prefs","premiumFeatures","products","url","website"} [organizationFields='["name", "displayName"]']
 *    Organization fields to include in the response, can either be <code>"all"</code> or an array of field names.
 * @apiParam {String[]="all","active","admin","deactivated","me","none","normal"} [organizationMemberships='"none"']
 *    Organization memberships to include in the response, can either be <code>"all"</code> or an array of field names.
 * @apiParam {Boolean} [organizationPluginData=false]
 *    Indicates if organization plugin data should be included in response.
 * @apiParam {Boolean} [myPrefs=false]
 *    Indicates if myPrefs data should be included in response.
 * @apiParam {Boolean} [tags=false]
 *    Indicates if tags data should be included in response.
 * @apiParam {String[]="all","closed","dateLastActivity","dateLastView","desc","descData","idOrganization","invitations","invited","labelNames","memberships","name","pinned","powerUps","prefs","shortLink","shortUrl","starred","subscribed","url"} [fields='"all"']
 *    Board fields to include in response, can either be <code>"all"</code> or an array of field names.
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
 * @apiParam {String="closed","dateLastActivity","dateLastView","desc","descData","idOrganization","invitations","invited","labelNames","memberships","name","pinned","powerUps","prefs","shortLink","shortUrl","starred","subscribed","url"} field
 *    Board field to get value for.
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
 * @apiParam {Boolean} [display=false]
 *    Include <code>display</code> data in the response.
 * @apiParam {Boolean} [entities=false]
 *    Include <code>entities</code> data in the response.
 * @apiParam {String[]="all","addAttachmentToCard","addChecklistToCard","addMemberToBoard","addMemberToCard","addMemberToOrganization","addToOrganizationBoard","commentCard","convertToCardFromCheckItem","copyBoard","copyCard","copyCommentCard","createBoard","createCard","createList","createOrganization","deleteAttachmentFromCard","deleteBoardInvitation","deleteCard","deleteOrganizationInvitation","disablePowerUp","emailCard","enablePowerUp","makeAdminOfBoard","makeNormalMemberOfBoard","makeNormalMemberOfOrganization","makeObserverOfBoard","memberJoinedTrello","moveCardFromBoard","moveCardToBoard","moveListFromBoard","moveListToBoard","removeChecklistFromCard","removeFromOrganizationBoard","removeMemberFromCard","unconfirmedBoardInvitation","unconfirmedOrganizationInvitation","updateBoard","updateCard","updateCard:closed","updateCard:desc","updateCard:idList","updateCard:name","updateCheckItemStateOnCard","updateChecklist","updateList","updateList:closed","updateList:name","updateMember","updateOrganization"} [filter='"all"']
 *    Action types to include in the response, can either be <code>"all"</code> or an array of field names.
 * @apiParam {String[]="all","data","date","idMemberCreator","type"} [fields='"all"']
 *    Action fields to include in the response, can either be <code>"all"</code> or an array of field names.
 * @apiParam {number{0-1000}} [limit=50]
 *    Limit to impose on actions included in response.
 * @apiParam {String="list","count","minimal"} [format='"list"']
 *    Format for returning actions in the response.
 * @apiParam {String} [since]
 *    Starting date for actions to include in the response.  Valid values are a date, <code>null</code> or <code>"lastView"</code>.
 * @apiParam {Date} [before]
 *    End date for actions to include in the response.
 * @apiParam {number{0-1000}} [page=0]
 *    Page of data to return in response.
 * @apiParam {String} [idModels]
 *    Only return actions related to these model ids.
 * @apiParam {Boolean} [member=true]
 *    Indicates if member fields should be included in response.
 * @apiParam {String[]="all","avatarHash","bio","bioData","confirmed","fullName","idPremOrgsAdmin","initials","memberType","products","status","url","username"} [memberFields='["avatarHash", "fullName", "initials", "username"]']
 *    Member fields to include in response, can either be <code>"all"</code> or an array of field names.
 * @apiParam {Boolean} [memberCreator=true]
 *    Indicates if member creator fields should be included in response.
 * @apiParam {String[]="all","avatarHash","bio","bioData","confirmed","fullName","idPremOrgsAdmin","initials","memberType","products","status","url","username"} [memberCreatorFields='["avatarHash", "fullName", "initials", "username"]']
 *    Member creator fields to include in response, can either be <code>"all"</code> or an array of field names.
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
 * @apiParam {String="mine","none"} [filter='"mine"']
 *    Board stars to include in response.
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
 * @apiParam {String[]="all","addAttachmentToCard","addChecklistToCard","addMemberToBoard","addMemberToCard","addMemberToOrganization","addToOrganizationBoard","commentCard","convertToCardFromCheckItem","copyBoard","copyCard","copyCommentCard","createBoard","createCard","createList","createOrganization","deleteAttachmentFromCard","deleteBoardInvitation","deleteCard","deleteOrganizationInvitation","disablePowerUp","emailCard","enablePowerUp","makeAdminOfBoard","makeNormalMemberOfBoard","makeNormalMemberOfOrganization","makeObserverOfBoard","memberJoinedTrello","moveCardFromBoard","moveCardToBoard","moveListFromBoard","moveListToBoard","removeChecklistFromCard","removeFromOrganizationBoard","removeMemberFromCard","unconfirmedBoardInvitation","unconfirmedOrganizationInvitation","updateBoard","updateCard","updateCard:closed","updateCard:desc","updateCard:idList","updateCard:name","updateCheckItemStateOnCard","updateChecklist","updateList","updateList:closed","updateList:name","updateMember","updateOrganization"} [actions='"all"']
 *    Action types to include in the response, can either be <code>"all"</code> or an array of field names.
 * @apiParam {Boolean=true,false,"cover"} [attachments=true]
 *    If <code>true</code>, include all attachments, if <code>false</code>, include none, and if <code>"cover"</code>, include only card cover attachments.
 * @apiParam {String[]="all","bytes","date","edgeColor","idMember","isUpload","mimeType","name","previews","url"} [attachmentFields='"all"']
 *    Attachment fields to include in the response, can either be <code>"all"</code> or an array of field names.
 * @apiParam {Boolean} [stickers=false]
 *    Indicates if sticker data should be included in the response.
 * @apiParam {Boolean} [member=true]
 *    Indicates if member fields should be included in response.
 * @apiParam {String[]="all","avatarHash","bio","bioData","confirmed","fullName","idPremOrgsAdmin","initials","memberType","products","status","url","username"} [memberFields='["avatarHash", "fullName", "initials", "username"]']
 *    Member fields to include in response, can either be <code>"all"</code> or an array of field names.
 * @apiParam {Boolean} [checkItemStates=true]
 *    Indicates if check item state data should be included in response.
 * @apiParam {String="all","none"} [checklists='"none"']
 *    Checklists to include in response.
 * @apiParam {number{0-1000}} [limit=50]
 *    Limit to impose on actions included in response.
 * @apiParam {Date} [since]
 *    Starting date for actions to include in the response.
 * @apiParam {Date} [before]
 *    End date for actions to include in the response.
 * @apiParam {String[]="all","closed","none","open","visible"} [filter='"visible"']
 *    Limit cards in the response, can either be <code>"all"</code> or an array of field names.
 * @apiParam {String[]="all","badges","checkItemStates","closed","dateLastActivity","desc","descData","due","email","idAttachmentCover","idBoard","idChecklists","idLabels","idList","idMembers","idMembersVoted","idShort","labels","manualCoverAttachment","name","pos","shortLink","shortUrl","subscribed","url"} [fields='"all"']
 *    Card fields to include in response, can either be <code>"all"</code> or an array of field names.
 * @apiExample {js} Example:
 trello.boards('BoArDId').cards().getCards({...});
 */

/**
 * @api {get} /boards/:boardId/cards/:filter getCardsFilteredByInBoard
 * @apiVersion 1.0.0
 * @apiName getCardsFilteredByInBoard
 * @apiDescription Gets the cards associated with the specified board that match the filter criteria.
 * @apiGroup board
 * @apiPermission read
 *
 * @apiParam {String="all","closed","none","open","visible"} [filter='"all"']
 *    Card types to include in the response.
 * @apiExample {js} Example:
 trello.boards('BoArDId').cards().getCardsFilteredBy('all');
 */

/**
 * @api {get} /boards/:boardId/cards/:cardId getCardInBoard
 * @apiVersion 1.0.0
 * @apiName getCardInBoard
 * @apiDescription Gets the card data with the specified ID for the specified board.
 * @apiGroup board
 * @apiPermission read
 *
 *
 * @apiParam {Boolean=true,false,"cover"} [attachments=true]
 *    If <code>true</code>, include all attachments, if <code>false</code>, include none, and if <code>"cover"</code>, include only card cover attachments.
 * @apiParam {String[]="all","bytes","date","edgeColor","idMember","isUpload","mimeType","name","previews","url"} [attachmentFields='"all"']
 *    Attachment fields to include in the response, can either be <code>"all"</code> or an array of field names.
 * @apiParam {String[]="all","addAttachmentToCard","addChecklistToCard","addMemberToBoard","addMemberToCard","addMemberToOrganization","addToOrganizationBoard","commentCard","convertToCardFromCheckItem","copyBoard","copyCard","copyCommentCard","createBoard","createCard","createList","createOrganization","deleteAttachmentFromCard","deleteBoardInvitation","deleteCard","deleteOrganizationInvitation","disablePowerUp","emailCard","enablePowerUp","makeAdminOfBoard","makeNormalMemberOfBoard","makeNormalMemberOfOrganization","makeObserverOfBoard","memberJoinedTrello","moveCardFromBoard","moveCardToBoard","moveListFromBoard","moveListToBoard","removeChecklistFromCard","removeFromOrganizationBoard","removeMemberFromCard","unconfirmedBoardInvitation","unconfirmedOrganizationInvitation","updateBoard","updateCard","updateCard:closed","updateCard:desc","updateCard:idList","updateCard:name","updateCheckItemStateOnCard","updateChecklist","updateList","updateList:closed","updateList:name","updateMember","updateOrganization"} [actions='"all"']
 *    Action types to include in the response, can either be <code>"all"</code> or an array of field names.
 * @apiParam {Boolean} [actionsEntities=false]
 *    Include <code>entities</code> data in the response.
 * @apiParam {Boolean} [actionsDisplay=false]
 *    Include <code>display</code> data in the response.
 * @apiParam {number{0-1000}} [actionsLimit=50]
 *    Limit to impose on actions included in response.
 * @apiParam {String[]="all","data","date","idMemberCreator","type"} [actionFields='"all"']
 *    Action fields to include in the response, can either be <code>"all"</code> or an array of field names.
 * @apiParam {String[]="all","avatarHash","bio","bioData","confirmed","fullName","idPremOrgsAdmin","initials","memberType","products","status","url","username"} [actionMemberCreatorFields='["avatarHash", "fullName", "initials", "username"]']
 *    Member creator fields for actions to include in response, can either be <code>"all"</code> or an array of field names.
 * @apiParam {Boolean} [members=true]
 *    Indicates if member fields should be included in response.
 * @apiParam {String[]="all","avatarHash","bio","bioData","confirmed","fullName","idPremOrgsAdmin","initials","memberType","products","status","url","username"} [memberFields='["avatarHash", "fullName", "initials", "username"]']
 *    Member fields to include in response, can either be <code>"all"</code> or an array of field names.
 * @apiParam {Boolean} [checkItemStates=true]
 *    Indicates if check item state data should be included in response.
 * @apiParam {String[]="all","idCheckItem","state"} [checkItemStateFields='"all"']
 *    Check item state fields to include in response, can either be <code>"all"</code> or an array
 *    of field names.
 * @apiParam {Boolean} [labels=true] Indicates if label data should be included in the response.
 * @apiParam {String="all","none"} [checklists='"none"'] Checklist data to include in the response.
 * @apiParam {String[]="all","idBoard","idCard","name","pos"} [checklistFields='"all"']
 *    Checklist fields to include in response, can either be <code>"all"</code> or an array of field names.
 * @apiParam {String[]="all","badges","checkItemStates","closed","dateLastActivity","desc","descData","due","email","idAttachmentCover","idBoard","idChecklists","idLabels","idList","idMembers","idMembersVoted","idShort","labels","manualCoverAttachment","name","pos","shortLink","shortUrl","subscribed","url"} [cardFields='"all"']
 *    Card fields to include in response, can either be <code>"all"</code> or an array of field names.
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
 * @apiParam {String[]="all","closed","none","open","visible"} [cards='"none"']
 *    Limit cards in the response.
 * @apiParam {String[]="all","badges","checkItemStates","closed","dateLastActivity","desc","descData","due","email","idAttachmentCover","idBoard","idChecklists","idLabels","idList","idMembers","idMembersVoted","idShort","labels","manualCoverAttachment","name","pos","shortLink","shortUrl","subscribed","url"} [cardFields='"all"']
 *    Card fields to include in response, can either be <code>"all"</code> or an array of field names.
 * @apiParam {String="all","none"} [checkItems='"none"']
 *    Checklist items to include in response.
 * @apiParam {String[]="all","name","nameData","pos","state","value"} [checkItemFields='"all"']
 *    Checklist item fields to include in response, can either be <code>"all"</code> or an array of field names.
 * @apiParam {String[]="all","idBoard","idCard","name","pos"} [fields='"all"']
 *    Checklist fields to include in response, can either be <code>"all"</code> or an array of field names.
 * @apiParam {String="all","none"} [filter='"all"']
 *    Checklist types to include in response.
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
 * @apiParam {String} tags
 *    A valid tag for subscribing.
 * @apiParam {Number{-1-Infinity}} ixLastUpdate
 *    Index of last update.
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
 * @apiParam {String[]="all","color","idBoard","name","uses"} [fields='"all"']
 *    Label fields to include in response, can either be <code>"all"</code> or an array of field names.
 * @apiParam {Number{0-1000}} [limit=50]
 *    Number of records to limit for response.
 * @apiExample {js} Example:
 trello.boards('BoArDId').labels().getLabels({...});
 */

/**
 * @api {get} /boards/:boardId/label/:labelId getLabelInBoard
 * @apiVersion 1.0.0
 * @apiName getLabelInBoard
 * @apiDescription Gets the label data with the specified ID for the specified board.
 * @apiGroup board
 * @apiPermission read
 *
 * @apiParam {String[]="all","color","idBoard","name","uses"} [fields='"all"']
 *    Label fields to include in response, can either be <code>"all"</code> or an array of field names.
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
 * @apiParam {String="all","closed","none","open","visible"} [cards='"none"']
 *    Limit cards in the response.
 * @apiParam {String[]="all","badges","checkItemStates","closed","dateLastActivity","desc","descData","due","email","idAttachmentCover","idBoard","idChecklists","idLabels","idList","idMembers","idMembersVoted","idShort","labels","manualCoverAttachment","name","pos","shortLink","shortUrl","subscribed","url"} [cardFields='"all"']
 *    Card fields to include in response, can either be <code>"all"</code> or an array of field names.
 * @apiParam {String="all","closed","none","open"} [filter='"open"']
 *    Limit response to include specified statuses.
 * @apiParam {String[]="all","closed","idBoard","name","pos","subscribed"} [fields='"all"']
 *    List fields to include in response, can either be <code>"all"</code> or an array of field names.
 * @apiExample {js} Example:
 trello.boards('BoArDId').lists().getLists({...});
 */

/**
 * @api {get} /boards/:boardId/list/:filter getListsFilteredByInBoard
 * @apiVersion 1.0.0
 * @apiName getListsFilteredByInBoard
 * @apiDescription Gets the lists associated with the specified board that match the filter criteria.
 * @apiGroup board
 * @apiPermission read
 *
 * @apiParam {String="all","closed","none","open"} filter
 *    Limit response to include specified statuses.
 * @apiExample {js} Example:
 trello.boards('BoArDId').lists().getListsFilteredBy('closed');
 */

/**
 * @api {get} /boards/:boardId/members getMembersInBoard
 * @apiVersion 1.0.0
 * @apiName getMembersInBoard
 * @apiDescription Gets the members for a board.
 * @apiGroup board
 * @apiPermission read
 *
 * @apiParam {String="admins","all","none","normal","owners"} [filter]
 *    Member level types to include in the response.
 * @apiParam {String[]="all","avatarHash","bioData","idPremOrgsAdmin","memberType","products","status","url"} [fields='["fullName", "username"]']
 *    Member fields to include in response, can either be <code>"all"</code> or an array of field names.
 * @apiParam {Boolean} [activity=false]
 *    Indicates if activity should be included in the response. This works for premium organizations only.
 * @apiExample {js} Example:
 trello.boards('BoArDId').members().getMembers({...});
 */

/**
 * @api {get} /boards/:boardId/member/:filter getMembersFilteredByInBoard
 * @apiVersion 1.0.0
 * @apiName getMembersFilteredByInBoard
 * @apiDescription Gets the members associated with the specified board that match the filter criteria.
 * @apiGroup board
 * @apiPermission read
 *
 * @apiParam {String="admins","all","none","normal","owners"} filter
 *    Member level types to include in the response
 * @apiExample {js} Example:
 trello.boards('BoArDId').members().getMembersFilteredBy('normal');
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
 * @apiParam {String[]="all","addAttachmentToCard","addChecklistToCard","addMemberToBoard","addMemberToCard","addMemberToOrganization","addToOrganizationBoard","commentCard","convertToCardFromCheckItem","copyBoard","copyCard","copyCommentCard","createBoard","createCard","createList","createOrganization","deleteAttachmentFromCard","deleteBoardInvitation","deleteCard","deleteOrganizationInvitation","disablePowerUp","emailCard","enablePowerUp","makeAdminOfBoard","makeNormalMemberOfBoard","makeNormalMemberOfOrganization","makeObserverOfBoard","memberJoinedTrello","moveCardFromBoard","moveCardToBoard","moveListFromBoard","moveListToBoard","removeChecklistFromCard","removeFromOrganizationBoard","removeMemberFromCard","unconfirmedBoardInvitation","unconfirmedOrganizationInvitation","updateBoard","updateCard","updateCard:closed","updateCard:desc","updateCard:idList","updateCard:name","updateCheckItemStateOnCard","updateChecklist","updateList","updateList:closed","updateList:name","updateMember","updateOrganization"} [actions='"all"']
 *    Action types to include in the response, can either be <code>"all"</code> or an array of field names.
 * @apiParam {Boolean=true,false,"cover"} [attachments=true]
 *    If <code>true</code>, include all attachments, if <code>false</code>, include none, and if <code>"cover"</code>, include only card cover attachments.
 * @apiParam {String[]="all","bytes","date","edgeColor","idMember","isUpload","mimeType","name","previews","url"} [attachmentFields='"all"']
 *    Attachment fields to include in the response, can either be <code>"all"</code> or an array of field names.
 * @apiParam {Boolean} [member=true]
 *    Indicates if member fields should be included in response.
 * @apiParam {String[]="all","avatarHash","bio","bioData","confirmed","fullName","idPremOrgsAdmin","initials","memberType","products","status","url","username"} [memberFields='["avatarHash", "fullName", "initials", "username"]']
 *    Member fields to include in response, can either be <code>"all"</code> or an array of field names.
 * @apiParam {Boolean} [checkItemStates=true]
 *    Indicates if check item state data should be included in response.
 * @apiParam {String="all","none"} [checklists='"none"']
 *    Checklist data to include in the response.
 * @apiParam {Boolean} [board=true]
 *    If <code>true</code>, include board data in the response.
 * @apiParam {String[]="all","closed","dateLastActivity","dateLastView","desc","descData","idOrganization","invitations","invited","labelNames","memberships","name","pinned","powerUps","prefs","shortLink","shortUrl","starred","subscribed","url"} [boardFields='"all"']
 *    Board fields to include in response, can either be <code>"all"</code> or an array of field names.
 * @apiParam {String[]="all","closed","none","open"} [list='"all"']
 *    Limit response to include specified statuses, can either be <code>"all"</code> or an array of field names.
 * @apiParam {String[]="all","closed","idBoard","name","pos","subscribed"} [listFields='"all"']
 *    List fields to include in response, can either be <code>"all"</code> or an array of field names.
 * @apiParam {String[]="all","closed","none","open","visible"} [filter='"all"']
 *    Card types to include in the response.
 * @apiParam {String[]="all","badges","checkItemStates","closed","dateLastActivity","desc","descData","due","email","idAttachmentCover","idBoard","idChecklists","idLabels","idList","idMembers","idMembersVoted","idShort","labels","manualCoverAttachment","name","pos","shortLink","shortUrl","subscribed","url"} [fields='"all"']
 *    Card fields to include in response, can either be <code>"all"</code> or an array of field names.
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
 * @apiParam {String[]="all","avatarHash","avatarSource","bio","bioData","confirmed","email","fullName","gravatarHash","idBoards","idBoardsPinned","idOrganizations","idPremOrgsAdmin","initials","loginTypes","memberType","oneTimeMessagesDismissed","prefs","premiumFeatures","products","status","status","trophies","uploadedAvatarHash","url","username"} [fields='"all"']
 *    Member fields to include in response, can either be <code>"all"</code> or an array of field
 *    names.
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
 * @apiParam {String[]="all","avatarHash","avatarSource","bio","bioData","confirmed","email","fullName","gravatarHash","idBoards","idBoardsPinned","idOrganizations","idPremOrgsAdmin","initials","loginTypes","memberType","oneTimeMessagesDismissed","prefs","premiumFeatures","products","status","status","trophies","uploadedAvatarHash","url","username"} [fields='"all"']
 *    Member fields to include in response, can either be <code>"all"</code> or an array of field
 *    names.
 * @apiExample {js} Example:
 trello.boards('BoArDId').membersInvited().getFieldValue('bio');
 */

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
 * @apiParam {Boolean} [member=true] Indicates if member fields should be included in response.
 * @apiParam {String[]="all","avatarHash","bioData","idPremOrgsAdmin","memberType","products","status","url"} [memberFields='["fullName", "username"]']
 *    Member fields to include in response, can either be <code>"all"</code> or
 *    an array of field names.
 * @apiExample {js} Example:
 trello.boards('BoArDId').membersInvited().getMembers({...});
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
