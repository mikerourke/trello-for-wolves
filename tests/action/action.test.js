/* Internal dependencies */
import Trello from '../../src/index';
import { auth, memberIds } from '../helpers';
const apiData = require('./api-data.json');

describe('Action Resource', () => {
  let trello;
  const { actionId } = apiData;

  before(() => {
    trello = new Trello(auth);
  });

  describe('Action GET requests', () => {
    it('gets an action', (done) => {
      trello.actions(actionId).getAction()
        .then((result) => {
          const actualValue = JSON.stringify(result.data);
          const expectedValue = JSON.stringify(apiData.getResults);
          expect(actualValue).to.equal(expectedValue);
          done();
        })
        .catch(error => done(error));
    });

    it('gets an action with some arguments', (done) => {
      trello.actions(actionId).getAction({
        display: true,
        fields: 'all',
      })
        .then((result) => {
          let actualValue = result.data;
          actualValue.entities = [];
          const expectedValue = apiData.getWithArgsResults;
          expect(actualValue).to.contain.keys(expectedValue);
          done();
        })
        .catch(error => done(error));
    });

    it('gets an action with all arguments', (done) => {
      trello.actions(actionId).getAction({
        display: true,
        entities: true,
        fields: 'all',
        member: false,
        memberFields: 'all',
        memberCreator: true,
        memberCreatorFields: 'all',
      })
        .then((result) => {
          const actualValue = JSON.stringify(result.data);
          const expectedValue = JSON.stringify(apiData.getWithArgsResults);
          expect(actualValue).to.equal(expectedValue);
          done();
        })
        .catch(error => done(error));
    });

    it('gets an action field value', (done) => {
      trello.actions(actionId).getFieldValue('type')
        .then((result) => {
          const actualValue = result.data._value;
          const expectedValue = 'createCard';
          expect(actualValue).to.equal(expectedValue);
          done();
        })
        .catch(error => done(error));
    });

    it('gets the action display', (done) => {
      trello.actions(actionId).getDisplay()
        .then((result) => {
          const actualValue = JSON.stringify(result.data);
          const expectedValue = JSON.stringify(apiData.getDisplayResults);
          expect(actualValue).to.equal(expectedValue);
          done();
        })
        .catch(error => done(error));
    });

    it('gets the action entities', (done) => {
      trello.actions(actionId).getEntities()
        .then((result) => {
          const actualValue = result.data.length;
          const expectedValue = 5;
          expect(actualValue).to.equal(expectedValue);
          done();
        })
        .catch(error => done(error));
    });

    it('gets the associated board', (done) => {
      trello.actions(actionId).board().getBoard()
        .then((result) => {
          const actualValue = result.data.name;
          const expectedValue = 'Test Board';
          expect(actualValue).to.equal(expectedValue);
          done();
        })
        .catch(error => done(error));
    });

    it('gets a field value for the associated board', (done) => {
      trello.actions(actionId).board().getFieldValue('name')
        .then((result) => {
          const actualValue = result.data._value;
          const expectedValue = 'Test Board';
          expect(actualValue).to.equal(expectedValue);
          done();
        })
        .catch(error => done(error));
    });

    it('fails gracefully when attempting to get the incorrect association for an ID', (done) => {
      trello.actions(actionId).card().getCard()
        .then(result => done())
        .catch((error) => {
          expect(error.name).to.equal('ApiCallResponseError');
          done();
        });
    });

    it('gets the associated list', (done) => {
      trello.actions(actionId).list().getList()
        .then((result) => {
          const actualValue = result.data.name;
          const expectedValue = 'Backlog';
          expect(actualValue).to.equal(expectedValue);
          done();
        })
        .catch(error => done(error));
    });

    it('gets a field value for the associated list', (done) => {
      trello.actions(actionId).list().getFieldValue('name')
        .then((result) => {
          const actualValue = result.data._value;
          const expectedValue = 'Backlog';
          expect(actualValue).to.equal(expectedValue);
          done();
        })
        .catch(error => done(error));
    });

    it('gets the associated card', (done) => {
      trello.actions(actionId).card().getCard()
        .then((result) => {
          const actualValue = result.data.name;
          const expectedValue = 'Test Card 1';
          expect(actualValue).to.equal(expectedValue);
          done();
        })
        .catch(error => done(error));
    });

    it('gets a field value for the associated card', (done) => {
      trello.actions(actionId).card().getFieldValue('name')
        .then((result) => {
          const actualValue = result.data._value;
          const expectedValue = 'Test Card 1';
          expect(actualValue).to.equal(expectedValue);
          done();
        })
        .catch(error => done(error));
    });

    it('gets the associated member', (done) => {
      trello.actions(actionId).member().getMember()
        .should.eventually.be.rejected
        .notify(done);
    });

    it('gets a field value for the associated member', (done) => {
      trello.actions(actionId).member().getFieldValue('fullName')
        .should.eventually.be.rejected
        .notify(done);
    });

    it('gets the associated member creator', (done) => {
      trello.actions(actionId).memberCreator().getMember()
        .then((result) => {
          const actualValue = result.data.id;
          const expectedValue = memberIds.forMemberCreator;
          expect(actualValue).to.equal(expectedValue);
          done();
        })
        .catch(error => done(error));
    });

    it('gets the associated member creator with some arguments', (done) => {
      trello.actions(actionId).memberCreator().getMember({
        fields: ['avatarSource', 'bio', 'bioData', 'confirmed', 'idBoards'],
      })
        .then((result) => {
          const actualValue = result.data.idBoards;
          const expectedValue = 3;
          expect(actualValue).to.have.length.above(expectedValue);
          done();
        })
        .catch(error => done(error));
    });

    it('gets a field value for the associated member creator', (done) => {
      trello.actions(actionId).memberCreator().getFieldValue('avatarHash')
        .then((result) => {
          const actualValue = result.data._value;
          const expectedValue = memberIds.forAvatarHash;
          expect(actualValue).to.equal(expectedValue);
          done();
        })
        .catch(error => done(error));
    });

    // TODO: Find board with an organization to get actions for.
    it('gets the associated organization', (done) => {
      trello.actions(actionId).organization().getOrganization()
        .should.eventually.be.rejected
        .notify(done);
    });

    // TODO: Find board with an organization to get actions for.
    it('gets a field value for the associated organization', (done) => {
      trello.actions(actionId).organization().getFieldValue('logoHash')
        .should.eventually.be.rejected
        .notify(done);
    });
  });
});
