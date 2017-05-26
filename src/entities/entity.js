/* @flow */

/* External dependencies */
import Promise, { resolve } from 'bluebird';

/* Internal dependencies */
import { buildEndpointString } from '../lib/string-builder';
import request from '../lib/request';
import {
  Action,
  Batch,
  Board,
  Card,
  Checklist,
  Label,
  List,
  Member,
  Notification,
  Organization,
  Search,
  Token,
  Type,
  Webhook,
} from './index';

/* Types */
import type { Auth, EntityInstance, HttpMethod } from '../types';

type RequestOptions = {
  path?: string,
  urlArgs?: Object,
};

export default class Entity {
  auth: Auth;
  endpoint: string;
  entity: EntityInstance;

  constructor(
    auth: Auth,
    entityName: string,
    entityId: string,
    parent?: ?EntityInstance
  ) {
    this.auth = auth;
    this.endpoint = buildEndpointString(`${entityName}s`, entityId, parent);
    this.entity = {
      id: entityId,
      entityName,
    };
  }

  performRequest(
    httpMethod: HttpMethod,
    options?: RequestOptions = {},
  ) {
    const { path = '', urlArgs = {} } = options;
    let endpoint = this.endpoint;
    if (path) {
      endpoint = `${endpoint}/${path}`;
    }
    return resolve(request(this.auth, httpMethod, endpoint, urlArgs));
  }

  actions() {
    return new Action(this.auth, '', this.entity);
  }

  cards() {
    //return new Card(this.auth, '', this.entity);
  }

  checklists() {
    //return new Checklist(this.auth, '', this.entity);
  }

  labels() {
    //return new Label(this.auth, '', this.entity);
  }

  lists() {
    //return new List(this.auth, '', this.entity);
  }

  members() {
    //return new Member(this.auth, '', this.entity);
  }

  organizations() {
    //return new Organization(this.auth, '', this.entity);
  }
}
