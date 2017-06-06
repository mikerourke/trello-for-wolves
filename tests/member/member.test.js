/* Internal dependencies */
import Trello from '../../src/index';
import { auth } from '../helpers';

describe('Board Resource', () => {
  let trello;
  before(() => {
    trello = new Trello(auth);
  });
});
