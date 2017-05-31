/* Internal dependencies */
import { auth, boardId, cardId } from '../helpers';
import BaseResource from '../../src/base-resource';

describe('Base Entity', () => {
  const authSuffix = `key=${auth.key}&token=${auth.token}`;

  let baseEntity;

  describe('Endpoint Builder', () => {
    describe('No Parent', () => {
      before(() => {
        baseEntity = new BaseResource(auth, 'card', cardId);
      });

      it('builds an endpoint with the root path', () => {
        const actualValue = baseEntity.getEndpoint('/');
        const expectedValue = `cards/${cardId}?${authSuffix}`;
        expect(actualValue).to.equal(expectedValue);
      });

      it('builds an endpoint with a single string queryArg', () => {
        const actualValue = baseEntity.getEndpoint('/', {
          actionsFormat: 'count',
        });
        const expectedValue =
          `cards/${cardId}?actions_format=count&${authSuffix}`;
        expect(actualValue).to.equal(expectedValue);
      });

      it('builds an endpoint with a single boolean queryArg', () => {
        const actualValue = baseEntity.getEndpoint('/', {
          actionsEntities: true,
        });
        const expectedValue =
          `cards/${cardId}?actions_entities=true&${authSuffix}`;
        expect(actualValue).to.equal(expectedValue);
      });

      it('builds an endpoint with a single array queryArg', () => {
        const actualValue = baseEntity.getEndpoint('/', {
          actions: ['copyBoard', 'copyCard'],
        });
        const expectedValue =
          `cards/${cardId}?actions=copyBoard,copyCard&${authSuffix}`;
        expect(actualValue).to.equal(expectedValue);
      });

      it('builds an endpoint with a single nested queryArg', () => {
        const actualValue = baseEntity.getEndpoint('/', {
          prefs: {
            selfJoin: true,
            separator: '/',
          }
        });
        const expectedValue =
          `cards/${cardId}?prefs/selfJoin=true&${authSuffix}`;
        expect(actualValue).to.equal(expectedValue);
      });

      it('builds an endpoint with a several queryArgs', () => {
        const actualValue = baseEntity.getEndpoint('/', {
          actions: ['copyBoard', 'copyCard'],
          actionsEntities: true,
          actionsFormat: 'count',
          prefs: {
            selfJoin: true,
            invitations: 'admins',
            separator: '/',
          }
        });
        const expectedValue =
          `cards/${cardId}?actions=copyBoard,copyCard&actions_entities=true&` +
          `actions_format=count&prefs/selfJoin=true&prefs/invitations=admins&` +
          `${authSuffix}`;
        expect(actualValue).to.equal(expectedValue);
      });
    });

    describe('With Parent', () => {
      before(() => {
        baseEntity = new BaseResource(auth, 'card', cardId, 'board', boardId);
      });

      it('builds an endpoint with the root path', () => {
        const actualValue = baseEntity.getEndpoint('/');
        const expectedValue = `boards/${boardId}/cards/${cardId}?${authSuffix}`;
        expect(actualValue).to.equal(expectedValue);
      });

      it('builds an endpoint with a single string queryArg', () => {
        const actualValue = baseEntity.getEndpoint('/', {
          actionsFormat: 'count',
        });
        const expectedValue =
          `boards/${boardId}/cards/${cardId}?actions_format=count&${authSuffix}`;
        expect(actualValue).to.equal(expectedValue);
      });

      it('builds an endpoint with a single boolean queryArg', () => {
        const actualValue = baseEntity.getEndpoint('/', {
          actionsEntities: true,
        });
        const expectedValue =
          `boards/${boardId}/cards/${cardId}?actions_entities=true&${authSuffix}`;
        expect(actualValue).to.equal(expectedValue);
      });

      it('builds an endpoint with a single array queryArg', () => {
        const actualValue = baseEntity.getEndpoint('/', {
          actions: ['copyBoard', 'copyCard'],
        });
        const expectedValue =
          `boards/${boardId}/cards/${cardId}?actions=copyBoard,copyCard&${authSuffix}`;
        expect(actualValue).to.equal(expectedValue);
      });

      it('builds an endpoint with a single nested queryArg', () => {
        const actualValue = baseEntity.getEndpoint('/', {
          prefs: {
            selfJoin: true,
            separator: '/',
          }
        });
        const expectedValue =
          `boards/${boardId}/cards/${cardId}?prefs/selfJoin=true&${authSuffix}`;
        expect(actualValue).to.equal(expectedValue);
      });

      it('builds an endpoint with a several queryArgs', () => {
        const actualValue = baseEntity.getEndpoint('/', {
          actions: ['copyBoard', 'copyCard'],
          actionsEntities: true,
          actionsFormat: 'count',
          prefs: {
            selfJoin: true,
            invitations: 'admins',
            separator: '/',
          }
        });
        const expectedValue =
          `boards/${boardId}/cards/${cardId}?actions=copyBoard,copyCard&` +
          `actions_entities=true&actions_format=count&prefs/selfJoin=true&` +
          `prefs/invitations=admins&${authSuffix}`;
        expect(actualValue).to.equal(expectedValue);
      });
    });
  });

  describe('Help Link Builder', () => {
    it('builds the correct help link', () => {
      const boardBaseResource = new BaseResource(auth, 'board', boardId);
      const actualValue = boardBaseResource.getHelpLink('get', 'boardstars');
      const expectedValue = 'board#get-1-boards-board-id-boardstars';
      expect(actualValue).to.equal(expectedValue);
    });
  });
});
