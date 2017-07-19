// @todo: Add missing parameter information.
/**
 * @api {get} /search performSearch
 * @apiVersion 1.0.0
 * @apiName performSearch
 * @apiDescription Performs a search for the specified query with the
 *    specified query parameters.
 * @apiGroup search
 * @apiPermission read
 *
 * @apiParam {String{1...16384}} query Query string to search content for.
 * @apiParam {String} [idBoards='"mine"'] Board IDs to limit search to.  Valid
 *    values are a comma-separated list of objectIds, 24-character hex strings.
 * @apiParam {String} [idOrganizations] Organization IDs to limit search to.
 *    Valid values are a comma-separated list of objectIds, 24-character hex
 *    strings.
 * @apiParam {String} [idCards] Card IDs to limit search to.  Valid values are
 *    a comma-separated list of objectIds, 24-character hex strings.
 * @apiParam {String[]="all","actions","boards","cards","members","organizations"} [modelTypes='"all"']
 *    Model types to limit values for, can either be <code>"all"</code> or an array of field names.
 * @apiParam {String[]="all","closed","dateLastActivity","dateLastView","desc","descData","idOrganization","invitations","invited","labelNames","memberships","name","pinned","powerUps","prefs","shortLink","shortUrl","starred","subscribed","url"} [boardFields='["name", "idOrganization"]']
 *    Board fields to include in response, can either be <code>"all"</code> or an array of field names.
 * @apiParam {number{0-1000}} [boardsLimit=10]
 *    Limit to impose on boards included in response.
 * @apiParam {String[]="all","badges","checkItemStates","closed","dateLastActivity","desc","descData","due","email","idAttachmentCover","idBoard","idChecklists","idLabels","idList","idMembers","idMembersVoted","idShort","labels","manualCoverAttachment","name","pos","shortLink","shortUrl","subscribed","url"} [cardFields='"all"']
 *    Card fields to include in response, can either be <code>"all"</code> or an array of field names.
 * @apiParam {number{0-1000}} [cardsLimit=10]
 *    Limit to impose on cards included in response.
 * @apiParam {number{0-1000}} [cardsPage=0]
 *    Page of data to return in response.
 * @apiParam {Boolean} [cardBoard=false]
 *    Indicates if the board associated with a card should be included in response.
 * @apiParam {Boolean} [cardList=false]
 *    Indicates if the list associated with a card should be included in response.
 * @apiParam {Boolean} [cardMembers=false]
 *    Indicates if members associated with a card should be included in response.
 * @apiParam {Boolean} [cardStickers=false]
 *    Indicates if stickers associated with a card should be included in response.
 * @apiParam {Boolean=true,false,"cover"} [attachments=false]
 *    If <code>true</code>, include all attachments, if <code>false</code>, include none, and if <code>"cover"</code>, include only card cover attachments.
 * @apiParam {String[]="all","billableMemberCount","desc","descData","displayName","idBoards","invitations","invited","logoHash","memberships","name","powerUps","prefs","premiumFeatures","products","url","website"} [organizationFields='["name", "displayName"]']
 *    Organization fields to include in the response, can either be <code>"all"</code> or an array of field names.
 * @apiParam {number{0-1000}} [organizationsLimit=10]
 *    Limit to impose on organizations included in response.
 * @apiParam {String[]="all","avatarHash","bio","bioData","confirmed","fullName","idPremOrgsAdmin","initials","memberType","products","status","url","username"} [memberFields='["avatarHash", "fullName", "initials", "username", "confirmed"]']
 *    Member fields to include in response, can either be <code>"all"</code> or an array of field names.
 * @apiParam {number{0-1000}} [membersLimit=10]
 *    Limit to impose on members included in response.
 * @apiParam {Boolean} [partial=false]
 *    Allow for partial matches in the search.
 * @apiExample {js} Example:
 trello.search().performSearch({ query: 'funstuff' });
 */

/**
 * @api {get} /search/members searchMembers
 * @apiVersion 1.0.0
 * @apiName searchMembers
 * @apiDescription Performs a search for the members associated with the
 *    specified query string and parameters.
 * @apiGroup search
 * @apiPermission read
 *
 * @apiParam {String{1...16384}} query
 *    Query string to search content for.
 * @apiParam {Number{1-20}} [limit=8]
 *    Limit amount of records returned.
 * @apiParam {String} [idBoard]
 *    Board ID to limit search to, can be an ID or <code>null</code>.
 * @apiParam {String} [idOrganizations]
 *    Organization ID to limit search to, can be an ID or <code>null</code>.
 * @apiParam {Boolean} [onlyOrgMembers=false]
 *    Limit results to members of the specified organization.
 * @apiExample {js} Example:
 trello.search().searchMembers({ query: 'bob' });
 */
