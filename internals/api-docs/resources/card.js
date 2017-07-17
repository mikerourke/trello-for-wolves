/**
 * @api {get} /cards/:cardId getCard
 * @apiVersion 1.0.0
 * @apiName getCard
 * @apiDescription Get details of a single card.
 * @apiGroup card
 * @apiPermission read
 *
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
 * @apiParam {Boolean=true,false,"cover"} [attachments=false]
 *    If <code>true</code>, include all attachments, if <code>false</code>, include none, and if <code>"cover"</code>, include only card cover attachments.
 * @apiParam {String[]="all","bytes","date","edgeColor","idMember","isUpload","mimeType","name","previews","url"} [attachmentFields='"all"']
 *    Attachment fields to include in the response, can either be <code>"all"</code> or an array of field names.
 * @apiParam {Boolean} [members=false]
 *    Indicates if member data should be included in response.
 * @apiParam {String[]="all","avatarHash","bio","bioData","confirmed","fullName","idPremOrgsAdmin","initials","memberType","products","status","url","username"} [memberFields='["avatarHash", "fullName", "initials", "username"]']
 *    Member fields to include in response, can either be <code>"all"</code> or an array of field names.
 * @apiParam {Boolean} [membersVoted=false]
 *    Indicates if members voted data should be included in response.
 * @apiParam {String[]="all","avatarHash","bio","bioData","confirmed","fullName","idPremOrgsAdmin","initials","memberType","products","status","url","username"} [memberVotedFields='["avatarHash", "fullName", "initials", "username"]']
 *    Members voted fields to include in response, can either be <code>"all"</code> or an array of field names.
 * @apiParam {Boolean} [checkItemStates=false]
 *    Indicates if check item state data should be included in response.
 * @apiParam {String[]="all","idCheckItem","state"} [checkItemStateFields='"all"']
 *    Check item state fields to include in response, can either be <code>"all"</code> or an array of field names.
 * @apiParam {String="all","none"} [checklists='"none"']
 *    Checklists to include in response.
 * @apiParam {String[]="all","idBoard","idCard","name","pos"} [checklistFields='"all"']
 *    Checklist fields to include in response, can either be <code>"all"</code> or an array of field names.
 * @apiParam {Boolean} [board=false]
 *    Indicates if board data should be included in response.
 * @apiParam {String[]="all","closed","dateLastActivity","dateLastView","desc","descData","idOrganization","invitations","invited","labelNames","memberships","name","pinned","powerUps","prefs","shortLink","shortUrl","starred","subscribed","url"} [boardFields='["name", "desc", "descData", "closed", "idOrganization", "pinned", "url", "prefs"]']
 *    Board fields to include in response, can either be <code>"all"</code> or an array of field names.
 * @apiParam {Boolean} [list=false]
 *    Indicates if list data should be included in response.
 * @apiParam {String[]="all","closed","idBoard","name","pos","subscribed"} [listFields='"all"']
 *    List fields to include in response, can either be <code>"all"</code> or an array of field names.
 * @apiParam {Boolean} [pluginData=false]
 *    Indicates if plugin data should be included in response.
 * @apiParam {Boolean} [stickers=false]
 *    Indicates if sticker data should be included in the response.
 * @apiParam {String[]="all","image","imageScaled","imageUrl","left","rotate","top","zIndex"} [stickerFields='"all"']
 *    Sticker fields to include in response, can either be <code>"all"</code> or an array of field names.
 * @apiParam {String[]="all","badges","checkItemStates","closed","dateLastActivity","desc","descData","due","email","idAttachmentCover","idBoard","idChecklists","idLabels","idList","idMembers","idMembersVoted","idShort","labels","manualCoverAttachment","name","pos","shortLink","shortUrl","subscribed","url"} [fields='["badges", "checkItemStates", "closed", "dateLastActivity", "desc", "descData", "due", "email", "idBoard", "idChecklists", "idLabels", "idList", "idMembers", "idShort", "idAttachmentCover", "manualCoverAttachment", "labels", "name", "pos", "shortUrl", "url"]']
 *    Card fields to include in response, can either be <code>"all"</code> or an array of field names.
 * @apiExample {js} Example:
 trello.cards('CaRdId').getCard({ ... });
 */
 
/**
 * @api {get} /cards/:cardId/:field getFieldValue
 * @apiVersion 1.0.0
 * @apiName getFieldValue
 * @apiDescription Gets the value of the specified field on a card.
 * @apiGroup card
 * @apiPermission read
 *
 * @apiParam {String[]="all","badges","checkItemStates","closed","dateLastActivity","desc","descData","due","email","idAttachmentCover","idBoard","idChecklists","idLabels","idList","idMembers","idMembersVoted","idShort","labels","manualCoverAttachment","name","pos","shortLink","shortUrl","subscribed","url"} field
 *    Card field to get value for.
 * @apiExample {js} Example:
 trello.cards('CaRdId').getFieldValue('closed');
 */
 
/**
 * @api {get} /cards/:cardId/actions getActionsForCard
 * @apiVersion 1.0.0
 * @apiName getActionsForCard
 * @apiDescription Gets the actions associated with the specified card.
 * @apiGroup card
 * @apiPermission read
 *
 * @apiParam {Boolean} [entities=false]
 *    Include <code>entities</code> data in the response.
 * @apiParam {Boolean} [display=false]
 *    Include <code>display</code> data in the response.
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
 trello.cards('CaRdId').actions().getActions({...});
 */
 
/**
 * @api {get} /cards/:cardId/attachments getAttachmentsInCard
 * @apiVersion 1.0.0
 * @apiName getFieldValue
 * @apiDescription Gets the value of the specified field on a card.
 * @apiGroup card
 * @apiPermission read
 *
 * @apiParam {String[]="all","badges","checkItemStates","closed","dateLastActivity","desc","descData","due","email","idAttachmentCover","idBoard","idChecklists","idLabels","idList","idMembers","idMembersVoted","idShort","labels","manualCoverAttachment","name","pos","shortLink","shortUrl","subscribed","url"} field
 *    Card field to get value for.
 * @apiExample {js} Example:
 trello.cards('CaRdId').getFieldValue('closed');
 */