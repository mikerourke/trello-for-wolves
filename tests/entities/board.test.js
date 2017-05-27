/* Internal dependencies */
import Trello from '../../src/index';
import { auth } from '../helpers';

describe('Board class', () => {
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

  it('gets the tags for a board', (done) => {
    trelloApi.board(boardId).getTags()
      .then((result) => {
        const actualValue = result.data.length;
        const expectedValue = 1;
        expect(actualValue).to.equal(expectedValue);
        done();
      })
      .catch((error) => done());
  });

  it('gets myPrefs for a board', (done) => {
    trelloApi.board(boardId).getMyPrefs()
      .then((result) => {
        const actualValue = result.data;
        const expectedValue = [
          'showSidebar',
          'showSidebarMembers',
          'showSidebarBoardActions',
          'showSidebarActivity',
          'showListGuide',
          'idEmailList',
          'emailPosition',
        ];
        expect(actualValue).to.have.all.keys(expectedValue);
        done();
      })
      .catch((error) => done());
  });

  it('gets the plugin data for a board', (done) => {
    trelloApi.board(boardId).getPluginData()
      .then((result) => {
        const actualValue = result.data.length;
        const expectedValue = 1;
        expect(actualValue).to.equal(expectedValue);
        done();
      })
      .catch((error) => done());
  });

  it('updates a board', (done) => {
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

  it('updates myPrefs on a board', (done) => {
    trelloApi.board(boardId).updateMyPrefs('showSidebar', true)
      .then((result) => {
        const actualValue = result.data.length;
        const expectedValue = 1;
        expect(actualValue).to.equal(expectedValue);
        done();
      })
      .catch(error => done(error));
  });

  it('updates the closed status on a board', (done) => {
    trelloApi.board(boardId).updateClosedStatus(false)
      .should.be.fulfilled
      .notify(done)
  });

  it('updates the description on a board', (done) => {
    const description = `Test description - ${Date.now()}`;
    trelloApi.board(boardId).updateDescription(description)
      .then((result) => {
        const actualValue = result.data.desc;
        expect(actualValue).to.equal(description);
        done();
      })
      .catch(error => done(error));
  });

  it.only('creates a new board', (done) => {
    const boardName = 'Test Board 2';
    trelloApi.board().createBoard(boardName)
      .then((result) => {
        const actualValue = result.data.name;
        expect(actualValue).to.equal(boardName);
        done();
      })
      .catch(error => done(error));
  });
});
