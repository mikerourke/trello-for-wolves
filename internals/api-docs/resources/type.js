/**
 * @api {path} /types type
 * @apiVersion 1.0.0
 * @apiName type
 * @apiGroup overview
 * @apiDescription
 *    The type endpoint allows you to determine if the specified ID, team, or
 *    username is a member or an organization.
 */

/**
 * @api {get} /types/:teamOrUserId getType
 * @apiVersion 1.0.0
 * @apiName getType
 * @apiDescription Gets the type associated with the team or user ID.
 * @apiGroup type
 * @apiPermission read
 *
 * @apiExample {js} Example:
 trello.types('exampleorg').getType();
 * @apiSuccessExample {json} Success Response:
 {
   "type": "organization",
   "id": "5196723aca13a0491800697a"
 }
 */
