/* Internal dependencies */
import Trello from '../../src/index';
import Logger from '../logger';

describe('BRD | Board Resource', function() {
  let trello;
  let logger;

  let boardData = {};
  let boardId = '';

  before(function() {
    trello = new Trello(auth);
    logger = new Logger();
    if (resources.board) {
      boardId = resources.board.id;
    } else {
      this.skip();
    }
  });

  beforeEach(function() {
    logger.setTestName(this.currentTest.title);
  });

  after(function(done) {
    logger.writeResultsToFile('board')
      .then(() => done())
      .catch(error => done(error));
  });

  const logResponse = (response) => logger.processResponse(response);

  describe('BRD-G | Board GET requests', function() {
    before(function(done) {
      setTimeout(() => { done(); }, testDelay);
    });

    it('BRD-G-01-T01 | gets a Board', function(done) {
      trello.boards(boardId).getBoard()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('BRD-G-01-T02 | gets a Board with some arguments', function(done) {
      trello.boards(boardId).getBoard({
        actions: 'none',
        cards: 'all',
        members: 'all',
      })
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('BRD-G-01-T03 | gets a Board with all arguments', function(done) {
      trello.boards(boardId).getBoard({
        actions: 'createBoard',
        actionsEntities: true,
        actionsDisplay: true,
        actionsFormat: 'minimal',
        actionsSince: null,
        actionsLimit: 20,
        actionFields: ['date', 'type'],
        actionMember: true,
        actionMemberFields: 'username',
        actionMemberCreator: true,
        actionMemberCreatorFields: 'username',
        cards: 'all',
        cardFields: 'all',
        cardAttachments: true,
        cardAttachmentFields: 'name',
        cardChecklists: 'all',
        cardPluginData: true,
        cardStickers: true,
        boardStars: 'mine',
        labels: 'all',
        labelFields: 'all',
        labelsLimit: 50,
        lists: 'all',
        listFields: 'all',
        memberships: 'all',
        membershipsMember: true,
        membershipsMemberFields: ['fullName', 'username'],
        members: 'all',
        memberFields: ['fullName', 'username'],
        membersInvited: 'all',
        membersInvitedFields: ['fullName', 'username'],
        pluginData: true,
        checklists: 'all',
        checklistFields: 'all',
        organization: true,
        organizationFields: 'name',
        organizationMemberships: 'none',
        organizationPluginData: true,
        myPrefs: true,
        tags: true,
        fields: 'all',
      })
        .then(logResponse)
        .then((response) => {
          boardData = response.data || {};
          assert.isDefined(response.data);
          done();
        })
        .catch(error => done(error));
    });

    it('BRD-G-02-T01 | gets the value of the name field for the Board', function(done) {
      trello.boards(boardId).getFieldValue('name')
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('BRD-G-03-T01 | gets the associated Actions', function(done) {
      trello.boards(boardId).actions().getActions()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('BRD-G-03-T02 | gets up to 10 Actions that are of type createBoard with filter applied', function(done) {
      trello.boards(boardId).actions().getActions({
        filter: 'createBoard',
        limit: 10,
      })
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('BRD-G-04-T01 | gets all the Board Stars', function(done) {
      trello.boards(boardId).getBoardStars()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('BRD-G-04-T02 | gets only my Board Stars with filter applied', function(done) {
      trello.boards(boardId).getBoardStars({
        filter: 'mine',
      })
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('BRD-G-05-T01 | gets the associated Cards', function(done) {
      trello.boards(boardId).cards().getCards()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('BRD-G-06-T01 | gets only the closed Cards with filter applied', function(done) {
      trello.boards(boardId).cards().getCards({
        filter: 'closed',
      })
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('BRD-G-07-T01 | gets the associated Card with the specified Id', function(done) {
      if (!boardData.cards.length) {
        done(new Error('Cards not found.'));
      }
      const cardId = boardData.cards[0].id;
      trello.boards(boardId).cards(cardId).getCard()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('BRD-G-08-T01 | gets the associated Checklists', function(done) {
      trello.boards(boardId).checklists().getChecklists()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('BRD-G-08-T02 | gets only the specified fields for the associated Checklists', function(done) {
      trello.boards(boardId).checklists().getChecklists({
        fields: ['idBoard', 'name', 'pos'],
      })
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    /**
     * @skip BRD-G-09
     * @reason Business Class account required
     */
    it.skip('BRD-G-09-T01 | gets the associated Deltas', function(done) {
      trello.boards(boardId).getDeltas({
        tags: 'tag?',
        ixLastUpdate: 1,
      })
        .then(logResponse)
        .should.eventually.be.rejected
        .notify(done);
    });

    /**
     * @skip BRD-G-10
     * @reason Business Class account required
     */
    it.skip('BRD-G-10-T01 | gets the associated Tags', function(done) {
      trello.boards(boardId).getTags()
        .then(logResponse)
        .should.eventually.be.rejected
        .notify(done);
    });

    it('BRD-G-11-T01 | gets the associated Labels', function(done) {
      trello.boards(boardId).labels().getLabels()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('BRD-G-11-T02 | gets only the specified fields for the associated Labels', function(done) {
      trello.boards(boardId).labels().getLabels({
        fields: ['color', 'name'],
      })
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('BRD-G-12-T01 | gets the associated Label with the specified Id', function(done) {
      if (!boardData.labels.length) {
        done(new Error('Labels not found.'))
      }
      const labelId = boardData.labels[0].id;
      trello.boards(boardId).labels(labelId).getLabel()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('BRD-G-13-T01 | gets the associated Lists', function(done) {
      trello.boards(boardId).lists().getLists()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('BRD-G-13-T02 | gets the specified fields for the associated Lists', function(done) {
      trello.boards(boardId).lists().getLists({
        fields: ['name', 'pos'],
      })
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('BRD-G-14-T01 | gets only the open Lists with filter applied', function(done) {
      trello.boards(boardId).lists().getListsFilteredBy('open')
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('BRD-G-15-T01 | gets the associated Members', function(done) {
      trello.boards(boardId).members().getMembers()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('BRD-G-15-T02 | gets the specified fields for the associated Members', function(done) {
      trello.boards(boardId).members().getMembers({
        fields: ['fullName', 'initials'],
      })
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('BRD-G-16-T01 | gets only the normal Members with filter applied', function(done) {
      trello.boards(boardId).members().getMembersFilteredBy('normal')
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('BRD-G-17-T01 | gets the associated cards for the specified Member', function(done) {
      if (!boardData.members.length) {
        done(new Error('Members not found.'));
      }
      const memberId = boardData.members[0].id;
      trello.boards(boardId).members(memberId).cards().getCards()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('BRD-G-18-T01 | gets the associated Members Invited', function(done) {
      trello.boards(boardId).membersInvited().getMembers()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('BRD-G-18-T02 | gets the specified fields for the associated Members Invited', function(done) {
      trello.boards(boardId).membersInvited().getMembers({
        fields: ['email', 'fullName', 'username'],
      })
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('BRD-G-19-T01 | gets the value of the fullName field for the associated Members Invited', function(done) {
      trello.boards(boardId).membersInvited().getFieldValue('fullName')
        .then(logResponse)
        .should.eventually.be.rejected
        .notify(done);
    });

    it('BRD-G-20-T01 | gets the associated Memberships', function(done) {
      trello.boards(boardId).memberships().getMemberships({
        filter: 'me',
      })
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('BRD-G-20-T02 | gets only the specified Member fields for the associated Memberships', function(done) {
      trello.boards(boardId).memberships().getMemberships({
        memberFields: ['status', 'username'],
      })
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('BRD-G-21-T01 | gets the associated Membership with the specified Id', function(done) {
      if (!boardData.memberships.length) {
        done(new Error('Memberships not found.'));
      }
      const membershipId = boardData.memberships[0].id;
      trello.boards(boardId).memberships(membershipId).getMembership()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('BRD-G-21-T02 | gets the only the specified Member fields for the associated Membership with the specified Id', function(done) {
      if (!boardData.memberships.length) {
        done(new Error('Memberships not found.'));
      }
      const membershipId = boardData.memberships[0].id;
      trello.boards(boardId).memberships(membershipId).getMembership({
        memberFields: ['status', 'username'],
      })
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('BRD-G-22-T01 | gets the associated myPrefs', function(done) {
      trello.boards(boardId).myPrefs().getMyPrefs()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('BRD-G-23-T01 | gets the associated Organization', function(done) {
      trello.boards(boardId).organization().getOrganization()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('BRD-G-23-T02 | gets only the specified fields for the associated Organization', function(done) {
      trello.boards(boardId).organization().getOrganization({
        fields: ['displayName', 'name', 'url']
      })
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('BRD-G-24-T01 | gets the value of the name field for the associated Organization', function(done) {
      trello.boards(boardId).organization().getFieldValue('name')
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('BRD-G-25-T01 | gets the associated Plugin Data', function(done) {
      trello.boards(boardId).getPluginData()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });
  });

  describe('BRD-U | Board PUT requests', function() {
    let newMemberId = '';

    before(function(done) {
      setTimeout(() => { done(); }, testDelay);
    });

    it('BRD-U-01-T01 | updates a Board', function(done) {
      trello.boards(boardId).updateBoard({
        name: 'BRD-U-01-T01',
      })
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('BRD-U-02-T01 | updates the closed status', function(done) {
      trello.boards(boardId).updateClosedStatus(false)
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('BRD-U-03-T01 | updates the description', function(done) {
      trello.boards(boardId).updateDescription('BRD-U-03-T01')
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('BRD-U-04-T01 | updates the Organization association', function(done) {
      const orgId = boardData.idOrganization;
      if (!orgId) {
        done(new Error('Organization Id not found.'));
      }
      trello.boards(boardId).moveToOrganization(orgId)
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('BRD-U-05-T01 | updates the name of the Blue label', function(done) {
      trello.boards(boardId).updateLabelNameForColor('blue', 'BRD-U-05-T01')
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('BRD-U-06-T01 | updates the name of the Green label', function(done) {
      trello.boards(boardId).updateLabelNameForColor('green', 'BRD-U-06-T01')
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('BRD-U-07-T01 | updates the name of the Orange label', function(done) {
      trello.boards(boardId).updateLabelNameForColor('orange', 'BRD-U-07-T01')
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('BRD-U-08-T01 | updates the name of the Purple label', function(done) {
      trello.boards(boardId).updateLabelNameForColor('purple', 'BRD-U-08-T01')
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('BRD-U-09-T01 | updates the name of the Red label', function(done) {
      trello.boards(boardId).updateLabelNameForColor('red', 'BRD-U-09-T01')
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('BRD-U-10-T01 | updates the name of the Yellow label', function(done) {
      trello.boards(boardId).updateLabelNameForColor('yellow', 'BRD-U-10-T01')
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    /**
     * @skip BRD-U-11
     * @reason Excessive Data
     * @passed 06.09.17
     */
    it.skip('BRD-U-11-T01 | adds an associated Member', function(done) {
      trello.boards(boardId).members().addMember({
        email: 'test@tfw.com',
        fullName: 'BRD-U-11-T01',
      })
        .then(logResponse)
        .then((response) => {
          const { data: { members } } = response;
          const newMember = members.find(member => member.memberType === 'ghost');
          if (newMember) {
            newMemberId = newMember.id;
          }
          assert.isDefined(newMember);
          done();
        })
        .catch(error => done(error));
    });

    it('BRD-U-12-T01 | updates the type for an associated Member with specified Id', function(done) {
      if (!resources.member) {
        done(new Error('Member not found.'))
      }
      const memberId = resources.member.id;
      trello.boards(boardId).members(memberId).updateMemberType('normal')
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    /**
     * @skip BRD-U-13
     * @reason Excessive Data
     * @passed 06.09.17
     */
    it.skip('BRD-U-13-T01 | updates the associated Membership with the specified Id', function(done) {
      if (!boardData.memberships.length) {
        done(new Error('Memberships not found.'));
      }
      const membershipId = boardData.memberships[0].id;
      trello.boards(boardId).memberships(membershipId).updateMembership({
        type: 'admin',
      })
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('BRD-U-14-T01 | updates the emailPosition myPref', function(done) {
      trello.boards(boardId).myPrefs().updateEmailPosition('bottom')
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    // @todo: Figure out what the requirements are for this.
    it.skip('BRD-U-15-T01 | updates the idEmailList myPref', function(done) {
      trello.boards(boardId).myPrefs().moveToEmailList(null)
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('BRD-U-16-T01 | updates the showListGuide myPref', function(done) {
      trello.boards(boardId).myPrefs().updateShowListGuide(false)
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('BRD-U-17-T01 | updates the showSidebar myPref', function(done) {
      trello.boards(boardId).myPrefs().updateShowSidebar(false)
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('BRD-U-18-T01 | updates the showSidebarActivity myPref', function(done) {
      trello.boards(boardId).myPrefs().updateShowSidebarActivity(true)
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('BRD-U-19-T01 | updates the showSidebarBoardActions myPref', function(done) {
      trello.boards(boardId).myPrefs().updateShowSidebarBoardActions(true)
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('BRD-U-20-T01 | updates the showSidebarMembers myPref', function(done) {
      trello.boards(boardId).myPrefs().updateShowSidebarMembers(true)
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('BRD-U-21-T01 | updates the name of the Board', function(done) {
      trello.boards(boardId).updateName('BRD-U-21-T01')
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('BRD-U-22-T01 | updates the background preference', function(done) {
      trello.boards(boardId).prefs().updateBackground('orange')
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('BRD-U-23-T01 | updates the calendarFeedEnabled preference', function(done) {
      trello.boards(boardId).prefs().updateCalendarFeedEnabled(true)
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('BRD-U-24-T01 | updates the cardAging preference', function(done) {
      trello.boards(boardId).prefs().updateCardAging('regular')
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('BRD-U-25-T01 | updates the cardCovers preference', function(done) {
      trello.boards(boardId).prefs().updateCardCovers(true)
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('BRD-U-26-T01 | updates the comments preference', function(done) {
      trello.boards(boardId).prefs().updateComments('members')
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('BRD-U-27-T01 | updates the invitations preference', function(done) {
      trello.boards(boardId).prefs().updateInvitations('members')
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('BRD-U-28-T01 | updates the permissionLevel preference', function(done) {
      trello.boards(boardId).prefs().updatePermissionLevel('org')
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('BRD-U-29-T01 | updates the selfJoin preference', function(done) {
      trello.boards(boardId).prefs().updateSelfJoin(true)
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('BRD-U-30-T01 | updates the voting preference', function(done) {
      trello.boards(boardId).prefs().updateVoting('disabled')
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('BRD-U-31-T01 | updates the subscribed status', function(done) {
      trello.boards(boardId).updateSubscribed(false)
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });
  });
});
