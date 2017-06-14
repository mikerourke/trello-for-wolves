/* Internal dependencies */
import { auth, resourceIds } from '../helpers';
import BaseResource from '../../src/resources/base-resource';

describe('BASE | Base Resource', () => {
  const { boardId, cardId } = resourceIds;
  const authSuffix = `key=${auth.key}&token=${auth.token}`;

  let baseEntity;

  describe('BASE-EB | Endpoint Builder', () => {
    describe('BASE-EB-PN | No Parent', () => {
      before(() => {
        baseEntity = new BaseResource(auth, `/cards/${cardId}`);
      });

      it('BASE-EB-PN-T01 | builds an endpoint with the root path', () => {
        const actualValue = baseEntity.getEndpoint('/');
        const expectedValue = `/cards/${cardId}?${authSuffix}`;
        expect(actualValue).to.equal(expectedValue);
      });

      it('BASE-EB-PN-T02 | builds an endpoint with a single string queryArg', () => {
        const actualValue = baseEntity.getEndpoint('/', {
          actionsFormat: 'count',
        });
        const expectedValue =
          `/cards/${cardId}?actions_format=count&${authSuffix}`;
        expect(actualValue).to.equal(expectedValue);
      });

      it('BASE-EB-PN-T03 | builds an endpoint with a single boolean queryArg', () => {
        const actualValue = baseEntity.getEndpoint('/', {
          actionsEntities: true,
        });
        const expectedValue =
          `/cards/${cardId}?actions_entities=true&${authSuffix}`;
        expect(actualValue).to.equal(expectedValue);
      });

      it('BASE-EB-PN-T04 | builds an endpoint with a single array queryArg', () => {
        const actualValue = baseEntity.getEndpoint('/', {
          actions: ['copyBoard', 'copyCard'],
        });
        const expectedValue =
          `/cards/${cardId}?actions=copyBoard,copyCard&${authSuffix}`;
        expect(actualValue).to.equal(expectedValue);
      });

      it('BASE-EB-PN-T05 | builds an endpoint with a single nested queryArg', () => {
        const actualValue = baseEntity.getEndpoint('/', {
          prefs: {
            selfJoin: true,
          },
          separator: '/',
        });
        const expectedValue =
          `/cards/${cardId}?prefs/selfJoin=true&${authSuffix}`;
        expect(actualValue).to.equal(expectedValue);
      });

      it('BASE-EB-PN-T06 | builds an endpoint with a several queryArgs', () => {
        const actualValue = baseEntity.getEndpoint('/', {
          actions: ['copyBoard', 'copyCard'],
          actionsEntities: true,
          actionsFormat: 'count',
          prefs: {
            selfJoin: true,
            invitations: 'admins',
          },
          separator: '/',
        });
        const expectedValue =
          `/cards/${cardId}?actions=copyBoard,copyCard&actions_entities=true&` +
          `actions_format=count&prefs/selfJoin=true&prefs/invitations=admins&` +
          `${authSuffix}`;
        expect(actualValue).to.equal(expectedValue);
      });
    });

    describe('BASE-EB-PY | With Parent', () => {
      before(() => {
        baseEntity = new BaseResource(
          auth, `/boards/${boardId}/cards/${cardId}`);
      });

      it('BASE-EB-PY-T01 | builds an endpoint with the root path', () => {
        const actualValue = baseEntity.getEndpoint('/');
        const expectedValue = `/boards/${boardId}/cards/${cardId}?${authSuffix}`;
        expect(actualValue).to.equal(expectedValue);
      });

      it('BASE-EB-PY-T02 | builds an endpoint with a single string queryArg', () => {
        const actualValue = baseEntity.getEndpoint('/', {
          actionsFormat: 'count',
        });
        const expectedValue =
          `/boards/${boardId}/cards/${cardId}?actions_format=count&${authSuffix}`;
        expect(actualValue).to.equal(expectedValue);
      });

      it('BASE-EB-PY-T03 | builds an endpoint with a single boolean queryArg', () => {
        const actualValue = baseEntity.getEndpoint('/', {
          actionsEntities: true,
        });
        const expectedValue =
          `/boards/${boardId}/cards/${cardId}?actions_entities=true&${authSuffix}`;
        expect(actualValue).to.equal(expectedValue);
      });

      it('BASE-EB-PY-T04 | builds an endpoint with a single array queryArg', () => {
        const actualValue = baseEntity.getEndpoint('/', {
          actions: ['copyBoard', 'copyCard'],
        });
        const expectedValue =
          `/boards/${boardId}/cards/${cardId}?actions=copyBoard,copyCard&${authSuffix}`;
        expect(actualValue).to.equal(expectedValue);
      });

      it('BASE-EB-PY-T05 | builds an endpoint with a single nested queryArg', () => {
        const actualValue = baseEntity.getEndpoint('/', {
          prefs: {
            selfJoin: true,
          },
          separator: '/',
        });
        const expectedValue =
          `/boards/${boardId}/cards/${cardId}?prefs/selfJoin=true&${authSuffix}`;
        expect(actualValue).to.equal(expectedValue);
      });

      it('BASE-EB-PY-T06 | builds an endpoint with a several queryArgs', () => {
        const actualValue = baseEntity.getEndpoint('/', {
          actions: ['copyBoard', 'copyCard'],
          actionsEntities: true,
          actionsFormat: 'count',
          prefs: {
            selfJoin: true,
            invitations: 'admins',
          },
          separator: '/',
        });
        const expectedValue =
          `/boards/${boardId}/cards/${cardId}?actions=copyBoard,copyCard&` +
          `actions_entities=true&actions_format=count&prefs/selfJoin=true&` +
          `prefs/invitations=admins&${authSuffix}`;
        expect(actualValue).to.equal(expectedValue);
      });
    });
  });
});
