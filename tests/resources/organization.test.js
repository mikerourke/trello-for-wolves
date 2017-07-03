/* Internal dependencies */
import Trello from '../../src/index';
import Logger from '../../internals/testing/logger';

describe('ORG | Organization Resource', function() {
  let trello;
  let logger;

  let orgData = {};
  let orgId = '';
  let testMember = {};

  before(function() {
    trello = new Trello(auth);
    logger = new Logger();
    if (resources.org) {
      orgId = resources.org.id;
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
      setTimeout(() => { done(); }, testDelay);
    });

    it('ORG-G-01-T01 | gets an Organization', function(done) {
      trello.organizations(orgId).getOrganization()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('ORG-G-01-T02 | gets an Organization with some arguments', function(done) {
      trello.organizations(orgId).getOrganization({
        actions: 'none',
        members: 'all',
        memberFields: ['fullName', 'username'],
      })
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('ORG-G-01-T03 | gets an Organization with all arguments', function(done) {
      trello.organizations(orgId).getOrganization({
        actions: 'createOrganization',
        actionsEntities: true,
        actionsDisplay: true,
        actionsLimit: 20,
        actionFields: ['date', 'type'],
        memberships: 'all',
        membershipsMember: true,
        membershipsMemberFields: ['fullName', 'username'],
        members: 'all',
        memberFields: 'all',
        memberActivity: false,
        membersInvited: 'all',
        membersInvitedFields: ['fullName', 'username'],
        pluginData: true,
        boards: 'all',
        boardFields: 'all',
        boardActions: 'none',
        boardActionsEntities: true,
        boardActionsDisplay: true,
        boardActionsFormat: 'minimal',
        boardActionsSince: null,
        boardActionsLimit: 20,
        boardActionFields: ['date', 'type'],
        boardLists: 'all',
        boardPluginData: false,
        paidAccount: false,
        fields: 'all',
      })
        .then(logResponse)
        .then((response) => {
          const { data } = response;
          orgData = data || {};
          testMember = data.members.find(member => member.id === resources.member.id);
          assert.isDefined(data);
          done();
        })
        .catch(error => done(error));
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

    it('ORG-G-04-T01 | gets the associated Boards', function(done) {
      trello.organizations(orgId).boards().getBoards()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('ORG-G-04-T02 | gets the specified fields for the associated Boards', function(done) {
      trello.organizations(orgId).boards().getBoards({
        fields: ['name', 'pos'],
      })
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('ORG-G-05-T01 | gets only the open Boards with filter applied', function(done) {
      trello.organizations(orgId).boards().getBoardsFilteredBy('open')
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    /**
     * @skip ORG-G-09
     * @reason Business Class account required
     */
    it.skip('ORG-G-06-T01 | gets the associated Deltas', function(done) {
      trello.organizations(orgId).getDeltas({
        tags: 'tag?',
        ixLastUpdate: 1,
      })
        .then(logResponse)
        .should.eventually.be.rejected
        .notify(done);
    });

    it('ORG-G-07-T01 | gets the associated Members', function(done) {
      trello.organizations(orgId).members().getMembers()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('ORG-G-07-T02 | gets the specified fields for the associated Members', function(done) {
      trello.organizations(orgId).members().getMembers({
        fields: ['fullName', 'initials'],
      })
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('ORG-G-08-T01 | gets only the normal Members with filter applied', function(done) {
      trello.organizations(orgId).members().getMembersFilteredBy('normal')
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('ORG-G-09-T01 | gets the associated Cards for the specified Member', function(done) {
      // Get the Cards for me, not the test member.
      const memberId = orgData.members[0].id;
      if (!memberId) {
        done(new Error('Member Id not found.'));
      }
      trello.organizations(orgId).members(memberId).cards().getCards()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('ORG-G-10-T01 | gets the associated Members Invited', function(done) {
      trello.organizations(orgId).membersInvited().getMembers()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('ORG-G-10-T02 | gets the specified fields for the associated Members Invited', function(done) {
      trello.organizations(orgId).membersInvited().getMembers({
        fields: ['email', 'fullName', 'username'],
      })
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('ORG-G-11-T01 | gets the value of the fullName field for the associated Members Invited', function(done) {
      trello.organizations(orgId).membersInvited().getFieldValue('fullName')
        .then(logResponse)
        .should.eventually.be.rejected
        .notify(done);
    });

    it('ORG-G-12-T01 | gets the associated Memberships', function(done) {
      trello.organizations(orgId).memberships().getMemberships({
        filter: 'me',
      })
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('ORG-G-12-T02 | gets only the specified Member fields for the associated Memberships', function(done) {
      trello.organizations(orgId).memberships().getMemberships({
        memberFields: ['status', 'username'],
      })
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('ORG-G-13-T01 | gets the associated Membership with the specified Id', function(done) {
      const membershipId = orgData.memberships[0].id;
      if (!membershipId) {
        done(new Error('Membership Id not found.'));
      }
      trello.organizations(orgId).memberships(membershipId).getMembership()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('ORG-G-14-T01 | gets the associated Plugin Data', function(done) {
      trello.organizations(orgId).getPluginData()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    /**
     * @skip ORG-G-15
     * @reason Business Class account required
     */
    it.skip('ORG-G-15-T01 | gets the associated Tags', function(done) {
      trello.organizations(orgId).getTags()
        .then(logResponse)
        .should.eventually.be.rejected
        .notify(done);
    });
  });

  describe('ORG-U | Organization PUT requests', function() {
    before(function(done) {
      setTimeout(() => { done(); }, testDelay);
    });

    it('ORG-U-01-T01 | updates an Organization', function(done) {
      trello.organizations(orgId).updateOrganization({
        displayName: 'ORG-U-01-T01',
        desc: 'This is a test organization.'
      })
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('ORG-U-02-T01 | updates the description', function(done) {
      trello.organizations(orgId).updateDescription('ORG-U-02-T01')
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('ORG-U-03-T01 | updates the display name', function(done) {
      trello.organizations(orgId).updateDisplayName('ORG-U-03-T01')
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    /**
     * ORG-U-04-T01 | adds an associated Member is in the ORG-P portion of the Setup tests.
     */

    it('ORG-U-05-T01 | updates the type for an associated Member', function(done) {
      if (!testMember) {
        done(new Error('Member not found.'))
      }
      const memberId = testMember.id;
      trello.organizations(orgId).members(memberId).updateMemberType('normal')
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('ORG-U-06-T01 | updates the deactivated status of an associated Member', function(done) {
      const { id, username } = testMember;
      if (username === process.env.TRELLO_MEMBER_USERNAME.toString()) {
        done(new Error('Cannot change deactivated status of administrator.'));
      }
      trello.organizations(orgId).members(id).updateDeactivatedStatus(false)
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('ORG-U-07-T01 | updates the associated Membership with the specified Id', function(done) {
      const membership = orgData.memberships[0];
      if (!membership) {
        done(new Error('Membership not found.'));
      }
      trello.organizations(orgId).memberships(membership.id).updateMembership({
        type: membership.memberType,
      })
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('ORG-U-08-T01 | updates the name of the Organization', function(done) {
      if (!orgData.name) {
        done(new Error('Organization name not found.'));
      }
      const orgName = orgData.name;
      trello.organizations(orgId).updateName(orgName)
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    /**
     * @skip ORG-U-09
     * @reason Requires googleApps Permission
     */
    it.skip('ORG-U-09-T01 | updates the associated domain preference', function(done) {
      trello.organizations(orgId).prefs().updateAssociatedDomain('')
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    /**
     * @skip ORG-U-10
     * @reason Requires restrictVis Permission
     */
    it.skip('ORG-U-10-T01 | updates the board visibility preference for org', function(done) {
      trello.organizations(orgId).prefs().updateBoardVisibilityRestriction('org', 'org')
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    /**
     * @skip ORG-U-11
     * @reason Requires restrictVis Permission
     */
    it.skip('ORG-U-11-T01 | updates the board visibility preference for private', function(done) {
      trello.organizations(orgId).prefs().updateBoardVisibilityRestriction('private', 'admin')
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    /**
     * @skip ORG-U-12
     * @reason Requires restrictVis Permission
     */
    it.skip('ORG-U-12-T01 | updates the board visibility preference for public', function(done) {
      trello.organizations(orgId).prefs().updateBoardVisibilityRestriction('public', 'admin')
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    /**
     * @skip ORG-U-13
     * @reason Requires disableExternalMembers Permission
     */
    it.skip('ORG-U-13-T01 | updates the external members disabled preference', function(done) {
      trello.organizations(orgId).prefs().updateExternalMembersDisabled(true)
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    /**
     * @skip ORG-U-14
     * @reason Requires googleApps Permission
     */
    it.skip('ORG-U-14-T01 | updates the Google Apps version preference', function(done) {
      trello.organizations(orgId).prefs().updateGoogleAppsVersion(true)
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    /**
     * @skip ORG-U-15
     * @reason Sends Email
     */
    it.skip('ORG-U-15-T01 | updates the org invite restriction preference', function(done) {
      trello.organizations(orgId).prefs().updateOrgInviteRestrict('')
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('ORG-U-16-T01 | updates the permission level preference', function(done) {
      trello.organizations(orgId).prefs().updatePermissionLevel('private')
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('ORG-U-17-T01 | updates the website', function(done) {
      trello.organizations(orgId).updateWebsite(null)
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });
  });
});
