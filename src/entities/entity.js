/* @flow */

/* External dependencies */
import Promise from 'bluebird';

/* Internal dependencies */
import { buildEndpointString } from '../lib/string-builder';
import request from '../lib/request';
import entities from './index';

/* Types */
import type {
  Auth,
  EntityInstance,
  EntityName,
  HttpMethod,
} from '../types';

type RequestOptions = {
  path?: string,
  urlArgs?: Object,
};

/**
 * Base class for entities.
 */
export default class Entity {
  auth: Auth;
  endpoint: string;
  entity: EntityInstance;

  /**
   * Creates a new Entity instance.
   * @param {Auth} auth Auth object containing Trello API key and token.
   * @param {EntityName} entityName Name of the entity extending the class.
   * @param {string} entityId ID of the entity extending the class.
   * @param {EntityInstance} [parent] Parent entity associated with the entity
   *    extending the class.
   */
  constructor(
    auth: Auth,
    entityName: EntityName,
    entityId: string,
    parent?: ?EntityInstance,
  ) {
    this.auth = auth;
    this.endpoint = buildEndpointString(`${entityName}s`, entityId, parent);
    this.entity = {
      entityName,
      id: entityId,
    };
  }

  /**
   * Returns a resolved Promise with the results of the Trello API call.
   * @param {HttpMethod} httpMethod Method associated with the request.
   * @param {RequestOptions} options Options associated with the request.
   * @returns {Promise}
   */
  performRequest(
    httpMethod: HttpMethod,
    options?: RequestOptions = {},
  ) {
    const { path = '', urlArgs = {} } = options;
    let endpoint = this.endpoint;
    if (path) {
      endpoint = `${endpoint}/${path}`;
    }
    return Promise.resolve(request(this.auth, httpMethod, endpoint, urlArgs)
      .then(result => result)
      .catch(error => error));
  }

  actions() {
    return new entities.Action(this.auth, '', this.entity);
  }

  boards() {
    return new entities.Board(this.auth, '', this.entity);
  }

  cards() {
    return new entities.Card(this.auth, '', this.entity);
  }

  checklists() {
    //return new entities.Checklist(this.auth, '', this.entity);
  }

  labels() {
    //return new entities.Label(this.auth, '', this.entity);
  }

  lists() {
    //return new entities.List(this.auth, '', this.entity);
  }

  members() {
    //return new entities.Member(this.auth, '', this.entity);
  }

  organizations() {
    //return new entities.Organization(this.auth, '', this.entity);
  }
}
