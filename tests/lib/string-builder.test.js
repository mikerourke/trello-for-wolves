/* Internal dependencies */
import { auth } from '../helpers';
import {
  buildEndpointString,
  buildUrlString,
} from '../../src/lib/string-builder';

describe('String Builder', () => {
  describe('URL String Builder', () => {
    it('builds a URL string with only an API key', () => {
      const { key } = auth;
      const actualValue = buildUrlString({ key }, 'boards/123');
      const expectedValue = `boards/123?key=${key}`;
      expect(actualValue).to.equal(expectedValue);
    });

    it('builds a URL string with an API key and token', () => {
      const { key, token } = auth;
      const actualValue = buildUrlString(auth, 'boards/123');
      const expectedValue = `boards/123?key=${key}&token=${token}`;
      expect(actualValue).to.equal(expectedValue);
    });

    it('builds a URL string with a string option', () => {
      const { key, token } = auth;
      const options = {
        actions_format: 'count',
      };
      const actualValue = buildUrlString(auth, 'boards/123', options);
      const expectedValue =
        `boards/123?actions_format=count&key=${key}&token=${token}`;
      expect(actualValue).to.equal(expectedValue);
    });

    it('builds a URL string with a boolean option', () => {
      const { key, token } = auth;
      const options = {
        actions_entities: true,
      };
      const actualValue = buildUrlString(auth, 'boards/123', options);
      const expectedValue =
        `boards/123?actions_entities=true&key=${key}&token=${token}`;
      expect(actualValue).to.equal(expectedValue);
    });

    it('builds a URL string with an array option', () => {
      const { key, token } = auth;
      const options = {
        actions: ['copyBoard', 'copyCard'],
      };
      const actualValue = buildUrlString(auth, 'boards/123', options);
      const expectedValue =
        `boards/123?actions=copyBoard,copyCard&key=${key}&token=${token}`;
      expect(actualValue).to.equal(expectedValue);
    });

    it('builds a URL string with multiple option types', () => {
      const { key, token } = auth;
      const options = {
        actions: ['copyBoard', 'copyCard'],
        actions_entities: true,
        actions_format: 'count',
      };
      const actualValue = buildUrlString(auth, 'boards/123', options);
      const expectedValue =
        `boards/123?actions=copyBoard,copyCard&actions_entities=true&` +
        `actions_format=count&key=${key}&token=${token}`;
      expect(actualValue).to.equal(expectedValue);
    });
  });

  describe('Endpoint String Builder', () => {
    it('builds an endpoint with just a group name', () => {
      const actualValue = buildEndpointString('boards');
      const expectedValue = 'boards';
      expect(actualValue).to.equal(expectedValue);
    });

    it('builds an endpoint with a group name and ID', () => {
      const actualValue = buildEndpointString('boards', {
        instanceId: 'BoArDId'
      });
      const expectedValue = 'boards/BoArDId';
      expect(actualValue).to.equal(expectedValue);
    });

    it('builds an endpoint with a group name, ID, and parent entity', () => {
      const parentEntity = {
        entityName: 'board',
        id: 'BoArDId',
      };
      const actualValue = buildEndpointString('actions', {
        instanceId: 'AcTiOnId',
        parent: parentEntity,
      });
      const expectedValue = 'boards/BoArDId/actions/AcTiOnId';
      expect(actualValue).to.equal(expectedValue);
    });
  });
});
