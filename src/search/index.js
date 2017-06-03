/* @flow */

/* Internal dependencies */
import BaseResource from '../base-resource';

/* Types */
import type {
  ArgumentGroup,
  Auth,
  BoardField,
  CardField,
  MemberField,
  OrganizationField,
} from '../types';

/**
 * @api {path} /search search
 * @apiVersion 1.0.0
 * @apiName search
 * @apiGroup overview
 * @apiDescription
 * The Search API allows you to perform the same search that is available
 * within Trello at the top of the window. This means that you can use
 * modifiers such as <strong>edited:day</strong> within the query to modify the
 * results you get back. For more information on modifiers, click "Learn More"
 * within the Trello search popup.
 * <br><br>
 * Certain types of modifiers will restrict the types of objects that are
 * returned with your search. One example of this is the <strong>edited</strong>
 * modifier which will meant that your search will only contain
 * <strong>Cards</strong>.
 */
export default class Search extends BaseResource {
  constructor(auth: Auth) {
    super(auth, 'search');
  }

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
   trello.actions('aCtIoNId').getAction({...});
   */
  performSearch(
    queryArgs: {
      query: string,
      idBoards?: 'mine' | string,
      idOrganizations?: string,
      idCards?: string,
      modelTypes?: string,
      boardFields?: ArgumentGroup<BoardField>,
      boardsLimit?: number,
      cardFields?: ArgumentGroup<CardField>,
      cardsLimit?: number,
      cardsPage?: number,
      cardBoard?: boolean,
      cardList?: boolean,
      cardMembers?: boolean,
      cardStickers?: boolean,
      cardAttachments?: boolean,
      organizationFields?: ArgumentGroup<OrganizationField>,
      organizationsLimit?: number,
      memberFields?: ArgumentGroup<MemberField>,
      membersLimit?: number,
      partial?: boolean,
    },
  ): Promise<*> {
    return this.httpGet('/', queryArgs);
  }

  searchMembers(
    queryArgs: {
      query: string,
      limit?: number,
      idBoard?: string,
      idOrganization?: string,
      onlyOrgMembers?: boolean,
    },
  ): Promise<*> {
    return this.httpGet('/members', queryArgs);
  }
}
