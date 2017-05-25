/* Internal dependencies */
import Trello from '../src/index';
import { auth } from './helpers';

describe.skip('Trello class', () => {
  it('does stuff', (done) => {
    const trelloApi = new Trello(auth);
    trelloApi.board.getBoard('DfZNMM5L')
      .then((result) => {
        expect(4).to.equal(4);
        done();
      })
      .catch(error => done(error));
  });
});
