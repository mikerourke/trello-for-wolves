/* Internal dependencies */
import Trello from '../../src/index';
import { auth, resourceIds, Logger } from '../helpers';

describe('BRD | Board Resource', () => {
  const { boardId, cardId, labelId, memberId, membershipId } = resourceIds;
  let trello;
  let logger;

  before(function(done) {
    trello = new Trello(auth);
    logger = new Logger();
    setTimeout(() => { done(); }, 3000);
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

  describe('BRD-G | Board GET requests', () => {
    before(function(done) {
      setTimeout(() => { done(); }, 3000);
    });

    it('BRD-G-01-T01 | gets a board', (done) => {
      trello.boards(boardId).getBoard()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('BRD-G-01-T02 | gets a board with some arguments', (done) => {
      trello.boards(boardId).getBoard({
        actions: 'none',
        cards: 'all',
        members: 'all',
      })
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('BRD-G-01-T03 | gets a board with all arguments', (done) => {
      trello.boards(boardId).getBoard({
        actions: 'none',
        actionsEntities: true,
        actionsDisplay: true,
        actionsFormat: 'count',
        actionsSince: null,
        actionsLimit: 20,
        actionFields: 'type',
        actionMember: true,
        actionMemberFields: 'username',
        actionMemberCreator: true,
        actionMemberCreatorFields: 'username',
        cards: 'all',
        cardFields: 'name',
        cardAttachments: false,
        cardAttachmentFields: 'name',
        cardChecklists: 'all',
        cardPluginData: true,
        cardStickers: true,
        boardStars: 'none',
        labels: 'all',
        labelFields: 'name',
        labelsLimit: 5,
        lists: 'all',
        listFields: ['name', 'pos'],
        memberships: 'all',
        membershipsMember: true,
        membershipsMemberFields: 'username',
        members: 'all',
        memberFields: 'username',
        membersInvited: 'none',
        membersInvitedFields: 'username',
        pluginData: true,
        checklists: 'all',
        checklistFields: ['name', 'pos', 'idBoard'],
        organization: true,
        organizationFields: 'name',
        organizationMemberships: 'none',
        organizationPluginData: true,
        myPrefs: true,
        tags: true,
        fields: ['name', 'desc'],
      })
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('BRD-G-02-T01 | gets the value of the name field for the board', (done) => {
      trello.boards(boardId).getFieldValue('name')
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('BRD-G-03-T01 | gets the associated actions', (done) => {
      trello.boards(boardId).actions().getActions()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('BRD-G-03-T02 | gets up to 10 actions that are of type createBoard with filter applied', (done) => {
      trello.boards(boardId).actions().getActions({
        filter: 'createBoard',
        limit: 10,
      })
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('BRD-G-04-T01 | gets all the board stars', (done) => {
      trello.boards(boardId).getBoardStars()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('BRD-G-04-T02 | gets only my board stars with filter applied', (done) => {
      trello.boards(boardId).getBoardStars({
        filter: 'mine',
      })
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('BRD-G-05-T01 | gets the associated cards', (done) => {
      trello.boards(boardId).cards().getCards()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('BRD-G-05-T02 | gets only the specified fields for the associated cards', (done) => {
      trello.boards(boardId).cards().getCards({
        fields: ['checkItemStates', 'name', 'idList'],
      })
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('BRD-G-06-T01 | gets only the closed cards with filter applied', (done) => {
      trello.boards(boardId).cards().getCards({
        filter: 'closed',
      })
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('BRD-G-07-T01 | gets the associated card with the specified ID', (done) => {
      trello.boards(boardId).cards(cardId).getCards()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('BRD-G-08-T01 | gets the associated checklists', (done) => {
      trello.boards(boardId).checklists().getChecklists()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('BRD-G-08-T02 | gets only the specified fields for the associated checklists', (done) => {
      trello.boards(boardId).checklists().getChecklists({
        fields: ['idBoard', 'name', 'pos'],
      })
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    // TODO: Find out how to get this working.
    it.skip('BRD-G-09-T01 | gets the associated deltas', (done) => {
      trello.boards(boardId).getDeltas({
        tags: 'tag?',
        ixLastUpdate: 1,
      })
        .then(logResponse)
        .should.eventually.be.rejected
        .notify(done);
    });

    // TODO: Find out how to get this working.
    it.skip('BRD-G-10-T01 | gets the associated tags', (done) => {
      trello.boards(boardId).getTags()
        .then(logResponse)
        .should.eventually.be.rejected
        .notify(done);
    });

    it('BRD-G-11-T01 | gets the associated labels', (done) => {
      trello.boards(boardId).labels().getLabels()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('BRD-G-11-T02 | gets only the specified fields for the associated labels', (done) => {
      trello.boards(boardId).labels().getLabels({
        fields: ['color', 'name'],
      })
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('BRD-G-12-T01 | gets the associated label with the specified ID', (done) => {
      trello.boards(boardId).labels(labelId).getLabel()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('BRD-G-13-T01 | gets the associated lists', (done) => {
      trello.boards(boardId).lists().getLists()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('BRD-G-13-T02 | gets the specified fields for the associated lists', (done) => {
      trello.boards(boardId).lists().getLists({
        fields: ['name', 'pos'],
      })
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('BRD-G-14-T01 | gets only the open lists with filter applied', (done) => {
      trello.boards(boardId).lists().getFilteredLists('open')
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('BRD-G-15-T01 | gets the associated members', (done) => {
      trello.boards(boardId).members().getMembers()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('BRD-G-15-T02 | gets the specified fields for the associated members', (done) => {
      trello.boards(boardId).members().getMembers({
        fields: ['fullName', 'initials'],
      })
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('BRD-G-16-T01 | gets only the normal members with filter applied', (done) => {
      trello.boards(boardId).members().getFilteredMembers('normal')
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('BRD-G-17-T01 | gets the associated cards for the specified member', (done) => {
      trello.boards(boardId).members(memberId).cards().getCards()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('BRD-G-18-T01 | gets the associated members invited', (done) => {
      trello.boards(boardId).membersInvited().getMembers()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('BRD-G-18-T02 | gets the specified fields for the associated members invited', (done) => {
      trello.boards(boardId).membersInvited().getMembers({
        fields: ['email', 'fullName', 'username'],
      })
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('BRD-G-19-T01 | gets the value of the fullName field for the associated members invited', (done) => {
      trello.boards(boardId).membersInvited().getFieldValue('fullName')
        .then(logResponse)
        .should.eventually.be.rejected
        .notify(done);
    });

    it('BRD-G-20-T01 | gets the associated memberships', (done) => {
      trello.boards(boardId).memberships().getMemberships()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('BRD-G-20-T02 | gets only the specified member fields for the associated memberships', (done) => {
      trello.boards(boardId).memberships().getMemberships({
        memberFields: ['status', 'username'],
      })
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('BRD-G-21-T01 | gets the associated membership with the specified ID', (done) => {
      trello.boards(boardId).memberships(membershipId).getMembership()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('BRD-G-21-T02 | gets the only the specified member fields for the associated membership with the specified ID', (done) => {
      trello.boards(boardId).memberships(membershipId).getMembership({
        memberFields: ['status', 'username'],
      })
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('BRD-G-22-T01 | gets the associated myPrefs', (done) => {
      trello.boards(boardId).myPrefs().getMyPrefs()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('BRD-G-23-T01 | gets the associated organization', (done) => {
      trello.boards(boardId).organization().getOrganization()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('BRD-G-23-T02 | gets only the specified fields for the associated organization', (done) => {
      trello.boards(boardId).organization().getOrganization({
        fields: ['displayName', 'name', 'url']
      })
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('BRD-G-24-T01 | gets the value of the name field for the associated organization', (done) => {
      trello.boards(boardId).organization().getFieldValue('name')
        .then(logResponse)
        .should.eventually.be.rejected
        .notify(done);
    });

    it('BRD-G-25-T01 | gets the associated plugin data', (done) => {
      trello.boards(boardId).getPluginData()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });
  });

  describe('BRD-U | Board PUT requests', () => {
    before(function(done) {
      setTimeout(() => { done(); }, 3000);
    });

    it('BRD-U-01-T01 | updates a board', (done) => {
      trello.boards(boardId).updateBoard({
        name: 'Test Board',
      })
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('BRD-U-02-T01 | updates the closed status', (done) => {
      trello.boards(boardId).updateClosedStatus(false)
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('BRD-U-03-T01 | updates the description', (done) => {
      trello.boards(boardId).updateDescription('This is a board')
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it.skip('BRD-U-04-T01 | updates the organization', (done) => {
      trello.boards(boardId).organization().updateOrganization()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('BRD-U-05-T01 | updates the name of the Blue label', (done) => {
      trello.boards(boardId).updateLabelNameForColor('blue', 'Blue Label')
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('BRD-U-06-T01 | updates the name of the Green label', (done) => {
      trello.boards(boardId).updateLabelNameForColor('green', 'Green Label')
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('BRD-U-07-T01 | updates the name of the Orange label', (done) => {
      trello.boards(boardId).updateLabelNameForColor('orange', 'Orange Label')
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('BRD-U-08-T01 | updates the name of the Purple label', (done) => {
      trello.boards(boardId).updateLabelNameForColor('purple', 'Purple Label')
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('BRD-U-09-T01 | updates the name of the Red label', (done) => {
      trello.boards(boardId).updateLabelNameForColor('red', 'Red Label')
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('BRD-U-10-T01 | updates the name of the Yellow label', (done) => {
      trello.boards(boardId).updateLabelNameForColor('yellow', 'Yellow Label')
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it.skip('BRD-U-11-T01 | adds an associated member', (done) => {
      trello.boards(boardId).members().addMember({
        email: 'dude@website.com',
        fullName: 'Bobby Memberton',
      })
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it.skip('BRD-U-12-T01 | updates the type for an associated member with specified ID', (done) => {
      trello.boards(boardId).members('[NEED ID]').updateMemberType('normal')
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it.skip('BRD-U-13-T01 | updates the associated membership with the specified ID', (done) => {
      trello.boards(boardId).memberships('[NEED ID]').updateMembership({
        type: 'normal',
      })
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('BRD-U-14-T01 | updates the emailPosition myPref', (done) => {
      trello.boards(boardId).myPrefs().updateEmailPosition('bottom')
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it.skip('BRD-U-15-T01 | updates the idEmailList myPref', (done) => {
      trello.boards(boardId).myPrefs().moveToEmailList(null)
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('BRD-U-16-T01 | updates the showListGuide myPref', (done) => {
      trello.boards(boardId).myPrefs().updateShowListGuide(false)
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('BRD-U-17-T01 | updates the showSidebar myPref', (done) => {
      trello.boards(boardId).myPrefs().updateShowSidebar(false)
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('BRD-U-18-T01 | updates the showSidebarActivity myPref', (done) => {
      trello.boards(boardId).myPrefs().updateShowSidebarActivity(true)
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('BRD-U-19-T01 | updates the showSidebarBoardActions myPref', (done) => {
      trello.boards(boardId).myPrefs().updateShowSidebarBoardActions(true)
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('BRD-U-20-T01 | updates the showSidebarMembers myPref', (done) => {
      trello.boards(boardId).myPrefs().updateShowSidebarMembers(true)
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('BRD-U-21-T01 | updates the name of the board', (done) => {
      trello.boards(boardId).updateName('Test Board')
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it.skip('BRD-U-22-T01 | updates the background preference', (done) => {
      trello.boards(boardId).prefs().updateBackground('[NEED ID]')
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('BRD-U-23-T01 | updates the calendarFeedEnabled preference', (done) => {
      trello.boards(boardId).prefs().updateCalendarFeedEnabled(true)
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('BRD-U-24-T01 | updates the cardAging preference', (done) => {
      trello.boards(boardId).prefs().updateCardAging('regular')
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('BRD-U-25-T01 | updates the cardCovers preference', (done) => {
      trello.boards(boardId).prefs().updateCardCovers(true)
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('BRD-U-26-T01 | updates the comments preference', (done) => {
      trello.boards(boardId).prefs().updateComments('members')
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('BRD-U-27-T01 | updates the invitations preference', (done) => {
      trello.boards(boardId).prefs().updateInvitations('members')
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('BRD-U-28-T01 | updates the permissionLevel preference', (done) => {
      trello.boards(boardId).prefs().updatePermissionLevel('org')
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('BRD-U-29-T01 | updates the selfJoin preference', (done) => {
      trello.boards(boardId).prefs().updateSelfJoin(true)
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('BRD-U-30-T01 | updates the voting preference', (done) => {
      trello.boards(boardId).prefs().updateVoting('disabled')
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('BRD-U-31-T01 | updates the subscribed status', (done) => {
      trello.boards(boardId).updateSubscribed(false)
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });
  });

  describe.skip('Board POST requests', () => {
    it.skip('BRD-P-01-T01 | creates a new board', (done) => {
      const boardName = 'Test Board 2';
      trello.boards().addBoard(boardName)
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('BRD-P-02-T01 | adds a new checklist', (done) => {
      trello.boards().checklists().addChecklist({
        name: 'Test Checklist',
      })
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('BRD-P-03-T01 | generates a calendar key', (done) => {
      trello.boards().generateCalendarKey()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('BRD-P-04-T01 | generates an email key', (done) => {
      trello.boards().generateEmailKey()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });
  });
});
