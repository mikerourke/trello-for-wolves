/* External dependencies */
import dirty from 'dirty';

/* Internal dependencies */
import Trello from '../../src/index';
import { auth, Logger } from '../helpers';

describe('ORG | Organization Resource', () => {
  let trello;
  let logger;
  let orgId;
  let db;

  before((done) => {
    trello = new Trello(auth);
    logger = new Logger();
    db = dirty('./ids.db').on('load', () => {
      setTimeout(() => { done(); }, 3000);
    });
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

  describe.only('ORG-SETUP | Organization Setup', () => {
    before((done) => {
      trello.members('me').organizations().getOrganizations()
        .then((response) => {
          const orgs = response.data;
          orgs.forEach((org) => {
            if (org.displayName === 'TFW Testing') {
              db.set('orgId', org.id);
            }
          });
          done();
        })
        .catch(error => done(error));
    });

    it('ORG-P-01-T01 | creates an Organization', (done) => {
      if (!db.get('orgId')) {
        trello.organizations().addOrganization({
          displayName: 'TFW Testing',
          desc: 'This is for testing',
        })
          .then((response) => {
            orgId = response.data.id;
            db.set('orgId', orgId);
            assert.isDefined(orgId);
            done();
          })
          .catch(error => done(error));
      } else {
        assert.isTrue(true);
        done();
      }
    });
  });

  describe('ORG-G | Organization GET requests', () => {

  });

  describe('ORG-U | Organization PUT requests', () => {

  });

  describe('ORG-P | Organization POST requests', () => {

  });

  describe('ORG-D | Organization DELETE requests', () => {

  });
});
