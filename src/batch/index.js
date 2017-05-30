/* @flow */

/* External dependencies */
import axios from 'axios';
import Promise from 'bluebird';

/* Internal dependencies */
import BaseEntity from '../base-entity';

/* Types */
import type { Auth } from '../types';

export default class Batch extends BaseEntity {
  constructor(auth: Auth) {
    super(auth, 'batch');
  }

  makeRequests(urls: Array<string>): Promise<*> {
    return this.httpGet('/', { urls });
  }
}
