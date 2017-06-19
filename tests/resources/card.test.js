/* Internal dependencies */
import Trello from '../../src/index';
import { Logger } from '../helpers';
const resources = require('./resources.json');

describe.only('CAR | Card Resource', function() {
  let trello;
  let logger;

  let testCard = {};
  let attachmentId = '';
  let cardId = '';

  before(function(done) {
    trello = new Trello(auth);
    logger = new Logger();
    setTimeout(() => { done(); }, 3000);
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

  const getFirstCheckItem = (hasChecklist) => {
    let trelloChecklist = trello.cards(cardId);
    const { checklist } = testCard;
    if (hasChecklist) {
      if (!checklist) {
        return { error: 'Checklist not found.' };
      }
      trelloChecklist = trelloChecklist.checklist(checklist.id);
    }
    const { checkItems } = checklist;
    if (!checkItems.length) {
      return { error: 'Check Items not found.' };
    }
    return trelloChecklist.checkItem(checkItems[0].id);
  };

  describe('CAR-P | Card POST Requests', () => {
    before(function (done) {
      setTimeout(() => { done(); }, 1000);
    });

    it('CAR-P-01-T01 | adds a Card to a List', (done) => {
      const { tfwListA } = resources;
      if (!tfwListA) {
        done(new Error('List A not found.'));
      }
      trello.cards().addCard({
        idList: tfwListA.id,
        name: 'tfwTestCard',
        desc: 'This is a test description',
        pos: 'top',
      })
        .then(logResponse)
        .then((response) => {
          testCard = response.data || {};
          cardId = testCard.id;
          assert.isDefined(response.data);
          done();
        })
        .catch(error => done(error));
    });

    it('CAR-P-02-T01 | adds a Comment to a Card', (done) => {
      if (!testCard) {
        done(new Error('Test Card not found.'));
      }
      trello.cards(cardId).comments().addComment('This is a test comment')
        .then(logResponse)
        .then((response) => {
          testCard.comment = response.data || {};
          assert.isDefined(response.data);
          done();
        })
        .catch(error => done(error));
    });

    // @todo: Figure out how to get this working.
    it.skip('CAR-P-03-T01 | uploads an Attachment', (done) => {
      trello.cards(cardId).attachments().uploadAttachment()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('CAR-P-06-T01 | adds a Checklist to a Card', (done) => {
      if (!testCard) {
        done(new Error('Test Card not found.'));
      }
      trello.cards(cardId).checklists().addChecklist({
        name: 'tfwTestChecklist',
      })
        .then(logResponse)
        .then((response) => {
          testCard.checklist = response.data || {};
          assert.isDefined(response.data);
          done();
        })
        .catch(error => done(error));
    });

    it('CAR-P-04-T01 | adds a Checklist Item to a Checklist', (done) => {
      if (!testCard) {
        done(new Error('Test Card not found.'));
      }
      if (!testCard.checklist) {
        done(new Error('Test Checklist not found.'));
      }
      const trelloCheckItem = trello
        .cards(cardId)
        .checklist(testCard.checklist.id)
        .checkItem();
      Promise.all([
        trelloCheckItem.addCheckItem({ name: 'Check Item 1' }),
        trelloCheckItem.addCheckItem({ name: 'Check Item 2' }),
      ])
        .then(logResponse)
        .then((responses) => {
          responses.forEach((response) => {
            testCard.checklist.checkItems.push(response.data || {});
          });
          expect(testCard.checklist.checkItems).to.have.length.above(1);
          done();
        })
        .catch(error => done(error));
    });

    it('CAR-P-05-T01 | converts a Checklist Item to a Card', (done) => {
      if (!testCard) {
        done(new Error('Test Card not found.'));
      }
      if (!testCard.checklist) {
        done(new Error('Test Checklist not found.'));
      }
      const trelloChecklist = trello
        .cards(cardId)
        .checklist(testCard.checklist.id);
      trelloChecklist.checkItem().addCheckItem({
        name: 'tfwTestCheckItem',
      })
        .then(logResponse)
        .then((response) => {
          trelloChecklist.checkItem(response.data.id).convertToCard()
            .should.eventually.be.fulfilled
            .notify(done);
        })
        .catch(error => done(error));
    });

    it('CAR-P-07-T01 | associates a Label with a Card', (done) => {
      const { tfwLabelA } = resources;
      if (!testCard) {
        done(new Error('Test Card not found.'));
      }
      if (!tfwLabelA) {
        done(new Error('Test Label not found.'));
      }
      trello.cards(cardId).labels(tfwLabelA.id).associateLabel()
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

    it('CAR-P-09-T01 | adds a Label to a Card', (done) => {
      if (!testCard) {
        done(new Error('Test Card not found.'));
      }
      trello.cards(cardId).labels().addLabel({
        name: 'tfwTestLabel',
        color: 'blue',
      })
        .then(logResponse)
        .then((response) => {
          testCard.label = response.data || {};
          assert.isDefined(response.data);
          done();
        })
        .catch(error => done(error));
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

    it('CAR-P-12-T01 | adds a Sticker to a Card', (done) => {
      if (!testCard) {
        done(new Error('Test Card not found.'));
      }
      trello.cards(cardId).stickers().addSticker({
        image: 'check',
        top: 0,
        left: 0,
        zIndex: 3,
      })
        .then(logResponse)
        .then((response) => {
          testCard.sticker = response.data || {};
          assert.isDefined(response.data);
          done();
        })
        .catch(error => done(error));
    });
  });

  describe('CAR-G | Card GET Requests', () => {
    before(function(done) {
      if (!testCard) {
        done(new Error('Test Card not found.'));
      }
      done();
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
      const trelloCheckItem = getFirstCheckItem(false);
      trelloCheckItem.getCheckItem()
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
      const { sticker } = testCard;
      if (!sticker) {
        done(new Error('Test Sticker not found.'));
      }
      trello.cards(cardId).stickers(sticker.id).getSticker()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });
  });

  describe('CAR-U | Card PUT requests', () => {
    before(function(done) {
      if (!testCard) {
        done(new Error('Test Card not found.'));
      }
      done();
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
      const { comment } = testCard;
      if (!comment) {
        done(new Error('Comment not found.'));
      }
      trello.cards(cardId).comments(comment.id).updateComment('Updated text.')
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('CAR-U-03-T01 | updates the name of an associated Checklist Item on a Checklist with the specified Id', (done) => {
      const trelloCheckItem = getFirstCheckItem(true);
      if (trelloCheckItem.error) {
        done(new Error(trelloCheckItem.error));
      }
      trelloCheckItem.updateName('Test Item Update')
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('CAR-U-04-T01 | updates the position of an associated Checklist Item on a Checklist with the specified Id', (done) => {
      const trelloCheckItem = getFirstCheckItem(true);
      trelloCheckItem.updatePosition('top')
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('CAR-U-05-T01 | updates the state of an associated Checklist Item on a Checklist with the specified Id', (done) => {
      const trelloCheckItem = getFirstCheckItem(true);
      trelloCheckItem.updateState('complete')
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('CAR-U-06-T01 | updates a Checklist Item on a Checklist with the specified Id', (done) => {
      const trelloCheckItem = getFirstCheckItem(true);
      trelloCheckItem.updateCheckItem({
        name: 'Test Check Item',
        pos: 'top',
      })
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('CAR-U-07-T01 | updates a Checklist Item with the specified Id', (done) => {
      const trelloCheckItem = getFirstCheckItem(false);
      trelloCheckItem.updateCheckItem({
        name: 'Test Check Item 2',
        pos: 'top',
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

    it('CAR-U-13-T01 | moves the Card to a different Board', (done) => {
      const { tfwBoardB } = resources;
      if (!tfwBoardB) {
        done(new Error('Board B not found.'))
      }
      trello.cards(cardId).board(tfwBoardB.id).associateBoard()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    // @fix: This test isn't working.
    it.skip('CAR-U-14-T01 | moves the Card to a different List', (done) => {
      const { tfwListB } = resources;
      if (!tfwListB) {
        done(new Error('List B not found.'))
      }
      trello.cards(cardId).list(tfwListB.id).associateList()
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
      const { sticker } = testCard;
      if (!sticker) {
        done(new Error('Test Sticker not found.'));
      }
      trello.cards(cardId).stickers(sticker.id).updateSticker({
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

  describe('CAR-D | Card DELETE requests', () => {
    before(function(done) {
      setTimeout(() => { done(); }, 1000);
    });

    it('CAR-D-02-T01 | deletes a Comment on a Card', (done) => {
      const { comment } = testCard;
      if (!comment) {
        done(new Error('Comment not found.'));
      }
      trello.cards(cardId).comments(comment.id).deleteComment()
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('CAR-D-04-T01 | deletes a Check Item on a Checklist on a Card', (done) => {
      const trelloCheckItem = getFirstCheckItem(true);
      if (trelloCheckItem.error) {
        done(new Error(trelloCheckItem.error));
      }
      trelloCheckItem.deleteCheckItem()
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('CAR-D-05-T01 | deletes a Check Item on a Card', (done) => {
      const trelloCheckItem = getFirstCheckItem(false);
      if (trelloCheckItem.error) {
        done(new Error(trelloCheckItem.error));
      }
      trelloCheckItem.deleteCheckItem()
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('CAR-D-06-T01 | deletes a Checklist on a Card', (done) => {
      const { checklist } = testCard;
      if (!checklist) {
        done(new Error('Test Checklist not found.'));
      }
      trello.cards(cardId).checklists(checklist.id).deleteChecklist()
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('CAR-D-07-T01 | deletes a Label on a Card', (done) => {
      const { label } = testCard;
      if (!label) {
        done(new Error('Test Label not found.'));
      }
      trello.cards(cardId).labels(label.id).deleteLabel()
        .should.eventually.be.fulfilled
        .notify(done);
    });

    // @todo: Figure out how to get this working.
    it.skip('CAR-D-08-T01 | deletes a Member on a Card', (done) => {
      trello.cards(cardId).members('[NEED ID]').deleteMember()
        .should.eventually.be.fulfilled
        .notify(done);
    });

    // @todo: Figure out how to get this working.
    it.skip('CAR-D-09-T01 | changes the Voting status for a Member', (done) => {
      trello.cards(cardId).membersVoted('[NEED ID]').rescindVote()
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('CAR-D-10-T01 | deletes a Sticker', (done) => {
      const { sticker } = testCard;
      if (!sticker) {
        done(new Error('Test Sticker not found.'));
      }
      trello.cards(cardId).stickers(sticker.id).deleteSticker()
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('CAR-D-01-T01 | deletes a Card', (done) => {
      trello.cards(cardId).deleteCard()
        .should.eventually.be.fulfilled
        .notify(done);
    });
  });
});
