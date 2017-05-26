/* Internal dependencies */
import Trello from '../../src/index';
import { auth } from '../helpers';

describe.only('Board class', () => {
  const boardId = 'bJDPVV1A';
  let trelloApi;
  before(() => {
    trelloApi = new Trello(auth);
  });

  it('gets a board', (done) => {
    trelloApi.board(boardId).getBoard()
      .should.eventually.have.property('data')
      .notify(done)
  });

  it('gets a board with options', (done) => {
    trelloApi.board(boardId).getBoard({ actions: 'all' })
      .should.eventually.have.property('data')
      .notify(done)
  });

  it('gets a board field value', (done) => {
    trelloApi.board(boardId).getFieldValue('name')
      .then((result) => {
        const actualValue = result.data._value;
        const expectedValue = 'Test Board';
        expect(actualValue).to.equal(expectedValue);
        done();
      })
      .catch(error => done(error));
  });

  it('gets the stars for a board', (done) => {
    trelloApi.board(boardId).getStars()
      .then((result) => {
        const actualValue = result.data.length;
        const expectedValue = 1;
        expect(actualValue).to.equal(expectedValue);
        done();
      })
      .catch(error => done(error));
  });

  it.only('updates a board', (done) => {
    trelloApi.board(boardId).updateBoard({
      prefs: {
        selfJoin: true,
      },
    })
      .then((result) => {
        const actualValue = result.data.length;
        const expectedValue = 1;
        expect(actualValue).to.equal(expectedValue);
        done();
      })
      .catch(error => done(error));
  });
});
