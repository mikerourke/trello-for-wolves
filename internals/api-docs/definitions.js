/**
 * @apiDefine DeltasQueryArgs
 * @apiParam {String} tags A valid tag for subscribing.
 * @apiParam {Number{-1-Infinity}} ixLastUpdate Index of last update.
 */

/**
 * @apiDefine LimitQueryArg
 * @apiParam {Number{0-1000}} [limit=50] Number of records to limit for
 *    response.
 */

/**
 * @apiDefine PageQueryArg
 * @apiParam {Number} [page=0] Pages to include in response.  Page * limit
 *    must be less than 1,000.
 */

/**
 * @apiDefine WithinLimitsQueryArgs
 * @apiParam {String="count","list","minimal"} [format="list"] Format for
 *    displaying results in the response.
 * @apiParam {String="lastView",date,null} [since] Starting date for data to
 *    include in the response, can be a date, <code>null</code> or
 *    <code>"lastView"</code>.
 * @apiParam {Date} [before] Ending date for data to include in response, can
 *    be either a date or <code>null</code>.
 */

/**
 * @apiDefine ActionFieldQueryArg
 * @apiParam {String="data","date","idMemberCreator","type"} field
 *    Action field value to return in the response.
 */

/**
 * @apiDefine ActionFieldsQueryArg
 * @apiParam {String="all","data","date","idMemberCreator","type"} [fields='"all"']
 *    Action fields to include in the response, can either be <code>"all"</code>
 *    or an array of field names.
 */

/**
 * @apiDefine ActionListFilterQueryArg
 * @apiParam {String="all","commentCard","convertToCardFromCheckItem","copyCard","createCard","createList","deleteCard","emailCard","updateCard","updateCard:closed","updateCard:desc","updateCard:idList","updateCard:name","updateList","updateList:closed","updateList:name"} [filter='"all"']
 *    Action types to include in the response, can either be <code>"all"</code>
 *    or an array of field names.
 */

/**
 * @apiDefine ActionFilterQueryArg
 * @apiParam {String="all","addAttachmentToCard","addChecklistToCard","addMemberToBoard","addMemberToCard","addMemberToOrganization","addToOrganizationBoard","commentCard","convertToCardFromCheckItem","copyBoard","copyCard","copyCommentCard","createBoard","createCard","createList","createOrganization","deleteAttachmentFromCard","deleteBoardInvitation","deleteCard","deleteOrganizationInvitation","disablePowerUp","emailCard","enablePowerUp","makeAdminOfBoard","makeNormalMemberOfBoard","makeNormalMemberOfOrganization","makeObserverOfBoard","memberJoinedTrello","moveCardFromBoard","moveCardToBoard","moveListFromBoard","moveListToBoard","removeChecklistFromCard","removeFromOrganizationBoard","removeMemberFromCard","unconfirmedBoardInvitation","unconfirmedOrganizationInvitation","updateBoard","updateCard","updateCard:closed","updateCard:desc","updateCard:idList","updateCard:name","updateCheckItemStateOnCard","updateChecklist","updateList","updateList:closed","updateList:name","updateMember","updateOrganization"} [filter='"all"']
 *    Action types to include in the response, can either be <code>"all"</code>
 *    or an array of field names.
 */

/**
 * @apiDefine ActionsFilterNamedQueryArg
 * @apiParam {String="all","addAttachmentToCard","addChecklistToCard","addMemberToBoard","addMemberToCard","addMemberToOrganization","addToOrganizationBoard","commentCard","convertToCardFromCheckItem","copyBoard","copyCard","copyCommentCard","createBoard","createCard","createList","createOrganization","deleteAttachmentFromCard","deleteBoardInvitation","deleteCard","deleteOrganizationInvitation","disablePowerUp","emailCard","enablePowerUp","makeAdminOfBoard","makeNormalMemberOfBoard","makeNormalMemberOfOrganization","makeObserverOfBoard","memberJoinedTrello","moveCardFromBoard","moveCardToBoard","moveListFromBoard","moveListToBoard","removeChecklistFromCard","removeFromOrganizationBoard","removeMemberFromCard","unconfirmedBoardInvitation","unconfirmedOrganizationInvitation","updateBoard","updateCard","updateCard:closed","updateCard:desc","updateCard:idList","updateCard:name","updateCheckItemStateOnCard","updateChecklist","updateList","updateList:closed","updateList:name","updateMember","updateOrganization"} [actions='"all"']
 *    Action types to include in the response, can either be <code>"all"</code>
 *    or an array of field names.
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
 * @apiParam {String} [idModels] Only return actions related to these model ids.
 */

