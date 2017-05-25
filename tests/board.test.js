/* Internal dependencies */
import Trello from '../src/index';
import { auth } from './helpers';

describe('Board class', () => {
  it('gets a board', (done) => {
    const trelloApi = new Trello(auth);
    trelloApi.board.getBoard('DfZNMM5L')
      .then((result) => {
        expect(4).to.equal(4);
        done();
      })
      .catch(error => done(error));
  });

  it('gets a board with options', (done) => {
    const trelloApi = new Trello(auth);
    trelloApi.board.getBoard('DfZNMM5L', {
      actions: 'all',
    })
      .then((result) => {
        expect(4).to.equal(4);
        done();
      })
      .catch(error => done(error));
  });
});
