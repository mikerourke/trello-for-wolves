/* Internal dependencies */
import Trello from '../../src/index';
import { Logger } from '../helpers';
const resources = require('./resources.json');

describe('ACT | Action Resource', function() {
  let trello;
  let logger;

  let actionId = '';
  let commentId = '';
  let orgActionId = '';

  const getIds = () => {
    const { tfwActions } = resources;
    actionId = tfwActions[0].id;
    tfwActions.forEach((action) => {
      if (action.type === 'commentCard' && !commentId) {
        commentId = action.id;
      }
      if (action.type === 'createOrganization' && !orgActionId) {
        orgActionId = action.id;
      }
    });
  };

  before(function() {
    trello = new Trello(auth);
    logger = new Logger();
    getIds();
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
    it('ACT-G-01-T01 | gets an Action', (done) => {
      trello.actions(actionId).getAction()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('ACT-G-01-T02 | gets an Action with some arguments', (done) => {
      trello.actions(actionId).getAction({
        display: true,
        fields: 'all',
      })
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('ACT-G-01-T03 | gets an Action with all arguments', (done) => {
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

    it('ACT-G-02-T01 | gets an Action field value for data', (done) => {
      trello.actions(actionId).getFieldValue('data')
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('ACT-G-02-T02 | gets an Action field value for date', (done) => {
      trello.actions(actionId).getFieldValue('date')
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('ACT-G-02-T03 | gets an Action field value for idMemberCreator', (done) => {
      trello.actions(actionId).getFieldValue('idMemberCreator')
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('ACT-G-02-T04 | gets an Action field value for type', (done) => {
      trello.actions(actionId).getFieldValue('type')
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('ACT-G-03-T01 | gets the associated Board', (done) => {
      trello.actions(actionId).board().getBoard()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('ACT-G-03-T02 | gets only the specified fields for the associated Board', (done) => {
      trello.actions(actionId).board().getBoard({
        fields: ['closed', 'dateLastActivity'],
      })
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('ACT-G-04-T01 | gets a field value for the associated Board', (done) => {
      trello.actions(actionId).board().getFieldValue('name')
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('ACT-G-05-T01 | gets the associated Card', (done) => {
      trello.actions(actionId).card().getCard()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('ACT-G-05-T02 | gets only the specified fields for the associated Card', (done) => {
      trello.actions(actionId).card().getCard({
        fields: ['badges', 'closed', 'desc'],
      })
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('ACT-G-06-T01 | gets a field value for the associated Card', (done) => {
      trello.actions(actionId).card().getFieldValue('name')
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('ACT-G-07-T01 | gets the Display data', (done) => {
      trello.actions(actionId).getDisplay()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('ACT-G-08-T01 | gets the Entities data', (done) => {
      trello.actions(actionId).getEntities()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('ACT-G-09-T01 | gets the associated List', (done) => {
      trello.actions(actionId).list().getList()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('ACT-G-09-T02 | gets only the specified fields for the associated List', (done) => {
      trello.actions(actionId).list().getList({
        fields: ['name', 'pos'],
      })
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('ACT-G-10-T01 | gets a field value for the associated List', (done) => {
      trello.actions(actionId).list().getFieldValue('name')
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('ACT-G-11-T01 | gets the associated Member', (done) => {
      trello.actions(actionId).member().getMember()
        .then(logResponse)
        .should.eventually.be.rejected
        .notify(done);
    });

    it('ACT-G-11-T01 | gets only the specified fields for the associated Member', (done) => {
      trello.actions(actionId).member().getMember({
        fields: ['email', 'fullName'],
      })
        .then(logResponse)
        .should.eventually.be.rejected
        .notify(done);
    });

    it('ACT-G-12-T01 | gets a field value for the associated Member', (done) => {
      trello.actions(actionId).member().getFieldValue('fullName')
        .then(logResponse)
        .should.eventually.be.rejected
        .notify(done);
    });

    it('ACT-G-13-T01 | gets the associated Member Creator', (done) => {
      trello.actions(actionId).memberCreator().getMember()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('ACT-G-13-T02 | gets only the specified fields for the associated Member Creator', (done) => {
      trello.actions(actionId).memberCreator().getMember({
        fields: ['avatarSource', 'bio', 'bioData', 'confirmed', 'idBoards'],
      })
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('ACT-G-14-T01 | gets a field value for the associated Member Creator', (done) => {
      trello.actions(actionId).memberCreator().getFieldValue('avatarHash')
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('ACT-G-15-T01 | gets the associated Organization', (done) => {
      trello.actions(orgActionId).organization().getOrganization()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('ACT-G-16-T01 | gets a field value for the associated Organization', (done) => {
      trello.actions(orgActionId).organization().getFieldValue('name')
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });
  });

  describe('ACT-U | Action PUT Requests', () => {
    const commentText = 'This is a test comment';

    it('ACT-U-01-T01 | updates an Action', (done) => {
      trello.actions(commentId).updateAction({
        text: commentText,
      })
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('ACT-U-02-T01 | updates the text for an Action', (done) => {
      trello.actions(commentId).updateText(commentText)
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });
  });
});
