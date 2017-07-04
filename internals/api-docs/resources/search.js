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
 * @apiParam {String{1...16384}} query Query string to search content for.
 * @apiParam {Number{1-20}} [limit=8] Limit amount of records returned.
 * @apiParam {String} [idBoard] Board ID to limit search to, can be an ID or
 *    <code>null</code>.
 * @apiParam {String} [idOrganizations] Organization ID to limit search to,
 *    can be an ID or <code>null</code>.
 * @apiParam {Boolean} [onlyOrgMembers=false] Limit results to members of the
 *    specified Organization.
 * @apiExample {js} Example:
 trello.search().searchMembers({ query: 'bob' });
 */
