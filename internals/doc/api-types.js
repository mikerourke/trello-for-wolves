/**
 * @apiDefine read Read access rights needed.
 */

/**
 * @apiDefine write Write access rights needed.
 */

/**
 * @apiDefine owner Owner access rights needed.
 */

/**
 * @apiDefine BoardField
 * @apiParam {String="closed","dateLastActivity","dateLastView","desc","descData","idOrganization","invitations","invited","labelNames","memberships","name","pinned","powerUps","prefs","shortLink","shortUrl","starred","subscribed","url"} field Field associated with the board.
 */

/**
 * @apiDefine ActionTypeForFilter
 * @apiParam {String[]="addAttachmentToCard",ActionTypes"addChecklistToCard",ActionTypes"addMemberToBoard",ActionTypes"addMemberToCard",ActionTypes"addMemberToOrganization",ActionTypes"addToOrganizationBoard",ActionTypes"commentCard",ActionTypes"convertToCardFromCheckItem",ActionTypes"copyBoard",ActionTypes"copyCard",ActionTypes"copyCommentCard",ActionTypes"createBoard",ActionTypes"createCard",ActionTypes"createList",ActionTypes"createOrganization",ActionTypes"deleteAttachmentFromCard",ActionTypes"deleteBoardInvitation",ActionTypes"deleteCard",ActionTypes"deleteOrganizationInvitation",ActionTypes"disablePowerUp",ActionTypes"emailCard",ActionTypes"enablePowerUp",ActionTypes"makeAdminOfBoard",ActionTypes"makeNormalMemberOfBoard",ActionTypes"makeNormalMemberOfOrganization",ActionTypes"makeObserverOfBoard",ActionTypes"memberJoinedTrello",ActionTypes"moveCardFromBoard",ActionTypes"moveCardToBoard",ActionTypes"moveListFromBoard",ActionTypes"moveListToBoard",ActionTypes"removeChecklistFromCard",ActionTypes"removeFromOrganizationBoard",ActionTypes"removeMemberFromCard",ActionTypes"unconfirmedBoardInvitation",ActionTypes"unconfirmedOrganizationInvitation",ActionTypes"updateBoard",ActionTypes"updateCard",ActionTypes"updateCard:closed",ActionTypes"updateCard:desc",ActionTypes"updateCard:idList",ActionTypes"updateCard:name",ActionTypes"updateCheckItemStateOnCard",ActionTypes"updateChecklist",ActionTypes"updateList",ActionTypes"updateList:closed",ActionTypes"updateList:name",ActionTypes"updateMember",ActionTypes"updateOrganization"} [filter="all"] Actions to filter by.
 */

/**
 * @apiDefine ActionFieldQueryArg
 * @apiParam {String=data,date,idMemberCreator,type} field
 * Action field to get value for.
 */

/**
 * @apiDefine ActionFieldsQueryArg
 * @apiParam {String=all,data,date,idMemberCreator,type} [fields="all"]
 * Action fields to include in the response, can either be <code>all</code> or a comma separated list of field names.
 */

/**
 * @apiDefine BoardFieldQueryArg
 * @apiParam {String=closed,dateLastActivity,dateLastView,desc,descData,idOrganization,invitations,invited,labelNames,memberships,name,pinned,powerUps,prefs,shortLink,shortUrl,starred,subscribed,url} field
 * Board field to get value for.
 */

/**
 * @apiDefine BoardFieldsQueryArg
 * @apiParam {String=closed,dateLastActivity,dateLastView,desc,descData,idOrganization,invitations,invited,labelNames,memberships,name,pinned,powerUps,prefs,shortLink,shortUrl,starred,subscribed,url} [fields="all"]
 * Board fields to include in response, can either be <code>all</code> or a comma separated list of field names.
 */

/**
 * @apiDefine MemberCreatorInclusionQueryArgs
 * @apiParam {Boolean} [memberCreator=true] Include member creator fields in response.
 * @apiParam {String=all,avatarHash,bio,bioData,confirmed,fullName,idPremOrgsAdmin,initials,memberType,products,status,url,username"} [memberCreatorFields="avatarHash,fullName,initials,username"]
 * Member creator fields to include in response, can either be <code>all</code> or a comma separated list of field names.
 */

/**
 * @apiDefine MemberInclusionQueryArgs
 * @apiParam {Boolean} [member=true] Include member fields in response.
 * @apiParam {String=all,avatarHash,bio,bioData,confirmed,fullName,idPremOrgsAdmin,initials,memberType,products,status,url,username"} [memberFields="avatarHash,fullName,initials,username"]
 * Member fields to include in response, can either be <code>all</code> or a comma separated list of field names.
 */
