/* Internal dependencies */
import Trello from '../../src/index.new';
import { auth, boardId } from '../helpers';

describe('Board Entity', () => {
  let trello;
  before(() => {
    trello = new Trello(auth);
  });

  describe.only('Board GET requests', () => {
    it('gets a board', (done) => {
      trello.board(boardId).getBoard()
        .should.eventually.have.property('data')
        .notify(done)
    });

    it('gets a board with queryArgs', (done) => {
      trello.board(boardId).getBoard({ actions: 'all' })
        .should.eventually.have.property('data')
        .notify(done)
    });

    it('gets a board field value', (done) => {
      trello.board(boardId).getFieldValue('name')
        .then((result) => {
          const actualValue = result.data._value;
          const expectedValue = 'Test Board';
          expect(actualValue).to.equal(expectedValue);
          done();
        })
        .catch(error => done(error));
    });

    it('gets the actions for a board', (done) => {
      trello.board(boardId).actions().getActions()
        .then((result) => {
          const actualValue = result.data;
          const expectedValue = 1;
          expect(actualValue).to.have.length.above(expectedValue);
          done();
        })
        .catch(error => done(error));
    });

    it('gets the stars for a board', (done) => {
      trello.board(boardId).getBoardStars()
        .then((result) => {
          const actualValue = result.data.length;
          const expectedValue = 1;
          expect(actualValue).to.equal(expectedValue);
          done();
        })
        .catch(error => done(error));
    });

    it('gets the cards for a board', (done) => {
      trello.board(boardId).cards().getCards()
        .then((result) => {
          const actualValue = result.data;
          const expectedValue = 1;
          expect(actualValue).to.have.length.above(expectedValue);
          done();
        })
        .catch(error => done(error));
    });

    it('gets the filtered cards for a board', (done) => {
      trello.board(boardId).cards().getCards({
        filter: 'closed',
      })
        .then((result) => {
          const actualValue = result.data;
          const expectedValue = 1;
          expect(actualValue).to.have.length.of.at.least(expectedValue);
          done();
        })
        .catch(error => done(error));
    });

    it('gets a cards for a board by ID', (done) => {
      trello.board(boardId).cards().getCards()
        .then((result) => {
          const actualValue = result.data;
          const expectedValue = 1;
          expect(actualValue).to.have.length.of.at.least(expectedValue);
          done();
        })
        .catch(error => done(error));
    });

    it('gets the tags for a board', (done) => {
      trello.board(boardId).getTags()
        .then((result) => {
          const actualValue = result.data.length;
          const expectedValue = 1;
          expect(actualValue).to.equal(expectedValue);
          done();
        })
        .catch((error) => done());
    });

    it('gets myPrefs for a board', (done) => {
      trello.board(boardId).getMyPrefs()
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
      trello.board(boardId).getPluginData()
        .then((result) => {
          const actualValue = result.data.length;
          const expectedValue = 1;
          expect(actualValue).to.equal(expectedValue);
          done();
        })
        .catch((error) => done());
    });
  });

  describe('Board PUT requests', () => {
    it('updates a board', (done) => {
      trello.board(boardId).updateBoard({
        prefs_selfJoin: true,
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
      trello.board(boardId).updateMyPref('showSidebar', true)
        .then((result) => {
          const actualValue = result.data.length;
          const expectedValue = 1;
          expect(actualValue).to.equal(expectedValue);
          done();
        })
        .catch(error => done(error));
    });

    it('updates the closed status on a board', (done) => {
      trello.board(boardId).updateClosedStatus(false)
        .should.be.fulfilled
        .notify(done)
    });

    it('updates the description on a board', (done) => {
      const description = `Test description - ${Date.now()}`;
      trello.board(boardId).updateDescription(description)
        .then((result) => {
          const actualValue = result.data.desc;
          expect(actualValue).to.equal(description);
          done();
        })
        .catch(error => done(error));
    });
  });

  describe('Board POST requests', () => {
    it('creates a new board', (done) => {
      const boardName = 'Test Board 2';
      trello.board().createBoard(boardName)
        .then((result) => {
          const actualValue = result.data.name;
          expect(actualValue).to.equal(boardName);
          done();
        })
        .catch(error => done(error));
    });
  });
});
