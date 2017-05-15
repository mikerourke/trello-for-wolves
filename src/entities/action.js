/* @flow */

/* Internal dependencies */
import request from '../lib/request';

export default class Action {
  constructor(auth) {
    this.auth = auth;
  }

  getById(id, {
    display,
    entities,
    fields,
    member,
    member_fields,
    memberCreator,
    memberCreator_fields,
  }: {
    display?: boolean,
    entities?: boolean,
    fields?: string,
    member?: boolean,
    member_fields?: string,
    memberCreator?: boolean,
    memberCreator_fields?: string,
  }) {
    return new Promise((resolve, reject) => {
      request(this.auth, 'GET', `actions/${id}`, arguments[1])
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }
}
