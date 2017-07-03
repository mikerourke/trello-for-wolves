/* Internal dependencies */
import Trello from '../../src/index';
import Logger from '../logger';

describe('MBR | Member Resource', function() {
  let trello;
  let logger;

  const myMemberId = process.env.TRELLO_MEMBER_ID || '';
  let memberData = {};

  let testBoardBackground = {};
  let testCustomBackground = {};
  let testBoardStar = {};
  let testCustomSticker = {};
  let testSavedSearch = {};

  before(function() {
    trello = new Trello(auth);
    logger = new Logger();
  });

  beforeEach(function() {
    logger.setTestName(this.currentTest.title);
  });

  after(function(done) {
    logger.writeResultsToFile('member')
      .then(() => done())
      .catch(error => done(error));
  });

  const logResponse = (response) => logger.processResponse(response);

  describe('MBR-P | Member POST requests', function() {
    before(function(done) {
      setTimeout(() => { done(); }, testDelay);
    });

    it.skip('MBR-P-01-T01 | uploads an Avatar', function(done) {
      trello.members(myMemberId).uploadAvatar({
        filePath: '',
        fileName: '',
      })
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it.skip('MBR-P-02-T01 | uploads a Board Background', function(done) {
      trello.members(myMemberId).boardBackgrounds().uploadBoardBackground({
        filePath: '',
        fileName: '',
      })
        .then(logResponse)
        .then((response) => {
          testBoardBackground = response.data;
          assert.isDefined(response.data);
          done();
        })
        .catch(error => done(error));
    });

    it('MBR-P-03-T01 | adds a Board Star', function(done) {
      if (!resources.board) {
        done(new Error('Board not found.'));
      }
      const boardId = resources.board.id;
      trello.members(myMemberId).boardStars().addBoardStar({
        idBoard: boardId,
        pos: 'top',
      })
        .then(logResponse)
        .then((response) => {
          testBoardStar = response.data;
          assert.isDefined(response.data);
          done();
        })
        .catch(error => done(error));
    });

    it.skip('MBR-P-04-T01 | uploads a Custom Board Background', function(done) {
      trello.members(myMemberId).customBoardBackgrounds().uploadBoardBackground({
        filePath: '',
        fileName: '',
      })
        .then(logResponse)
        .then((response) => {
          testCustomBackground = response.data;
          assert.isDefined(response.data);
          done();
        })
        .catch(error => done(error));
    });

    it.skip('MBR-P-05-T01 | uploads a Custom Emoji', function(done) {
      trello.members(myMemberId).customEmoji().uploadCustomEmoji('test', {
        filePath: '',
        fileName: '',
      })
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it.skip('MBR-P-06-T01 | uploads a Custom Sticker', function(done) {
      trello.members(myMemberId).customStickers().uploadSticker({
        filePath: '',
        fileName: '',
      })
        .then(logResponse)
        .then((response) => {
          testCustomSticker = response.data;
          assert.isDefined(response.data);
          done();
        })
        .catch(error => done(error));
    });

    it.skip('MBR-P-07-T01 | dismisses messages one time', function(done) {
      trello.members(myMemberId).dismissOneTimeMessages('[NEED MESSAGE TYPE]')
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('MBR-P-08-T01 | adds a Saved Search', function(done) {
      trello.members(myMemberId).savedSearches().addSavedSearch({
        name: 'MBR-P-08-T01',
        query: '@bobby',
        pos: 'top',
      })
        .then(logResponse)
        .then((response) => {
          testSavedSearch = response.data;
          assert.isDefined(response.data);
          done();
        })
        .catch(error => done(error));
    });
  });

  describe('MBR-G | Member GET requests', function() {
    before(function(done) {
      setTimeout(() => { done(); }, testDelay);
    });

    // Add a delay between requests due to the large amount of tests and
    // rate limiting.
    beforeEach(function(done) {
      setTimeout(() => { done(); }, 300);
    });

    it('MBR-G-01-T01 | gets a Member', function(done) {
      trello.members(myMemberId).getMember()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('MBR-G-01-T02 | gets a Member with some arguments', function(done) {
      trello.members(myMemberId).getMember({
        actions: 'none',
        cards: 'all',
        cardFields: ['fullName', 'username'],
      })
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('MBR-G-01-T03 | gets a Member with all arguments', function(done) {
      trello.members(myMemberId).getMember({
        actions: 'createMember',
        actionsEntities: true,
        actionsDisplay: true,
        actionsLimit: 20,
        actionFields: ['date', 'type'],
        cards: 'all',
        cardFields: 'all',
        cardMembers: true,
        cardMemberFields: 'all',
        cardAttachments: true,
        cardAttachmentFields: 'name',
        cardStickers: true,
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
        boardMemberships: 'all',
        boardOrganization: true,
        boardOrganizationFields: 'all',
        boardsInvited: 'all',
        boardsInvitedFields: 'all',
        boardStars: true,
        savedSearches: false,
        organizations: 'all',
        organizationFields: 'all',
        organizationPaidAccount: false,
        organizationsInvited: 'all',
        organizationsInvitedFields: 'all',
        notifications: 'none',
        notificationsEntities: true,
        notificationsDisplay: true,
        notificationsLimit: 20,
        notificationFields: 'all',
        notificationMemberCreator: true,
        notificationMemberCreatorFields: 'all',
        tokens: 'all',
        paidAccount: false,
        boardBackgrounds: 'all',
        customBoardBackgrounds: 'all',
        customStickers: 'all',
        customEmoji: 'all',
        fields: 'all',
      })
        .then(logResponse)
        .then((response) => {
          memberData = response.data || {};
          assert.isDefined(response.data);
          done();
        })
        .catch(error => done(error));
    });

    it('MBR-G-02-T01 | gets the value of the fullName field for the Member', function(done) {
      trello.members(myMemberId).getFieldValue('fullName')
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('MBR-G-03-T01 | gets the associated Actions', function(done) {
      trello.members(myMemberId).actions().getActions()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('MBR-G-04-T01 | gets the associated Board Backgrounds', function(done) {
      trello.members(myMemberId).boardBackgrounds().getBoardBackgrounds()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('MBR-G-05-T01 | gets the associated Board Background with the specified Id', function(done) {
      if (!memberData.boardBackgrounds) {
        done(new Error('Board Background not found.'));
      }
      const backgroundId = memberData.boardBackgrounds.slice(-1).id;
      trello.members(myMemberId).boardBackgrounds(backgroundId).getBoardBackground()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('MBR-G-06-T01 | gets the associated Board Stars', function(done) {
      trello.members(myMemberId).boardStars().getBoardStars()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('MBR-G-07-T01 | gets the associated Board Star with the specified Id', function(done) {
      if (!memberData.boardStars.length) {
        done(new Error('Board Stars not found.'));
      }
      const boardStarId = memberData.boardStars[0].id;
      trello.members(myMemberId).boardStars(boardStarId).getBoardStar()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('MBR-G-08-T01 | gets the associated Boards', function(done) {
      trello.members(myMemberId).boards().getBoards()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('MBR-G-08-T02 | gets the specified fields for the associated Boards', function(done) {
      trello.members(myMemberId).boards().getBoards({
        fields: ['name', 'pos'],
      })
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('MBR-G-09-T01 | gets only the open Boards with filter applied', function(done) {
      trello.members(myMemberId).boards().getBoardsFilteredBy('open')
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('MBR-G-10-T01 | gets the associated Boards Invited', function(done) {
      trello.members(myMemberId).boardsInvited().getBoards()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('MBR-G-10-T02 | gets the specified fields for the associated Boards Invited', function(done) {
      trello.members(myMemberId).boardsInvited().getBoards({
        fields: ['name', 'desc'],
      })
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('MBR-G-11-T01 | gets the value of the name field for the associated Boards Invited', function(done) {
      trello.members(myMemberId).boardsInvited().getFieldValue('name')
        .then(logResponse)
        .should.eventually.be.rejected
        .notify(done);
    });

    it('MBR-G-12-T01 | gets the associated Cards', function(done) {
      trello.members(myMemberId).cards().getCards()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('MBR-G-12-T02 | gets the specified fields for the associated Cards', function(done) {
      trello.members(myMemberId).cards().getCards({
        fields: ['name', 'desc'],
      })
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('MBR-G-13-T01 | gets only the open Cards with filter applied', function(done) {
      trello.members(myMemberId).cards().getCardsFilteredBy('open')
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('MBR-G-14-T01 | gets the associated Custom Board Backgrounds', function(done) {
      trello.members(myMemberId).customBoardBackgrounds().getBoardBackgrounds()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('MBR-G-15-T01 | gets the associated Custom Board Background with the specified Id', function(done) {
      if (!memberData.customBoardBackgrounds.length) {
        done(new Error('Custom Board Backgrounds not found.'));
      }
      const backgroundId = memberData.customBoardBackgrounds[0].id;
      trello.members(myMemberId).customBoardBackgrounds(backgroundId).getBoardBackground()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('MBR-G-16-T01 | gets the associated Custom Emojis', function(done) {
      trello.members(myMemberId).customEmoji().getCustomEmojis()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('MBR-G-17-T01 | gets the associated Custom Emoji with the specified Id', function(done) {
      if (!memberData.customEmoji.length) {
        done(new Error('Custom Emojis not found.'));
      }
      const emojiId = memberData.customEmoji[0].id;
      trello.members(myMemberId).customEmoji(emojiId).getCustomEmoji()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('MBR-G-18-T01 | gets the associated Custom Stickers', function(done) {
      trello.members(myMemberId).customStickers().getStickers()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('MBR-G-19-T01 | gets the associated Custom Sticker with the specified Id', function(done) {
      if (!memberData.customStickers.length) {
        done(new Error('Custom Stickers not found.'));
      }
      const customStickerId = memberData.customStickers[0].id;
      trello.members(myMemberId).customStickers(customStickerId).getSticker()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    /**
     * @skip MBR-G-09
     * @reason Business Class account required
     */
    it.skip('MBR-G-20-T01 | gets the associated Deltas', function(done) {
      trello.members(myMemberId).getDeltas({
        tags: 'tag?',
        ixLastUpdate: 1,
      })
        .then(logResponse)
        .should.eventually.be.rejected
        .notify(done);
    });

    it('MBR-G-21-T01 | gets the associated Notifications', function(done) {
      trello.members(myMemberId).notifications().getNotifications()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('MBR-G-21-T02 | gets the specified fields for the associated Notifications', function(done) {
      trello.members(myMemberId).notifications().getNotifications({
        fields: ['data', 'date'],
      })
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('MBR-G-22-T01 | gets only the createdCard Notifications with filter applied', function(done) {
      trello.members(myMemberId).notifications().getNotificationsFilteredBy('createdCard')
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('MBR-G-23-T01 | gets the associated Organizations', function(done) {
      trello.members(myMemberId).organizations().getOrganizations()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('MBR-G-23-T02 | gets the specified fields for the associated Organizations', function(done) {
      trello.members(myMemberId).organizations().getOrganizations({
        fields: ['name', 'desc'],
      })
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('MBR-G-24-T01 | gets only the members Organizations with filter applied', function(done) {
      trello.members(myMemberId).organizations().getOrganizationsFilteredBy('members')
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('MBR-G-25-T01 | gets the associated Organizations Invited', function(done) {
      trello.members(myMemberId).organizationsInvited().getOrganizations()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('MBR-G-25-T02 | gets the specified fields for the associated Organizations Invited', function(done) {
      trello.members(myMemberId).organizationsInvited().getOrganizations({
        fields: ['desc', 'displayName', 'name'],
      })
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('MBR-G-26-T01 | gets the value of the displayName field for the associated Organizations Invited', function(done) {
      trello.members(myMemberId).organizationsInvited().getFieldValue('displayName')
        .then(logResponse)
        .should.eventually.be.rejected
        .notify(done);
    });

    it('MBR-G-27-T01 | gets the associated Saved Searches', function(done) {
      trello.members(myMemberId).savedSearches().getSavedSearches()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('MBR-G-28-T01 | gets the associated Saved Search with the specified Id', function(done) {
      if (!memberData.savedSearches.length) {
        done(new Error('Saved Searches not found.'));
      }
      const savedSearchId = memberData.savedSearches[0].id;
      trello.members(myMemberId).savedSearches(savedSearchId).getSavedSearch()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('MBR-G-29-T01 | gets the associated Tokens', function(done) {
      trello.members(myMemberId).tokens().getTokens()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });
  });

  describe('MBR-U | Member PUT requests', function() {
    before(function(done) {
      if (!testBoardBackground) {
        testBoardBackground = memberData.boardBackgrounds.slice(-1);
      }
      if (!testCustomBackground) {
        testCustomBackground = memberData.customBoardBackgrounds.slice(-1);
      }
      if (!testBoardStar) {
        testBoardStar = memberData.boardStars.slice(-1);
      }
      if (!testCustomSticker) {
        testCustomSticker = memberData.customStickers.slice(-1);
      }
      if (!testSavedSearch) {
        testSavedSearch = memberData.savedSearches.slice(-1);
      }
      setTimeout(() => { done(); }, testDelay);
    });

    it('MBR-U-01-T01 | updates a Member', function(done) {
      const { fullName, bio } = memberData;
      trello.members(myMemberId).updateMember({
        fullName,
        bio,
      })
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('MBR-U-02-T01 | updates the avatar source', function(done) {
      const { avatarSource } = memberData;
      trello.members(myMemberId).updateAvatarSource(avatarSource)
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('MBR-U-03-T01 | updates the bio', function(done) {
      const { bio } = memberData;
      trello.members(myMemberId).updateBio(bio)
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('MBR-U-04-T01 | updates an associated Board Background', function(done) {
      if (!testBoardBackground) {
        done(new Error('Background not found.'))
      }
      const { id, tile } = testBoardBackground;
      trello.members(myMemberId).boardBackgrounds(id).updateBoardBackground({
        tile,
      })
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('MBR-U-05-T01 | updates an associated Board Star', function(done) {
      if (!testBoardStar) {
        done(new Error('Board Star not found.'))
      }
      const { id, pos } = testBoardStar;
      trello.members(myMemberId).boardStars(id).updateBoardStar({
        pos,
      })
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('MBR-U-06-T01 | updates the Board for an associated Board Star', function(done) {
      if (!testBoardStar) {
        done(new Error('Board Star not found.'))
      }
      const { id, idBoard } = testBoardStar;
      trello.members(myMemberId).boardStars(id).moveBoardStarToBoard(idBoard)
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('MBR-U-07-T01 | updates the position for an associated Board Star', function(done) {
      if (!testBoardStar) {
        done(new Error('Board Star not found.'))
      }
      const { id, pos } = testBoardStar;
      trello.members(myMemberId).boardStars(id).updatePosition(pos)
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('MBR-U-08-T01 | updates an associated Custom Board Background', function(done) {
      if (!testCustomBackground) {
        done(new Error('Custom Background not found.'))
      }
      const { id, tile } = testCustomBackground;
      trello.members(myMemberId).customBoardBackgrounds(id).updateBoardBackground({
        tile,
      })
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('MBR-U-09-T01 | updates the full name', function(done) {
      const { fullName } = memberData;
      trello.members(myMemberId).updateFullName(fullName)
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('MBR-U-10-T01 | updates the initials', function(done) {
      const { initials } = memberData;
      trello.members(myMemberId).updateInitials(initials)
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('MBR-U-11-T01 | updates the color blind preference', function(done) {
      trello.members(myMemberId).prefs().updateColorBlind(false)
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('MBR-U-12-T01 | updates the locale preference', function(done) {
      trello.members(myMemberId).prefs().updateLocale('en-US')
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('MBR-U-13-T01 | updates the minutes between summaries preference', function(done) {
      trello.members(myMemberId).prefs().updateMinutesBetweenSummaries(-1)
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it.skip('MBR-U-14-T01 | updates an associated Saved Search', function(done) {
      if (!testSavedSearch) {
        done(new Error('Saved Search not found.'))
      }
      const { id, name, pos } = testSavedSearch;
      if (typeof id === 'undefined'
          || typeof name === 'undefined'
          || typeof pos === 'undefined') {
        done(new Error('Saved Search fields not found.'))
      }
      trello.members(myMemberId).savedSearches(id).updateSavedSearch({
        name,
        pos,
      })
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('MBR-U-15-T01 | updates the name of an associated Saved Search', function(done) {
      if (!testSavedSearch) {
        done(new Error('Saved Search not found.'))
      }
      const { id, name } = testSavedSearch;
      trello.members(myMemberId).savedSearches(id).updateName(name)
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('MBR-U-16-T01 | updates the position of an associated Saved Search', function(done) {
      if (!testSavedSearch) {
        done(new Error('Saved Search not found.'))
      }
      const { id, pos } = testSavedSearch;
      trello.members(myMemberId).savedSearches(id).updatePosition(pos)
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('MBR-U-17-T01 | updates the query of an associated Saved Search', function(done) {
      if (!testSavedSearch) {
        done(new Error('Saved Search not found.'))
      }
      const { id, query } = testSavedSearch;
      trello.members(myMemberId).savedSearches(id).updateQuery(query)
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('MBR-U-18-T01 | updates the username', function(done) {
      const { username } = memberData;
      if (!username) {
        done(new Error('Username not found.'));
      }
      trello.members(myMemberId).updateUsername(username)
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });
  });

  describe('MBR-D | Member DELETE requests', function() {
    before(function (done) {
      setTimeout(() => { done(); }, testDelay);
    });

    it.skip('MBR-D-01-T01 | deletes a Board Background', function(done) {
      if (!testBoardBackground) {
        done(new Error('Board Background not found.'));
      }
      const { id } = testBoardBackground;
      trello.members(myMemberId).boardBackgrounds(id).deleteBoardBackground()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('MBR-D-02-T01 | deletes a Board Star', function(done) {
      if (!testBoardStar) {
        done(new Error('Board Star not found.'));
      }
      const { id } = testBoardStar;
      trello.members(myMemberId).boardStars(id).deleteBoardStar()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it.skip('MBR-D-03-T01 | deletes a Custom Board Background', function(done) {
      if (!testCustomBackground) {
        done(new Error('Custom Board Background not found.'));
      }
      const { id } = testCustomBackground;
      trello.members(myMemberId).customBoardBackgrounds(id).deleteBoardBackground()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it.skip('MBR-D-04-T01 | deletes a Custom Sticker', function(done) {
      if (!testCustomSticker) {
        done(new Error('Custom Sticker not found.'));
      }
      const { id } = testCustomSticker;
      trello.members(myMemberId).customStickers(id).deleteSticker()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it.skip('MBR-D-05-T01 | deletes a Saved Search', function(done) {
      if (!testSavedSearch) {
        done(new Error('Saved Search not found.'));
      }
      const { id } = testSavedSearch;
      trello.members(myMemberId).savedSearches(id).deleteSavedSearch()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });
  });
});
