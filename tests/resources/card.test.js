/* Internal dependencies */
import Trello from '../../src/index';
import Logger from '../logger';

describe('CAR | Card Resource', function() {
  let trello;
  let logger;

  let cardData = {};
  let cardId = '';

  before(function() {
    trello = new Trello(auth);
    logger = new Logger();
    if (resources.card) {
      cardId = resources.card.id;
    } else {
      this.skip();
    }
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

  describe('CAR-G | Card GET Requests', function() {
    before(function(done) {
      setTimeout(() => { done(); }, 1500);
    });

    it('CAR-G-01-T01 | gets a Card', (done) => {
      trello.cards(cardId).getCard()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('CAR-G-01-T02 | gets a Card with some arguments', function(done) {
      trello.cards(cardId).getCard({
        actions: 'none',
        members: true,
        stickers: true,
      })
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('CAR-G-01-T03 | gets a Card with all arguments', function(done) {
      trello.cards(cardId).getCard({
        actions: ['createCard', 'commentCard'],
        actionsEntities: true,
        actionsDisplay: true,
        actionsLimit: 20,
        actionFields: 'all',
        actionMemberCreatorFields: 'username',
        attachments: true,
        members: true,
        memberFields: 'username',
        membersVoted: true,
        membersVotedFields: 'username',
        checkItemStates: true,
        checkItemStateFields: 'all',
        checklists: 'all',
        checklistFields: ['name', 'pos', 'idBoard'],
        board: true,
        list: false,
        listFields: ['name', 'pos'],
        pluginData: true,
        stickers: true,
        stickerFields: 'all',
        fields: 'all',
      })
        .then(logResponse)
        .then((response) => {
          cardData = response.data || {};
          assert.isDefined(response.data);
          done();
        })
        .catch(error => done(error));
    });

    it('CAR-G-02-T01 | gets the value of the name field for the Card', function(done) {
      trello.cards(cardId).getFieldValue('name')
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('CAR-G-03-T01 | gets the associated Actions', function(done) {
      trello.cards(cardId).actions().getActions()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('CAR-G-03-T02 | gets up to 10 Actions that are of type updateCard with filter applied', function(done) {
      trello.cards(cardId).actions().getActions({
        filter: 'updateCard',
        limit: 10,
      })
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('CAR-G-04-T01 | gets all the Attachments', function(done) {
      trello.cards(cardId).attachments().getAttachments()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('CAR-G-05-T01 | gets the associated Attachment with the specified Id', function(done) {
      if (!cardData.attachments.length) {
        done(new Error('Attachment not found on Card.'));
      }
      const attachmentId = cardData.attachments[0].id;
      trello.cards(cardId).attachments(attachmentId).getAttachment()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('CAR-G-06-T01 | gets the associated Board', function(done) {
      trello.cards(cardId).board().getBoard()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('CAR-G-06-T02 | gets only the specified fields for the associated Board', function(done) {
      trello.cards(cardId).board().getBoard({
        fields: ['desc', 'name'],
      })
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('CAR-G-07-T01 | gets the value of the name field of the associated Board', function(done) {
      trello.cards(cardId).board().getFieldValue('name')
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('CAR-G-08-T01 | gets the associated Check Item States', function(done) {
      trello.cards(cardId).checkItemStates().getCheckItemStates()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('CAR-G-09-T01 | gets the associated Checklists', function(done) {
      trello.cards(cardId).checklists().getChecklists()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('CAR-G-09-T02 | gets only the specified fields for the associated Checklists', function(done) {
      trello.cards(cardId).checklists().getChecklists({
        fields: ['idBoard', 'name', 'pos'],
      })
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('CAR-G-10-T01 | gets the associated Check Item with the specified Id', function(done) {
      if (!resources.card.checkItems.length) {
        done(new Error('Check Items not on Card.'));
      }
      const checkItemId = resources.card.checkItems[0].id;
      trello.cards(cardId).checkItem(checkItemId).getCheckItem()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('CAR-G-11-T01 | gets the associated List', function(done) {
      trello.cards(cardId).list().getList()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('CAR-G-11-T02 | gets only the specified fields for the associated List', function(done) {
      trello.cards(cardId).list().getList({
        fields: ['name', 'pos'],
      })
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('CAR-G-12-T01 | gets the value of the name field of the associated List', function(done) {
      trello.cards(cardId).list().getFieldValue('name')
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('CAR-G-13-T01 | gets the associated Members', function(done) {
      trello.cards(cardId).members().getMembers()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('CAR-G-13-T02 | gets the specified fields for the associated Members', function(done) {
      trello.cards(cardId).members().getMembers({
        fields: ['fullName', 'initials'],
      })
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('CAR-G-14-T01 | gets the associated Members Voted', function(done) {
      trello.cards(cardId).membersVoted().getMembers()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('CAR-G-15-T01 | gets the associated Plugin Data', function(done) {
      trello.cards(cardId).getPluginData()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('CAR-G-16-T01 | gets the associated Stickers', function(done) {
      trello.cards(cardId).stickers().getStickers()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('CAR-G-16-T02 | gets the specified fields for the associated Stickers', function(done) {
      trello.cards(cardId).stickers().getStickers({
        fields: ['left', 'top'],
      })
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('CAR-G-17-T01 | gets the associated Sticker with the specified Id', function(done) {
      if (!cardData.stickers.length) {
        done(new Error('Sticker not found on Card.'));
      }
      const stickerId = cardData.stickers[0].id;
      trello.cards(cardId).stickers(stickerId).getSticker()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });
  });

  describe('CAR-U | Card PUT requests', function() {
    before(function(done) {
      setTimeout(() => { done(); }, 1500);
    });

    const getFirstCheckItem = () => {
      if (resources.card.checkItems.length) {
        return resources.card.checkItems[0] || {};
      }
      return {};
    };

    const getTrelloChecklistCheckItem = () => {
      const firstCheckItem = getFirstCheckItem();
      if (!firstCheckItem) {
        return ;
      }
      const checklistId = firstCheckItem.idChecklist;
      const checkItemId = firstCheckItem.id;
      return trello.cards(cardId).checklist(checklistId).checkItem(checkItemId);
    };

    it('CAR-U-01-T01 | updates a Card', function(done) {
      trello.cards(cardId).updateCard({
        name: 'CAR-U-01-T01',
        desc: 'This is the updated description.',
      })
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('CAR-U-02-T01 | updates an associated Comment', function(done) {
      if (!resources.card.comment) {
        done(new Error('Comment not found.'));
      }
      const commentId = resources.card.comment.id;
      trello.cards(cardId).comments(commentId).updateComment('CAR-U-02-T01')
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('CAR-U-03-T01 | updates the name of an associated Check Item on a Checklist with the specified Id', function(done) {
      const trelloCheckItem = getTrelloChecklistCheckItem();
      if (!trelloCheckItem) {
        done(new Error('Check Item not on Card.'))
      }
      trelloCheckItem.updateName('CAR-U-03-T01')
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('CAR-U-04-T01 | updates the position of an associated Check Item on a Checklist with the specified Id', function(done) {
      const trelloCheckItem = getTrelloChecklistCheckItem();
      if (!trelloCheckItem) {
        done(new Error('Check Item not on Card.'))
      }
      trelloCheckItem.updatePosition('top')
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('CAR-U-05-T01 | updates the state of an associated Check Item on a Checklist with the specified Id', function(done) {
      const trelloCheckItem = getTrelloChecklistCheckItem();
      if (!trelloCheckItem) {
        done(new Error('Check Item not on Card.'))
      }
      trelloCheckItem.updateState('complete')
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('CAR-U-06-T01 | updates a Check Item on a Checklist with the specified Id', function(done) {
      const trelloCheckItem = getTrelloChecklistCheckItem();
      if (!trelloCheckItem) {
        done(new Error('Check Item not on Card.'))
      }
      trelloCheckItem.updateCheckItem({
        name: 'CAR-U-06-T01',
        pos: 'top',
      })
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('CAR-U-07-T01 | updates a Check Item with the specified Id', function(done) {
      const firstCheckItem = getFirstCheckItem();
      if (!firstCheckItem) {
        done(new Error('Check Item not on Card.'));
      }
      const checkItemId = firstCheckItem.id;
      trello.cards(cardId).checkItem(checkItemId).updateCheckItem({
        name: 'CAR-U-07-T01',
        pos: 'top',
      })
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('CAR-U-08-T01 | updates the closed status', function(done) {
      trello.cards(cardId).updateClosedStatus(false)
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('CAR-U-09-T01 | updates the description', function(done) {
      trello.cards(cardId).updateDescription('CAR-U-09-T01')
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('CAR-U-10-T01 | updates the due date', function(done) {
      trello.cards(cardId).updateDueDate(null)
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('CAR-U-11-T01 | updates the due complete status', function(done) {
      trello.cards(cardId).updateDueComplete(false)
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    // @todo: Get an Attachment Id for testing.
    it.skip('CAR-U-12-T01 | updates the Attachment cover image', function(done) {
      trello.cards(cardId).updateAttachmentCoverImage('[NEED ID]')
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('CAR-U-13-T01 | moves the Card to a different Board', function(done) {
      if (!resources.board) {
        done(new Error('Board not found.'))
      }
      const boardId = resources.board.id;
      trello.cards(cardId).moveToBoard(boardId)
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('CAR-U-14-T01 | moves the Card to a different List', function(done) {
      if (!resources.list) {
        done(new Error('List not found.'))
      }
      const listId = resources.list.id;
      trello.cards(cardId).moveToList(listId)
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('CAR-U-15-T01 | updates the member associations', function(done) {
      if (!resources.member) {
        done(new Error('Member not found.'));
      }
      const memberId = resources.member.id;
      trello.cards(cardId).associateMembers([ memberId ])
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('CAR-U-16-T01 | updates the name', function(done) {
      trello.cards(cardId).updateName('CAR-U-16-T01')
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('CAR-U-17-T01 | updates the position', function(done) {
      trello.cards(cardId).updatePosition('top')
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('CAR-U-18-T01 | updates an associated Sticker', function(done) {
      if (!resources.card.stickers.length) {
        done(new Error('Stickers not on Card.'));
      }
      const stickerId = resources.card.stickers[0].id;
      trello.cards(cardId).stickers(stickerId).updateSticker({
        top: 12,
        left: 12,
      })
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('CAR-U-19-T01 | updates the subscribed status', function(done) {
      trello.cards(cardId).updateSubscribed(true)
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });
  });
});
