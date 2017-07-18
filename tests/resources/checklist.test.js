/* Internal dependencies */
import Trello from '../../src/index';
import Logger from '../../internals/testing/logger';

describe('CHK | Checklist Resource', function() {
  let trello;
  let logger;

  let checklistData = {};
  let checklistId = '';

  before(function() {
    trello = new Trello(config);
    logger = new Logger();
    if (resources.checklist) {
      checklistId = resources.checklist.id;
    } else {
      this.skip();
    }
  });

  beforeEach(function() {
    logger.setTestName(this.currentTest.title);
  });

  after(function(done) {
    logger.writeResultsToFile('checklist')
      .then(() => done())
      .catch(error => done(error));
  });

  const logResponse = (response) => logger.processResponse(response);

  describe('CHK-G | Checklist GET requests', function() {
    before(function(done) {
      setTimeout(() => { done(); }, testDelay);
    });

    it('CHK-G-01-T01 | gets a Checklist', (done) => {
      trello.checklists(checklistId).getChecklist()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('CHK-G-01-T02 | gets a Checklist with some arguments', function(done) {
      trello.checklists(checklistId).getChecklist({
        cards: 'all',
        fields: 'all',
      })
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('CHK-G-01-T03 | gets a Checklist with all arguments', function(done) {
      trello.checklists(checklistId).getChecklist({
        cards: 'all',
        cardFields: 'all',
        checkItems: 'all',
        checkItemFields: 'all',
        fields: 'all',
      })
        .then(logResponse)
        .then((response) => {
          checklistData = response.data || {};
          assert.isDefined(response.data);
          done();
        })
        .catch(error => done(error));
    });

    it('CHK-G-02-T01 | gets the value of the name field for the Checklist', function(done) {
      trello.checklists(checklistId).getFieldValue('name')
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('CHK-G-03-T01 | gets the associated Board', function(done) {
      trello.checklists(checklistId).board().getBoard()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('CHK-G-03-T02 | gets only the specified fields for the associated Board', function(done) {
      trello.checklists(checklistId).board().getBoard({
        fields: ['desc', 'name'],
      })
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('CHK-G-04-T01 | gets the value of the name field of the associated Board', function(done) {
      trello.checklists(checklistId).board().getFieldValue('name')
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('CHK-G-05-T01 | gets the associated Cards', function(done) {
      trello.checklists(checklistId).cards().getCards()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('CHK-G-05-T02 | gets only the specified fields for the associated Cards', function(done) {
      trello.checklists(checklistId).cards().getCards({
        fields: ['name', 'pos'],
      })
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('CHK-G-06-T01 | gets only the closed Cards with filter applied', function(done) {
      trello.checklists(checklistId).cards().getCards({
        filter: 'closed',
      })
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('CHK-G-07-T01 | gets the associated Check Items', function(done) {
      trello.checklists(checklistId).checkItems().getCheckItems()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('CHK-G-08-T01 | gets the associated Check Item with the specified Id', function(done) {
      if (!checklistData.checkItems) {
        done(new Error('Check Items not found.'));
      }
      const checkItemId = checklistData.checkItems[0].id;
      trello.checklists(checklistId).checkItems(checkItemId).getCheckItem()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });
  });

  describe('CHK-U | Checklist PUT requests', function() {
    before(function(done) {
      setTimeout(() => { done(); }, testDelay);
    });

    it('CHK-U-01-T01 | updates a Checklist', function(done) {
      trello.checklists(checklistId).updateChecklist({
        name: 'CHK-U-01-T01',
      })
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('CHK-U-02-T01 | updates the name of a Checklist', function(done) {
      trello.checklists(checklistId).updateName('CHK-U-02-T01')
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('CHK-U-03-T01 | updates the position of a Checklist', function(done) {
      trello.checklists(checklistId).updatePosition('top')
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });
  });
});
