/* Internal dependencies */
import Trello from '../../src/index';
import { auth, getTimeForTest, resourceIds, Logger } from '../helpers';

describe('CAR | Card Resource', function() {
  const {
    attachmentId,
    cardId,
    checkItemId,
    checklistId,
    commentId,
    labelId,
    listId,
    stickerId,
  } = resourceIds;
  let trello;
  let logger;

  before(function() {
    trello = new Trello(auth);
    logger = new Logger();
  });

  beforeEach(function() {
    logger.setTestName(this.currentTest.title);
  });

  after(function(done) {
    logger.writeResultsToFile('card')
      .then(() => done())
      .catch(error => done(error));
  });

  const logResponse = (response) => logger.processResponse(response);

  describe('CAR-G | Card GET Requests', () => {
    before(function(done) {
      setTimeout(() => { done(); }, 3000);
    });

    it('CAR-G-01-T01 | gets a Card', (done) => {
      trello.cards(cardId).getCard()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('CAR-G-01-T02 | gets a Card with some arguments', (done) => {
      trello.cards(cardId).getCard({
        actions: 'none',
        members: true,
        stickers: true,
      })
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('CAR-G-01-T03 | gets a Card with all arguments', (done) => {
      trello.cards(cardId).getCard({
        actions: 'none',
        actionsEntities: true,
        actionsDisplay: true,
        actionsLimit: 20,
        actionFields: 'type',
        actionMemberCreatorFields: 'username',
        attachments: false,
        attachmentFields: 'name',
        members: false,
        memberFields: 'username',
        membersVoted: false,
        membersVotedFields: 'username',
        checkItemStates: false,
        checkItemStateFields: 'all',
        checklists: 'all',
        checklistFields: ['name', 'pos', 'idBoard'],
        board: true,
        boardFields: 'name',
        list: false,
        listFields: ['name', 'pos'],
        pluginData: true,
        stickers: false,
        stickerFields: 'all',
        fields: ['name', 'desc'],
      })
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('CAR-G-02-T01 | gets the value of the name field for the Card', (done) => {
      trello.cards(cardId).getFieldValue('name')
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('CAR-G-03-T01 | gets the associated Actions', (done) => {
      trello.cards(cardId).actions().getActions()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('CAR-G-03-T02 | gets up to 10 Actions that are of type updateCard with filter applied', (done) => {
      trello.cards(cardId).actions().getActions({
        filter: 'updateCard',
        limit: 10,
      })
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('CAR-G-04-T01 | gets all the Attachments', (done) => {
      trello.cards(cardId).attachments().getAttachments()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('CAR-G-05-T01 | gets the associated Attachment with the specified Id', (done) => {
      trello.cards(cardId).attachments(attachmentId).getAttachment()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('CAR-G-06-T01 | gets the associated Board', (done) => {
      trello.cards(cardId).board().getBoard()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('CAR-G-06-T02 | gets only the specified fields for the associated Board', (done) => {
      trello.cards(cardId).board().getBoard({
        fields: ['desc', 'name'],
      })
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('CAR-G-07-T01 | gets the value of the name field of the associated Board', (done) => {
      trello.cards(cardId).board().getFieldValue('name')
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('CAR-G-08-T01 | gets the associated Check Item States', (done) => {
      trello.cards(cardId).checkItemStates().getCheckItemStates()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('CAR-G-09-T01 | gets the associated Checklists', (done) => {
      trello.cards(cardId).checklists().getChecklists()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('CAR-G-09-T02 | gets only the specified fields for the associated Checklists', (done) => {
      trello.cards(cardId).checklists().getChecklists({
        fields: ['idBoard', 'name', 'pos'],
      })
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('CAR-G-10-T01 | gets the associated Checklist Item with the specified Id', (done) => {
      trello.cards(cardId).checkItem(checkItemId).getCheckItem()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('CAR-G-11-T01 | gets the associated List', (done) => {
      trello.cards(cardId).list().getList()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('CAR-G-11-T02 | gets only the specified fields for the associated List', (done) => {
      trello.cards(cardId).list().getList({
        fields: ['name', 'pos'],
      })
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('CAR-G-12-T01 | gets the value of the name field of the associated List', (done) => {
      trello.cards(cardId).list().getFieldValue('name')
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('CAR-G-13-T01 | gets the associated Members', (done) => {
      trello.cards(cardId).members().getMembers()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('CAR-G-13-T02 | gets the specified fields for the associated Members', (done) => {
      trello.cards(cardId).members().getMembers({
        fields: ['fullName', 'initials'],
      })
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('CAR-G-14-T01 | gets the associated Members Voted', (done) => {
      trello.cards(cardId).membersVoted().getMembers()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('CAR-G-15-T01 | gets the associated Plugin Data', (done) => {
      trello.cards(cardId).getPluginData()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('CAR-G-16-T01 | gets the associated Stickers', (done) => {
      trello.cards(cardId).stickers().getStickers()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('CAR-G-16-T02 | gets the specified fields for the associated Stickers', (done) => {
      trello.cards(cardId).stickers().getStickers({
        fields: ['left', 'top'],
      })
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('CAR-G-17-T01 | gets the associated Sticker with the specified Id', (done) => {
      trello.cards(cardId).stickers(stickerId).getSticker()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });
  });

  describe('CAR-U | Card PUT requests', () => {
    before(function(done) {
      setTimeout(() => { done(); }, 3000);
    });

    it('CAR-U-01-T01 | updates a Card', (done) => {
      trello.cards(cardId).updateCard({
        desc: 'This is the updated description.',
      })
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('CAR-U-02-T01 | updates an associated Comment', (done) => {
      const commentText = `Updated text from test ran on ${getTimeForTest()}`;
      trello.cards(cardId).comments(commentId).updateComment(commentText)
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('CAR-U-03-T01 | updates the name of an associated Checklist Item on a Checklist with the specified Id', (done) => {
      trello
        .cards(cardId)
        .checklist(checklistId)
        .checkItem(checkItemId).updateName('Test Item Update')
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('CAR-U-04-T01 | updates the position of an associated Checklist Item on a Checklist with the specified Id', (done) => {
      trello
        .cards(cardId)
        .checklist(checklistId)
        .checkItem(checkItemId).updatePosition('top')
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('CAR-U-05-T01 | updates the state of an associated Checklist Item on a Checklist with the specified Id', (done) => {
      trello
        .cards(cardId)
        .checklist(checklistId)
        .checkItem(checkItemId).updateState('complete')
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('CAR-U-06-T01 | updates a Checklist Item on a Checklist with the specified Id', (done) => {
      trello
        .cards(cardId)
        .checklist(checklistId)
        .checkItem(checkItemId).updateCheckItem({
          name: 'Test Check Item',
          pos: 'top',
        })
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('CAR-U-07-T01 | updates a Checklist Item with the specified Id', (done) => {
      trello.cards(cardId).checkItem(checkItemId).updateCheckItem({
        name: 'Test Check Item 2',
        pos: 'top',
        idChecklistCurrent: checklistId,
      })
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('CAR-U-08-T01 | updates the closed status', (done) => {
      trello.cards(cardId).updateClosedStatus(false)
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('CAR-U-09-T01 | updates the description', (done) => {
      trello.cards(cardId).updateDescription('Test Card 1')
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('CAR-U-10-T01 | updates the due date', (done) => {
      trello.cards(cardId).updateDueDate(null)
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('CAR-U-11-T01 | updates the due complete status', (done) => {
      trello.cards(cardId).updateDueComplete(false)
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    // @todo: Get an Attachment Id for testing.
    it.skip('CAR-U-12-T01 | updates the Attachment cover image', (done) => {
      trello.cards(cardId).updateAttachmentCoverImage('[NEED ID]')
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    /**
     * @skip CAR-U-13
     * @reason Excessive Data
     * @passed 06.13.17
     */
    it.skip('CAR-U-13-T01 | moves the Card to a different Board', (done) => {
      const testCardId = 'cVrYQADi';
      const targetBoardId = '594076087cb178df0a589fda';
      trello.cards(testCardId).board(targetBoardId).associateBoard()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    /**
     * @skip CAR-U-14
     * @reason Excessive Data
     * @passed 06.13.17
     */
    it.skip('CAR-U-14-T01 | moves the Card to a different List', (done) => {
      const testCardId = 'cVrYQADi';
      const targetListId = '594083ce2f460a14d5845dd8';
      trello.cards(testCardId).list(targetListId).associateList()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    // @todo: Figure out how to get this working.
    it.skip('CAR-U-15-T01 | updates the member associations', (done) => {
      trello.cards(cardId).members().associateMembers([
        'Member Id 1',
        'Member Id 2',
      ])
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('CAR-U-16-T01 | updates the name', (done) => {
      trello.cards(cardId).updateName('Test Card 2')
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('CAR-U-17-T01 | updates the position', (done) => {
      trello.cards(cardId).updatePosition('top')
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('CAR-U-18-T01 | updates an associated Sticker', (done) => {
      trello.cards(cardId).stickers(stickerId).updateSticker({
        top: 12,
        left: 12,
      })
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('CAR-U-19-T01 | updates the subscribed status', (done) => {
      trello.cards(cardId).updateSubscribed(true)
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });
  });

  describe('CAR-P | Card POST Requests', () => {
    before(function (done) {
      setTimeout(() => { done(); }, 3000);
    });

    /**
     * @skip CAR-P-01
     * @reason Excessive Data
     * @passed 06.13.17
     */
    it.skip('CAR-P-01-T01 | creates a new Card', (done) => {
      trello.cards().addCard({
        idList: listId,
        name: 'Test Card from Test',
        desc: 'This is a test description',
        pos: 'top',
      })
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    /**
     * @skip CAR-P-02
     * @reason Excessive Data
     * @passed 06.13.17
     */
    it.skip('CAR-P-02-T01 | adds a Comment', (done) => {
      trello.cards(cardId).comments().addComment('This is a new comment.')
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    // @todo: Figure out how to get this working.
    it.skip('CAR-P-03-T01 | uploads an Attachment', (done) => {
      trello.cards(cardId).attachments().uploadAttachment()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    /**
     * @skip CAR-P-04
     * @reason Excessive Data
     * @passed 06.13.17
     */
    it.skip('CAR-P-04-T01 | adds a Checklist Item to a Checklist', (done) => {
      trello
        .cards(cardId)
        .checklist(checklistId)
        .checkItem().addCheckItem({
          name: 'New Checklist Item',
          pos: 2,
        })
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    /**
     * @skip CAR-P-05
     * @reason Excessive Data
     * @passed 06.13.17
     */
    it.skip('CAR-P-05-T01 | converts a Checklist Item to a Card', (done) => {
      const newCheckItemId = '5940a390fa03d31e7f6d509b';
      trello
        .cards(cardId)
        .checklist(checklistId)
        .checkItem(newCheckItemId).convertToCard()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    /**
     * @skip CAR-P-06
     * @reason Excessive Data
     * @passed 06.13.17
     */
    it.skip('CAR-P-06-T01 | creates a new Checklist on a Card', (done) => {
      trello.cards(cardId).checklists().addChecklist({
        name: 'New Checklsit',
        pos: 'top',
      })
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('CAR-P-07-T01 | associates a Label with a Card', (done) => {
      trello.cards(cardId).labels(labelId).associateLabel()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    // @todo: Get another Member ID to test this.
    it.skip('CAR-P-08-T01 | associates a Member with a Card', (done) => {
      trello.cards(cardId).members().associateMember()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    /**
     * @skip CAR-P-09
     * @reason Excessive Data
     * @passed 06.13.17
     */
    it.skip('CAR-P-09-T01 | adds a Label to a Card', (done) => {
      trello.cards(cardId).labels().addLabel({
        name: 'Test Label',
        color: 'blue',
      })
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('CAR-P-10-T01 | marks associated Notifications as read', (done) => {
      trello.cards(cardId).markAssociatedNotificationsRead()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    // @todo: Need member ID to vote on card.
    it.skip('CAR-P-11-T01 | updates the Members Voted on a Card', (done) => {
      trello.cards(cardId).membersVoted('[NEED ID]').associateMember()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    /**
     * @skip CAR-P-12
     * @reason Excessive Data
     * @passed 06.13.17
     */
    it.skip('CAR-P-12-T01 | adds a Sticker to a Card', (done) => {
      trello.cards(cardId).stickers().addSticker({
        image: 'check',
        top: 0,
        left: 0,
        zIndex: 3,
      })
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });
  });
});
