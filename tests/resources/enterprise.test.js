import Trello from '../../src/index';
import Logger from '../../internals/testing/logger';

describe.skip('ENT | Enterprise Resource', function() {
  let trello;
  let logger;

  let enterpriseData = {};
  let enterpriseId = '';
  let memberId = '';
  let orgId = '';

  before(function() {
    trello = new Trello(config);
    logger = new Logger();
  });

  beforeEach(function() {
    logger.setTestName(this.currentTest.title);
  });

  after(function(done) {
    logger.writeResultsToFile('enterprise')
      .then(() => done())
      .catch(error => done(error));
  });

  const logResponse = response => logger.processResponse(response);

  describe('ENT-G | Enterprise GET requests', function() {
    before(function(done) {
      setTimeout(() => done(), testDelay);
    });

    it('ENT-G-01-T01 | gets a Enterprise', (done) => {
      trello.enterprises(enterpriseId).getEnterprise()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('ENT-G-01-T02 | gets a Enterprise with all arguments', function(done) {
      trello.enterprises(enterpriseId).getEnterprise({
        fields: 'all',
        members: 'all',
        memberFields: 'all',
        memberFilter: 'none',
        memberSortBy: 'none',
        memberSortOrder: 'ascending',
        memberStartIndex: 0,
        memberCount: 100,
        organizations: 'all',
        organizationFields: 'all',
        organizationPaidAccounts: false,
        organizationMemberships: 'normal',
      })
        .then(logResponse)
        .then((response) => {
          enterpriseData = response.data || {};
          assert.isDefined(response.data);
          done();
        })
        .catch(error => done(error));
    });

    it('ENT-G-02-T01 | gets the associated admins', function(done) {
      trello.enterprises(enterpriseId).getAdmins()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('ENT-G-03-T02 | gets the associated Signup URL', function(done) {
      trello.enterprises(enterpriseId).getSignupUrl()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('ENT-G-04-T01 | gets the associated Members', function(done) {
      trello.enterprises(enterpriseId).getMembers()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('ENT-G-05-T01 | gets the associated Member with the specified ID', function(done) {
      trello.enterprises(enterpriseId).getMember(memberId)
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('ENT-G-06-T01 | gets the transferrable status of the Organization with the specified ID', function(done) {
      trello.enterprises(enterpriseId).getIfOrgTransferrable(orgId)
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });
  });

  describe('ENT-U | Enterprise PUT requests', function() {
    before(function(done) {
      setTimeout(() => done(), testDelay);
    });

    it('ENT-U-01-T01 | deactivates a Member associated with the Enterprise', function(done) {
      trello.enterprises(enterpriseId).deactivateMember(memberId)
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('ENT-U-02-T01 | transfers to a different Organization', function(done) {
      trello.enterprises(enterpriseId).transferToOrganization(orgId)
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('ENT-U-03-T01 | adds a Member as admin', function(done) {
      trello.enterprises(enterpriseId).addMemberAsAdmin(memberId)
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });
  });

  describe('ENT-P | Enterprise POST requests', function() {
    before(function (done) {
      setTimeout(() => {
        done();
      }, testDelay);
    });

    it('ENT-P-01-T01 | adds a Token', function(done) {
      trello.enterprises(enterpriseId).addToken()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });
  });

  describe('ENT-P | Enterprise DELETE requests', function() {
    before(function (done) {
      setTimeout(() => {
        done();
      }, testDelay);
    });

    it('ENT-D-01-T01 | removes the association with an Organization', function(done) {
      trello.enterprises(enterpriseId).dissociateOrganization()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('ENT-D-02-T01 | removes a Member from admin', function(done) {
      trello.enterprises(enterpriseId).removeMemberFromAdmin()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });
  });
});
