/* Internal dependencies */
import Trello from '../src/index';
import Logger from './logger';
const resources = require('./resources/resources.json');

describe('TEARDOWN | Test Cleanup', function() {
  let logger;
  let trello;

  before(function() {
    trello = new Trello(auth);
    logger = new Logger();
  });

  beforeEach(function() {
    logger.setTestName(this.currentTest.title);
  });

  const logResponse = (response) => logger.processResponse(response);

  describe('CHK-D | Checklist DELETE requests', function() {
    let checklistId = '';

    before(function(done) {
      if (resources.checklist) {
        checklistId = resources.checklist.id;
      } else {
        this.skip();
      }
      setTimeout(() => { done(); }, 1000);
    });

    it('CHK-D-02-T01 | deletes a Check Item from a Checklist', function(done) {
      const checkItemId = resources.checklist.checkItems[0].id;
      if (!checkItemId) {
        this.skip();
      }
      trello.checklists(checklistId).checkItems(checkItemId).deleteCheckItem()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('CHK-D-01-T01 | deletes a Checklist', function(done) {
      trello.checklists(checklistId).deleteChecklist()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });
  });

  describe('CAR-D | Card DELETE requests', function() {
    let cardId = '';

    before(function(done) {
      if (resources.card) {
        cardId = resources.card.id;
      } else {
        this.skip();
      }
      setTimeout(() => { done(); }, 1000);
    });

    it('CAR-D-10-T01 | deletes a Sticker from a Card', function(done) {
      const stickerId = resources.card.stickers[0].id;
      if (!stickerId) {
        this.skip();
      }
      trello.cards(cardId).stickers(stickerId).deleteSticker()
        .should.eventually.be.fulfilled
        .notify(done);
    });

    // @todo: Figure out how to get this working.
    it.skip('CAR-D-09-T01 | changes the Voting status for a Member on a Card', function(done) {
      trello.cards(cardId).membersVoted('[NEED ID]').rescindVote()
        .should.eventually.be.fulfilled
        .notify(done);
    });

    // @todo: Figure out how to get this working.
    it.skip('CAR-D-08-T01 | deletes a Member on a Card', function(done) {
      trello.cards(cardId).members('[NEED ID]').deleteMember()
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('CAR-D-07-T01 | deletes a Label on a Card', function(done) {
      const labelId = resources.card.label.id || '';
      if (!labelId) {
        done(new Error('Label not on Card.'));
      }
      trello.cards(cardId).labels(labelId).deleteLabel()
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('CAR-D-06-T01 | deletes a Checklist on a Card', function(done) {
      const checklistId = resources.card.checklistCopy.id || '';
      if (!checklistId) {
        this.skip();
      }
      trello.cards(cardId).checklists(checklistId).deleteChecklist()
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it.skip('CAR-D-05-T01 | deletes a Check Item on a Card', function(done) {
      const checkItemId = resources.card.checkItems[0].id;
      if (!checkItemId) {
        this.skip();
      }
      trello.cards(cardId).checkItem(checkItemId).deleteCheckItem()
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it.skip('CAR-D-04-T01 | deletes a Check Item on a Checklist on a Card', function(done) {
      const checklistId = resources.card.checklist.id || '';
      if (!checklistId) {
        this.skip();
      }
      const checkItemId = resources.card.checkItems[1].id;
      if (!checkItemId) {
        this.skip();
      }
      trello.cards(cardId).checklist(checklistId).checkItem(checkItemId).deleteCheckItem()
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('CAR-D-02-T01 | deletes a Comment on a Card', function(done) {
      const commentId = resources.card.comment.id;
      if (!commentId) {
        this.skip();
      }
      trello.cards(cardId).comments(commentId).deleteComment()
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('CAR-D-01-T01 | deletes a Card', function(done) {
      trello.cards(cardId).deleteCard()
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('CAR-D-01-T02 | deletes a Card converted from a Check Item', function(done) {
      const convertedCardId = resources.card.convertedCard.id;
      if (!convertedCardId) {
        this.skip();
      }
      trello.cards(convertedCardId).deleteCard()
        .should.eventually.be.fulfilled
        .notify(done);
    });
  });

  describe('LBL-D | Label DELETE requests', function() {
    before(function(done) {
      if (!resources.labels) {
        this.skip();
      }
      setTimeout(() => { done(); }, 1000);
    });

    it('LBL-D-01-T01 | deletes the first Label', function(done) {
      const labelId = resources.labels[0].id;
      if (!labelId) {
        this.skip();
      }
      trello.labels(labelId).deleteLabel()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('LBL-D-01-T02 | deletes the second Label', function(done) {
      const labelId = resources.labels[1].id;
      if (!labelId) {
        this.skip();
      }
      trello.labels(labelId).deleteLabel()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });
  });

  describe('BRD-D | Board DELETE requests', function() {
    let boardId = '';

    before(function(done) {
      if (resources.board) {
        boardId = resources.board.id;
      } else {
        this.skip();
      }
      setTimeout(() => { done(); }, 1000);
    });

    it('BRD-D-02-T01 | deletes a PowerUp', function(done) {
      trello.boards(boardId).deletePowerUp('cardAging')
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    // @todo: Don't skip this, update setup to accommodate for this test.
    it.skip('BRD-D-01-T01 | deletes a member', function(done) {
      trello.boards(boardId).members('[NEED ID]').deleteMember()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });
  });

  describe('ORG-D | Organization DELETE requests', function() {
    let orgId = '';

    before(function(done) {
      if (resources.org) {
        orgId = resources.org.id;
      } else {
        this.skip();
      }
      setTimeout(() => { done(); }, 1000);
    });

    it('ORG-D-06-T01 | deletes the Org Invite Restriction pref', function(done) {
      trello.organizations(orgId).prefs().deleteOrgInviteRestrict()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('ORG-D-05-T01 | deletes the Associated Domain pref', function(done) {
      trello.organizations(orgId).prefs().deleteAssociatedDomain()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it.skip('ORG-D-04-T01 | removes a Member from all Boards in the Organization', function(done) {
      trello.organizations(orgId).members('[NEED ID]').dissociateMemberFromAll()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it.skip('ORG-D-03-T01 | removes a Member from the Organization', function(done) {
      trello.organizations(orgId).members('[NEED ID]').dissociateMember()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('ORG-D-02-T01 | deletes a Logo', function(done) {
      trello.organizations(orgId).deleteLogo()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });

    it('ORG-D-01-T01 | deletes an Organization', function(done) {
      trello.organizations(orgId).deleteOrganization()
        .then(logResponse)
        .should.eventually.be.fulfilled
        .notify(done);
    });
  });
});