/**
 * @apiDefine ActionInclusionQueryArgs
 * @apiParam {String="all","addAttachmentToCard","addChecklistToCard","addMemberToBoard","addMemberToCard","addMemberToOrganization","addToOrganizationBoard","commentCard","convertToCardFromCheckItem","copyBoard","copyCard","copyCommentCard","createBoard","createCard","createList","createOrganization","deleteAttachmentFromCard","deleteBoardInvitation","deleteCard","deleteOrganizationInvitation","disablePowerUp","emailCard","enablePowerUp","makeAdminOfBoard","makeNormalMemberOfBoard","makeNormalMemberOfOrganization","makeObserverOfBoard","memberJoinedTrello","moveCardFromBoard","moveCardToBoard","moveListFromBoard","moveListToBoard","removeChecklistFromCard","removeFromOrganizationBoard","removeMemberFromCard","unconfirmedBoardInvitation","unconfirmedOrganizationInvitation","updateBoard","updateCard","updateCard:closed","updateCard:desc","updateCard:idList","updateCard:name","updateCheckItemStateOnCard","updateChecklist","updateList","updateList:closed","updateList:name","updateMember","updateOrganization"} [actions='"all"']
 *    Action types to include in the response, can either be <code>"all"</code>
 *    or an array of field names.
 * @apiParam {String="all","data","date","idMemberCreator","type"} [actionFields='"all"']
 *    Action fields to include in the response, can either be <code>"all"</code>
 *    or an array of field names.
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
 * @apiDefine CardFieldQueryArg
 * @apiParam {String="badges","checkItemStates","closed","dateLastActivity","desc","descData","due","email","idAttachmentCover","idBoard","idChecklists","idLabels","idList","idMembers","idMembersVoted","idShort","labels","manualCoverAttachment","name","pos","shortLink","shortUrl","subscribed","url"} field
 *    Card field to get value for.
 */

/**
 * @apiDefine CardFieldsQueryArg
 * @apiParam {String="all","badges","checkItemStates","closed","dateLastActivity","desc","descData","due","email","idAttachmentCover","idBoard","idChecklists","idLabels","idList","idMembers","idMembersVoted","idShort","labels","manualCoverAttachment","name","pos","shortLink","shortUrl","subscribed","url"} [fields='"all"']
 *    Card fields to include in response, can either be <code>"all"</code> or
 *    an array of field names.
 */

/**
 * @apiDefine CardFilterQueryArg
 * @apiParam {String="all","closed","none","open","visible"} [filter='"all"']
 *    Card types to include in the response
 */

/**
 * @apiDefine CardInclusionQueryArgs
 * @apiParam {String="all","closed","none","open","visible"} [cards='"none"']
 *    Limit cards in the response.
 * @apiParam {String="all","badges","checkItemStates","closed","dateLastActivity","desc","descData","due","email","idAttachmentCover","idBoard","idChecklists","idLabels","idList","idMembers","idMembersVoted","idShort","labels","manualCoverAttachment","name","pos","shortLink","shortUrl","subscribed","url"} [cardFields='"all"']
 *    Card fields to include in response, can either be <code>"all"</code> or
 *    an array of field names.
 */

/**
 * @apiDefine AttachmentInclusionQueryArgs
 * @apiParam {Boolean=true,false,"cover"} [attachments=true]
 *    If <code>true</code>, include all attachments, if <code>false</code>,
 *    include none, and if <code>"cover"</code>, include only card cover
 *    attachments.
 * @apiParam {String="all","bytes","date","edgeColor","idMember","isUpload","mimeType","name","previews","url"} [attachmentFields='"all"']
 *    Attachment fields to include in the response, can either be
 *    <code>"all"</code> or an array of field names.
 */

/**
 * @apiDefine CardAttachmentInclusionQueryArgs
 * @apiParam {Boolean=true,false,"cover"} [cardAttachments=true]
 *    If <code>true</code>, include all attachments, if <code>false</code>,
 *    include none, and if <code>"cover"</code>, include only card cover
 *    attachments.
 * @apiParam {String="all","bytes","date","edgeColor","idMember","isUpload","mimeType","name","previews","url"} [cardAttachmentFields='"all"']
 *    Card attachment fields to include in the response, can either be
 *    <code>"all"</code> or an array of field names.
 */

/**
 * @apiDefine ChecklistFieldsQueryArg
 * @apiParam {String="all","idBoard","idCard","name","pos"} [fields='"all"']
 *    Checklist fields to include in response, can either be <code>"all"</code>
 *    or an array of field names.
 */

/**
 * @apiDefine ChecklistFilterQueryArg
 * @apiParam {String="all","none"} [filter='"all"']
 *    Checklist types to include in response.
 */

