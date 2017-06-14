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

    it('CAR-U-14-T01 | updates the name', (done) => {
      trello.cards(cardId).updateName('Test Card 2')
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('CAR-U-15-T01 | updates the position', (done) => {
      trello.cards(cardId).updatePosition('top')
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });
  });
});
