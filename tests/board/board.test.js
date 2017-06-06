/* Internal dependencies */
import Trello from '../../src/index';
import { auth, resourceIds, logResult } from '../helpers';

describe.only('Board Resource', () => {
  const { boardId, labelId, memberId, membershipId } = resourceIds;
  let trello;

  before((done) => {
    trello = new Trello(auth);
    // setTimeout(() => { done(); }, 3000);
    done();
  });

  describe('Board GET requests', () => {
    it('gets a board', (done) => {
      trello.boards(boardId).getBoard()
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('gets a board with queryArgs', (done) => {
      trello.boards(boardId).getBoard({ actions: 'none' })
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('gets a board field value', (done) => {
      trello.boards(boardId).getFieldValue('name')
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('gets the actions for a board', (done) => {
      trello.boards(boardId).actions().getActions({
        filter: 'createBoard',
      })
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('gets the stars for a board', (done) => {
      trello.boards(boardId).getBoardStars()
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('gets the cards in a board', (done) => {
      trello.boards(boardId).cards().getCards()
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('gets the filtered cards in a board', (done) => {
      trello.boards(boardId).cards().getCards({
        filter: 'closed',
      })
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('gets a card in a board by ID', (done) => {
      trello.boards(boardId).cards().getCards()
        .should.eventually.be.fulfilled
        .notify(done);
    });

    // TODO: Add this functionality.
    it('gets the checklists in a board', (done) => {
      trello.boards(boardId).checklists().getChecklists()
        .should.eventually.be.fulfilled
        .notify(done);
    });

    // TODO: Look into getting a working example.
    it.skip('gets the deltas in a board', (done) => {
      trello.boards(boardId).getDeltas({
        tags: 'tag?',
        ixLastUpdate: 1,
      })
        .should.eventually.be.rejected
        .notify(done);
    });

    it('gets the tags for a board', (done) => {
      trello.boards(boardId).getTags()
        .should.eventually.be.rejected
        .notify(done);
    });

    it('gets the labels in a board', (done) => {
      trello.boards(boardId).labels().getLabels()
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('gets the label in a board by ID', (done) => {
      trello.boards(boardId).labels(labelId).getLabel()
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('gets the lists in a board', (done) => {
      trello.boards(boardId).lists().getLists()
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('gets the filtered lists in a board', (done) => {
      trello.boards(boardId).lists().getFilteredLists({
        filter: 'closed',
      })
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('gets the members in a board', (done) => {
      trello.boards(boardId).members().getMembers()
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('gets the filtered members in a board', (done) => {
      trello.boards(boardId).members().getFilteredMembers({
        filter: 'normal',
      })
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('gets the cards for the specified member in a board', (done) => {
      trello.boards(boardId).members(memberId).cards().getCards()
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('gets the members invited in a board', (done) => {
      trello.boards(boardId).membersInvited().getMembers()
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('gets the field value of members invited in a board', (done) => {
      trello.boards(boardId).membersInvited().getFieldValue('avatarHash')
        .should.eventually.be.rejected
        .notify(done);
    });

    it('gets the memberships in a board', (done) => {
      trello.boards(boardId).memberships().getMemberships()
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('gets the memberships in a board by ID', (done) => {
      trello.boards(boardId).memberships(membershipId).getMembership()
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('gets myPrefs for a board', (done) => {
      trello.boards(boardId).myPrefs().getMyPrefs()
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('gets the organization for a board', (done) => {
      trello.boards(boardId).organization().getOrganization()
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('gets the field value of the organization for a board', (done) => {
      trello.boards(boardId).organization().getFieldValue('avatarHash')
        .should.eventually.be.rejected
        .notify(done);
    });

    it('gets the plugin data for a board', (done) => {
      trello.boards(boardId).getPluginData()
        .should.eventually.be.fulfilled
        .notify(done);
    });
  });

  describe('Board PUT requests', () => {
    it('updates a board', (done) => {
      trello.boards(boardId).updateBoard({
        name: 'Test Board',
      })
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('updates the closed status of a board', (done) => {
      trello.boards(boardId).updateClosedStatus({
        value: false,
      })
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('updates the description of a board', (done) => {
      trello.boards(boardId).updateDescription({
        value: 'This is a board',
      })
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('updates the label name for a color on the board', (done) => {
      trello.boards(boardId).updateLabelNameForColor('red', {
        value: 'Red Label',
      })
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('updates the name of the board', (done) => {
      trello.boards(boardId).updateName({
        value: 'Test Board',
      })
        .should.eventually.be.fulfilled
        .notify(done);
    });
  });

  describe.only('Board myPref PUT requests', () => {
    it('updates the myPref emailPosition of the board', (done) => {
      trello.boards(boardId).myPrefs().updateEmailPosition('bottom')
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it.skip('updates the myPref idEmailList of the board', (done) => {
      trello.boards(boardId).myPrefs().updateIdEmailList(null)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('updates the myPref showListGuide of the board', (done) => {
      trello.boards(boardId).myPrefs().updateShowListGuide(false)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('updates the myPref showSidebar of the board', (done) => {
      trello.boards(boardId).myPrefs().updateShowSidebar(false)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('updates the myPref showSidebarActivity of the board', (done) => {
      trello.boards(boardId).myPrefs().updateShowSidebarActivity(true)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('updates the myPref showSidebarBoardActions of the board', (done) => {
      trello.boards(boardId).myPrefs().updateShowSidebarBoardActions(true)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('updates the myPref showSidebarMembers of the board', (done) => {
      trello.boards(boardId).myPrefs().updateShowSidebarMembers(true)
        .should.eventually.be.fulfilled
        .notify(done);
    });
  });

  // TODO: Finish writing tests for Board Prefs.
  describe('Board prefs PUT requests', () => {
    it('updates the pref background of the board', (done) => {
      trello.boards(boardId).prefs().updateBackground('Test Board')
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('updates the pref calendarFeedEnabled of the board', (done) => {
      trello.boards(boardId).prefs().updateCalendarFeedEnabled({
        value: 'Test Board',
      })
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('updates the pref cardAging of the board', (done) => {
      trello.boards(boardId).prefs().updateCardAging({
        value: 'Test Board',
      })
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('updates the pref cardCovers of the board', (done) => {
      trello.boards(boardId).prefs().updateCardCovers({
        value: 'Test Board',
      })
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('updates the pref comments of the board', (done) => {
      trello.boards(boardId).prefs().updateComments({
        value: 'Test Board',
      })
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('updates the pref invitations of the board', (done) => {
      trello.boards(boardId).prefs().updateInvitations({
        value: 'Test Board',
      })
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('updates the pref permissionLevel of the board', (done) => {
      trello.boards(boardId).prefs().updatePermissionLevel({
        value: 'Test Board',
      })
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('updates the pref selfJoin of the board', (done) => {
      trello.boards(boardId).prefs().updateSelfJoin({
        value: 'Test Board',
      })
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('updates the pref voting of the board', (done) => {
      trello.boards(boardId).prefs().updateVoting({
        value: 'Test Board',
      })
        .should.eventually.be.fulfilled
        .notify(done);
    });
  });

  describe.skip('Board POST requests', () => {
    it('creates a new board', (done) => {
      const boardName = 'Test Board 2';
      trello.boards().createBoard(boardName)
        .should.eventually.be.fulfilled
        .notify(done);
    });
  });
});
