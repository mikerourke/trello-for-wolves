/* Internal dependencies */
import Trello from '../../src/index';
import Logger from '../../internals/testing/logger';

describe('ACT | Action Resource', function() {
  const BOARD_NAME = 'ACT-SETUP-BOARD';
  const ORG_NAME = 'ACT-SETUP-ORG';

  let trello;
  let logger;
  let commentActionId = '';
  let cardActionId = '';
  let orgActionId = '';

  /**
   * Gets the Ids of Actions required to perform tests.
   */
  const getIds = () => new Promise((resolve, reject) => {
    trello.members('me').actions().getActions()
      .then((response) => {
        const { data: actions } = response;
        actions.forEach((action) => {
          const { id, type } = action;
          if (type === 'commentCard' && !commentActionId) {
            commentActionId = id;
          }
          if (type === 'createCard' && !cardActionId) {
            cardActionId = id;
          }
          if (type === 'unconfirmedOrganizationInvitation' && !orgActionId) {
            orgActionId = id;
          }
        });
        resolve();
      })
      .catch((error) => { reject(new Error(`Error getting Ids: ${error}`)); });
  });

  before(function() {
    trello = new Trello(config);
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

  describe('ACT-SETUP | Action Setup', function() {
    it('ACT-SETUP-T01 | creates the entities required to run Action tests', async () => {
      const { data: newOrg } = await trello.organizations().addOrganization({
        displayName: ORG_NAME,
      });

      await trello.organizations(newOrg.id).members().addMember({
        email: 'user@test.com',
        fullName: 'Test User',
        type: 'normal',
      });

      const { data: newBoard } = await trello.boards().addBoard({
        name: BOARD_NAME,
        defaultLists: false,
        idOrganization: newOrg.id,
      });

      const { data: newList } = await trello.boards(newBoard.id).lists().addList({
        name: 'ACT-SETUP-LIST',
        idBoard: newBoard.id,
      });

      const { data: newCard } = await trello.lists(newList.id).cards().addCard({
        name: 'ACT-SETUP-CARD',
        desc: 'This is a test card.',
      });
      const { data: newComment } = await trello
        .cards(newCard.id)
        .comments()
        .addComment('Test comment');
      assert.isDefined(newComment);
    });
  });

  describe('ACT-G | Action GET Requests', function() {
    before(function(done) {
      getIds()
        .then(() => {
          setTimeout(() => done(), testDelay);
        })
        .catch(error => done(new Error(error)));
    });

    it('ACT-G-01-T01 | gets an Action', function(done) {
      if (!cardActionId) done(new Error('Card Action Id not found.'));

      trello.actions(cardActionId).getAction()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('ACT-G-01-T02 | gets an Action with some arguments', function(done) {
      trello.actions(cardActionId).getAction({
        display: true,
        fields: 'all',
      })
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('ACT-G-01-T03 | gets an Action with all arguments', function(done) {
      trello.actions(cardActionId).getAction({
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

    it('ACT-G-02-T01 | gets an Action field value for data', function(done) {
      trello.actions(cardActionId).getFieldValue('data')
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('ACT-G-02-T02 | gets an Action field value for date', function(done) {
      trello.actions(cardActionId).getFieldValue('date')
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('ACT-G-02-T03 | gets an Action field value for idMemberCreator', function(done) {
      trello.actions(cardActionId).getFieldValue('idMemberCreator')
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('ACT-G-02-T04 | gets an Action field value for type', function(done) {
      trello.actions(cardActionId).getFieldValue('type')
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('ACT-G-03-T01 | gets the associated Board', function(done) {
      trello.actions(cardActionId).board().getBoard()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('ACT-G-03-T02 | gets only the specified fields for the associated Board', function(done) {
      trello.actions(cardActionId).board().getBoard({
        fields: ['closed', 'dateLastActivity'],
      })
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('ACT-G-04-T01 | gets a field value for the associated Board', function(done) {
      trello.actions(cardActionId).board().getFieldValue('name')
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('ACT-G-05-T01 | gets the associated Card', function(done) {
      trello.actions(cardActionId).card().getCard()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('ACT-G-05-T02 | gets only the specified fields for the associated Card', function(done) {
      trello.actions(cardActionId).card().getCard({
        fields: ['badges', 'closed', 'desc'],
      })
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('ACT-G-06-T01 | gets a field value for the associated Card', function(done) {
      trello.actions(cardActionId).card().getFieldValue('name')
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('ACT-G-07-T01 | gets the Display data', function(done) {
      trello.actions(cardActionId).getDisplay()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('ACT-G-08-T01 | gets the Entities data', function(done) {
      trello.actions(cardActionId).getEntities()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('ACT-G-09-T01 | gets the associated List', function(done) {
      trello.actions(cardActionId).list().getList()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('ACT-G-09-T02 | gets only the specified fields for the associated List', function(done) {
      trello.actions(cardActionId).list().getList({
        fields: ['name', 'pos'],
      })
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('ACT-G-10-T01 | gets a field value for the associated List', function(done) {
      trello.actions(cardActionId).list().getFieldValue('name')
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('ACT-G-11-T01 | gets the associated Member', function(done) {
      trello.actions(cardActionId).member().getMember()
        .then(logResponse)
        .should.eventually.be.rejected
        .notify(done);
    });

    it('ACT-G-11-T01 | gets only the specified fields for the associated Member', function(done) {
      trello.actions(orgActionId).member().getMember({
        fields: ['email', 'fullName'],
      })
        .then(logResponse)
        .should.eventually.be.rejected
        .notify(done);
    });

    it('ACT-G-12-T01 | gets a field value for the associated Member', function(done) {
      trello.actions(orgActionId).member().getFieldValue('fullName')
        .then(logResponse)
        .should.eventually.be.rejected
        .notify(done);
    });

    it('ACT-G-13-T01 | gets the associated Member Creator', function(done) {
      trello.actions(cardActionId).memberCreator().getMember()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('ACT-G-13-T02 | gets only the specified fields for the associated Member Creator', function(done) {
      trello.actions(cardActionId).memberCreator().getMember({
        fields: ['avatarSource', 'bio', 'bioData', 'confirmed', 'idBoards'],
      })
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('ACT-G-14-T01 | gets a field value for the associated Member Creator', function(done) {
      trello.actions(cardActionId).memberCreator().getFieldValue('avatarHash')
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('ACT-G-15-T01 | gets the associated Organization', function(done) {
      trello.actions(orgActionId).organization().getOrganization()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('ACT-G-16-T01 | gets a field value for the associated Organization', function(done) {
      trello.actions(orgActionId).organization().getFieldValue('name')
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });
  });

  describe('ACT-U | Action PUT Requests', function() {
    const commentText = 'This is a test comment';

    before(function(done) {
      setTimeout(() => done(), testDelay);
    });

    it('ACT-U-01-T01 | updates an Action', function(done) {
      trello.actions(commentActionId).updateAction({
        text: commentText,
      })
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('ACT-U-02-T01 | updates the text for an Action', function(done) {
      trello.actions(commentActionId).updateText(commentText)
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });
  });

  describe('ACT-D | Action DELETE Requests', function() {
    before(function(done) {
      setTimeout(() => done(), testDelay);
    });

    it('ACT-D-01-T01 | deletes an Action', function(done) {
      trello.actions(commentActionId).deleteAction()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });
  });

  describe('ACT-TEARDOWN | Action Teardown Requests', function() {
    before(function(done) {
      setTimeout(() => done(), 5000);
    });

    it('ACT-TEARDOWN-T01 | closes the board', async () => {
      const { data: myBoards } = await trello.members('me').boards().getBoards();
      const boardToClose = myBoards.find(myBoard => (myBoard.name === BOARD_NAME));
      if (!boardToClose) throw new Error('Board not found');

      const { data } = await trello.boards(boardToClose.id).updateClosedStatus(true)
      assert.isDefined(data);
    });

    it('ACT-TEARDOWN-T02 | deletes the organization', async () => {
      const { data: myOrgs } = await trello.members('me').organizations().getOrganizations();
      const orgToDelete = myOrgs.find(myOrg => (myOrg.displayName === ORG_NAME));
      if (!orgToDelete) throw new Error('Organization not found');

      const { data } = await trello.organizations(orgToDelete.id).deleteOrganization()
      assert.isDefined(data);
    });
  });
});
