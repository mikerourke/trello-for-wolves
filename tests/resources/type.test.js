/* Internal dependencies */
import Trello from '../../src/index';
import Logger from '../../internals/testing/logger';

describe('TYP | Type Resource', function() {
  let trello;
  let logger;

  before(function(done) {
    trello = new Trello(auth);
    logger = new Logger();
    setTimeout(() => { done(); }, testDelay);
  });

  beforeEach(function() {
    logger.setTestName(this.currentTest.title);
  });

  after(function(done) {
    logger.writeResultsToFile('type')
      .then(() => done())
      .catch(error => done(error));
  });

  const logResponse = (response) => logger.processResponse(response);

  describe('TYP-G | Type GET requests', function() {
    it('TYP-G-01-T01 | gets the Type for an Organization', function (done) {
      if (!resources.org) {
        done(new Error('Organization not found.'))
      }
      const orgId = resources.org.id;
      trello.types().getType(orgId)
        .then(logResponse)
        .then((response) => {
          expect(response.data.type).to.equal('organization');
          done();
        })
        .catch(error => done(error));
    });

    it('TYP-G-01-T02 | gets the Type for a Member', function (done) {
      const memberId = process.env.TRELLO_MEMBER_ID || '';
      if (!memberId) {
        done(new Error('Member not found.'));
      }
      trello.types().getType(memberId)
        .then(logResponse)
        .then((response) => {
          expect(response.data.type).to.equal('member');
          done();
        })
        .catch(error => done(error));
    });
  });
});