/**
 * @apiDefine ChecklistInclusionQueryArgs
 * @apiParam {String="all","none"} [checklists='"none"'] Checklists to include
 *    in response.
 * @apiParam {String="all","idBoard","idCard","name","pos"} [checklistFields='"all"']
 *    Checklist fields to include in response, can either be <code>"all"</code>
 *    or an array of field names.
 */

/**
 * @apiDefine CheckItemInclusionQueryArgs
 * @apiParam {String="all","none"} [checkItems='"none"'] Checklist items to
 *    include in response.
 * @apiParam {String="all","name","nameData","pos","state","value"} [checkItemFields='"all"']
 *    Checklist item fields to include in response, can either be
 *    <code>"all"</code> or an array of field names.
 */

/**
 * @apiDefine CheckItemStateInclusionQueryArgs
 * @apiParam {Boolean} [checkItemStates=true] Indicates if check item state
 *    data should be included in response.
 * @apiParam {String="all","idCheckItem","state"} [checkItemStateFields='"all"']
 *    Check item state fields to include in response, can either be
 *    <code>"all"</code> or an array of field names.
 */

/**
 * @apiDefine LabelFieldsQueryArg
 * @apiParam {String="all","color","idBoard","name","uses"} [fields='"all"']
 *    Label fields to include in response, can either be <code>"all"</code>
 *    or an array of field names.
 */

/**
 * @apiDefine LabelInclusionQueryArgs
 * @apiParam {String="all","none"} [labels='"none"'] Labels to include in
 *    response.
 * @apiParam {String="all","color","idBoard","name","uses"} [labelFields='"all"']
 *    Label fields to include in response, can either be <code>"all"</code> or
 *    an array of field names.
 */

/**
 * @apiDefine ListFieldQueryArg
 * @apiParam {String="closed","idBoard","name","pos","subscribed"} field
 *    List field to get value for.
 */

/**
 * @apiDefine ListFieldsQueryArg
 * @apiParam {String="all","closed","idBoard","name","pos","subscribed"} [fields='"all"']
 *    List fields to include in response, can either be <code>"all"</code> or
 *    an array of field names.
 */

/**
 * @apiDefine ListFilterQueryArg
 * @apiParam {String="all","closed","none","open"} [filter='"all"']
 *    Limit response to include specified statuses, can either be
 *    <code>"all"</code> or an array of field names.
 */

/**
 * @apiDefine ListInclusionQueryArgs
 * @apiParam {String="all","closed","none","open"} [list='"all"']
 *    Limit response to include specified statuses, can either be
 *    <code>"all"</code> or an array of field names.
 * @apiParam {String="all","closed","idBoard","name","pos","subscribed"} [listFields='"all"']
 *    List fields to include in response, can either be
 *    <code>"all"</code> or an array of field names.
 */

/**
 * @apiDefine MemberFilterQueryArg
 * @apiParam {String="admins","all","none","normal","owners"} [filter]
 *    Member level types to include in the response
 */

/**
 * @apiDefine MemberFieldQueryArg
 * @apiParam {String="avatarHash","bioData","idPremOrgsAdmin","memberType","products","status","url"} field
 *    Member field to get value for.
 */

/**
 * @apiDefine MemberFieldsQueryArg
 * @apiParam {String[]="all","avatarHash","bioData","idPremOrgsAdmin","memberType","products","status","url"} [fields=["avatarHash","fullName","initials","username"]]
 *    Member fields to include in response, can either be <code>"all"</code> or
 *    an array of field names.
 */

/**
 * @apiDefine MemberEveryFieldQueryArg
 * @apiParam {String="avatarHash","avatarSource","bio","bioData","confirmed","email","fullName","gravatarHash","idBoards","idBoardsPinned","idOrganizations","idPremOrgsAdmin","initials","loginTypes","memberType","oneTimeMessagesDismissed","prefs","premiumFeatures","products","status","status","trophies","uploadedAvatarHash","url","username"} field
 *    Member field to get value for.
 */

/**
 * @apiDefine MemberEveryFieldsQueryArg
 * @apiParam {String="all","avatarHash","avatarSource","bio","bioData","confirmed","email","fullName","gravatarHash","idBoards","idBoardsPinned","idOrganizations","idPremOrgsAdmin","initials","loginTypes","memberType","oneTimeMessagesDismissed","prefs","premiumFeatures","products","status","status","trophies","uploadedAvatarHash","url","username"} [fields='"all"']
 *    Member fields to include in response, can either be <code>"all"</code> or
 *    an array of field names.
 */

