/* Internal dependencies */
import Trello from '../../src/index';
import { auth, resourceIds, Logger } from '../helpers';

describe('ACT | Action Resource', function() {
  const { actionId, commentId } = resourceIds;
  let trello;
  let logger;

  before(function() {
    trello = new Trello(auth);
    logger = new Logger();
  });

  beforeEach(function() {
    logger.setTestName(this.currentTest.title);
  });

  after(function(done) {
    logger.writeResultsToFile('action')
      .then(() => done())
      .catch(error => done(error));
  });

  const logResponse = (response) => logger.processResponse(response);

  describe('ACT-G | Action GET Requests', () => {
    it('ACT-G-01-T01 | gets an action', (done) => {
      trello.actions(actionId).getAction()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('ACT-G-01-T02 | gets an action with some arguments', (done) => {
      trello.actions(actionId).getAction({
        display: true,
        fields: 'all',
      })
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('ACT-G-01-T03 | gets an action with all arguments', (done) => {
      trello.actions(actionId).getAction({
        display: true,
        entities: true,
        fields: 'all',
        member: false,
        memberFields: 'all',
        memberCreator: true,
        memberCreatorFields: 'all',
      })
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('ACT-G-02-T01 | gets an action field value for data', (done) => {
      trello.actions(actionId).getFieldValue('data')
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('ACT-G-02-T02 | gets an action field value for date', (done) => {
      trello.actions(actionId).getFieldValue('date')
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('ACT-G-02-T03 | gets an action field value for idMemberCreator', (done) => {
      trello.actions(actionId).getFieldValue('idMemberCreator')
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('ACT-G-02-T04 | gets an action field value for type', (done) => {
      trello.actions(actionId).getFieldValue('type')
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('ACT-G-03-T01 | gets the associated board', (done) => {
      trello.actions(actionId).board().getBoard()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('ACT-G-03-T02 | gets only the specified fields for the associated board', (done) => {
      trello.actions(actionId).board().getBoard({
        fields: ['closed', 'dateLastActivity'],
      })
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('ACT-G-04-T01 | gets a field value for the associated board', (done) => {
      trello.actions(actionId).board().getFieldValue('name')
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('ACT-G-05-T01 | gets the associated card', (done) => {
      trello.actions(actionId).card().getCard()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('ACT-G-05-T02 | gets only the specified fields for the associated card', (done) => {
      trello.actions(actionId).card().getCard({
        fields: ['badges', 'closed', 'desc'],
      })
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('ACT-G-06-T01 | gets a field value for the associated card', (done) => {
      trello.actions(actionId).card().getFieldValue('name')
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('ACT-G-07-T01 | gets the display data', (done) => {
      trello.actions(actionId).getDisplay()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('ACT-G-08-T01 | gets the entities data', (done) => {
      trello.actions(actionId).getEntities()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('ACT-G-09-T01 | gets the associated list', (done) => {
      trello.actions(actionId).list().getList()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('ACT-G-09-T02 | gets only the specified fields for the associated list', (done) => {
      trello.actions(actionId).list().getList({
        fields: ['name', 'pos'],
      })
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('ACT-G-10-T01 | gets a field value for the associated list', (done) => {
      trello.actions(actionId).list().getFieldValue('name')
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('ACT-G-11-T01 | gets the associated member', (done) => {
      trello.actions(actionId).member().getMember()
        .then(logResponse)
        .should.eventually.be.rejected
        .notify(done);
    });

    it('ACT-G-11-T01 | gets only the specified fields for the associated member', (done) => {
      trello.actions(actionId).member().getMember({
        fields: ['email', 'fullName'],
      })
        .then(logResponse)
        .should.eventually.be.rejected
        .notify(done);
    });

    it('ACT-G-12-T01 | gets a field value for the associated member', (done) => {
      trello.actions(actionId).member().getFieldValue('fullName')
        .then(logResponse)
        .should.eventually.be.rejected
        .notify(done);
    });

    it('ACT-G-13-T01 | gets the associated member creator', (done) => {
      trello.actions(actionId).memberCreator().getMember()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('ACT-G-13-T02 | gets only the specified fields for the associated member creator', (done) => {
      trello.actions(actionId).memberCreator().getMember({
        fields: ['avatarSource', 'bio', 'bioData', 'confirmed', 'idBoards'],
      })
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('ACT-G-14-T01 | gets a field value for the associated member creator', (done) => {
      trello.actions(actionId).memberCreator().getFieldValue('avatarHash')
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    // TODO: Find board with an organization to get actions for.
    it('ACT-G-15-T01 | gets the associated organization', (done) => {
      trello.actions(actionId).organization().getOrganization()
        .then(logResponse)
        .should.eventually.be.rejected
        .notify(done);
    });

    // TODO: Find board with an organization to get actions for.
    it('ACT-G-16-T01 | gets a field value for the associated organization', (done) => {
      trello.actions(actionId).organization().getFieldValue('logoHash')
        .then(logResponse)
        .should.eventually.be.rejected
        .notify(done);
    });
  });

  describe('ACT-U | Action PUT Requests', () => {
    it('ACT-U-01-T01 | updates an action', (done) => {
      trello.actions(commentId).updateAction({
        text: 'This is updated text.',
      })
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('ACT-U-02-T01 | updates the text for an action', (done) => {
      trello.actions(commentId).updateText('This is more updated text.')
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });
  });
});
