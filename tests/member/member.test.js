/* Internal dependencies */
import Trello from '../../src/index';
import { auth, boardId } from '../helpers';

describe('Board Resource', () => {
  let trello;
  before(() => {
    trello = new Trello(auth);
  });
});