/**
 * @apiDefine ActionMemberInclusionQueryArgs
 * @apiParam {Boolean} [actionMember=true] Indicates if member fields should be
 *    included in response for actions.
 * @apiParam {String="all","avatarHash","bio","bioData","confirmed","fullName","idPremOrgsAdmin","initials","memberType","products","status","url","username"} [actionMemberFields='"avatarHash,fullName,initials,username"']
 *    Member fields for actions to include in response, can either be
 *    <code>"all"</code> or an array of field names.
 * @apiParam {Boolean} [actionMemberCreator=true] Indicates if member creator
 *    fields should be included in response for actions.
 * @apiParam {String="all","avatarHash","bio","bioData","confirmed","fullName","idPremOrgsAdmin","initials","memberType","products","status","url","username"} [actionMemberFields='"avatarHash,fullName,initials,username"']
 *    Member creator fields for actions to include in response, can either be
 *    <code>"all"</code> or an array of field names.
 */

/**
 * @apiDefine MemberInclusionQueryArgs
 * @apiParam {Boolean} [member=true] Indicates if member fields should be
 *    included in response.
 * @apiParam {String="all","avatarHash","bio","bioData","confirmed","fullName","idPremOrgsAdmin","initials","memberType","products","status","url","username"} [memberFields='"avatarHash,fullName,initials,username"']
 *    Member fields to include in response, can either be <code>"all"</code>
 *    or an array of field names.
 */

/**
 * @apiDefine MemberCreatorInclusionQueryArgs
 * @apiParam {Boolean} [memberCreator=true] Indicates if member creator fields
 *    should be included in response.
 * @apiParam {String="all","avatarHash","bio","bioData","confirmed","fullName","idPremOrgsAdmin","initials","memberType","products","status","url","username"} [memberCreatorFields='"avatarHash,fullName,initials,username"']
 *    Member creator fields to include in response, can either be
 *    <code>"all"</code> or an array of field names.
 */

/**
 * @apiDefine MembershipsMemberInclusionQueryArgs
 * @apiParam {Boolean} [membershipsMember=true] Indicates if membership member
 *    fields should be included in response.
 * @apiParam {String="all","avatarHash","bio","bioData","confirmed","fullName","idPremOrgsAdmin","initials","memberType","products","status","url","username"} [memberCreatorFields='"avatarHash,fullName,initials,username"']
 *    Membership member fields to include in response, can either be
 *    <code>"all"</code> or an array of field names.
 */

/**
 * @apiDefine MembersInvitedInclusionQueryArgs
 * @apiParam {String="admins","all","none","normal","owners"} [membersInvited=true]
 *    Member levels for invited members that should be included in response.
 * @apiParam {String="all","avatarHash","bio","bioData","confirmed","fullName","idPremOrgsAdmin","initials","memberType","products","status","url","username"} [membersInvitedFields='"avatarHash,fullName,initials,username"']
 *    Invited member fields to include in response, can either be
 *    <code>"all"</code> or an array of field names.
 */

/**
 * @apiDefine MembershipFilterQueryArg
 * @apiParam {String="all","active","admin","deactivated","me","none","normal"} [filter='"all"']
 *    Membership types to include in response.
 */

/**
 * @apiDefine MembershipsQueryArgs
 * @apiParam {String="all","active","admin","deactivated","me","none","normal"} [memberships='"none"']
 *    Membership data to include in response.
 */

/**
 * @apiDefine OrganizationFieldQueryArg
 * @apiParam {String="billableMemberCount","desc","descData","displayName","idBoards","invitations","invited","logoHash","memberships","name","powerUps","prefs","premiumFeatures","products","url","website"} field
 *    Organization field to get value for.
 */

/**
 * @apiDefine OrganizationFieldsQueryArg
 * @apiParam {String="all","billableMemberCount","desc","descData","displayName","idBoards","invitations","invited","logoHash","memberships","name","powerUps","prefs","premiumFeatures","products","url","website"} [fields='"all"']
 *    Organization fields to include in response, can either be
 *    <code>"all"</code> or an array of field names.
 */

/**
 * @apiDefine OrganizationInclusionQueryArgs
 * @apiParam {Boolean} [organization=false] Include <code>organization</code>
 *    data in the response.
 * @apiParam {String="all","billableMemberCount","desc","descData","displayName","idBoards","invitations","invited","logoHash","memberships","name","powerUps","prefs","premiumFeatures","products","url","website"} [organizationFields='"name,displayName"']
 *    Organization fields to include in the response, can either be
 *    <code>"all"</code> or an array of field names.
 */

/**
 * @apiDefine ModelTypesQueryArg
 * @apiParam {String="all","actions","boards","cards","members","organizations"} [modelTypes='"all"']
 *    Model types to limit search to, can either be <code>"all"</code> or an
 *    array of field names.
 */
