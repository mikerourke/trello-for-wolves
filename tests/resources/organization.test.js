/* Internal dependencies */
import Trello from '../../src/index';
import Logger from '../logger';
const resources = require('./resources.json');

describe('ORG | Organization Resource', function() {
  const { org } = resources;

  let trello;
  let logger;

  let orgId = '';

  before(function() {
    trello = new Trello(auth);
    logger = new Logger();
    if (org) {
      orgId = org.id;
    } else {
      this.skip();
    }
  });

  beforeEach(function() {
    logger.setTestName(this.currentTest.title);
  });

  after(function(done) {
    logger.writeResultsToFile('organization')
      .then(() => done())
      .catch(error => done(error));
  });

  const logResponse = (response) => logger.processResponse(response);

  describe('ORG-G | Organization GET requests', function() {
    before(function(done) {
      setTimeout(() => { done(); }, 1000);
    });

    it('ORG-G-01-T01 | gets a Organization', function(done) {
      trello.organizations(orgId).getOrganization({
        actions: 'none',
        cards: 'all',
        members: 'all',
      })
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('ORG-G-01-T02 | gets a Organization with some arguments', function(done) {
      trello.organizations(orgId).getOrganization({
        actions: 'none',
        cards: 'all',
        members: 'all',
      })
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('ORG-G-01-T03 | gets a Organization with all arguments', function(done) {
      trello.organizations(orgId).getOrganization({
      })
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('ORG-G-02-T01 | gets the value of the name field for the Organization', function(done) {
      trello.organizations(orgId).getFieldValue('name')
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('ORG-G-03-T01 | gets the associated Actions', function(done) {
      trello.organizations(orgId).actions().getActions()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });
  });

  describe('ORG-U | Organization PUT requests', function() {
    before(function(done) {
      setTimeout(() => { done(); }, 1000);
    });
  });
});
