/* Internal dependencies */
import { auth } from '../helpers';
import { buildUrlString } from '../../src/lib/string-builder';

describe('Url Builder', () => {
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
      actionsFormat: 'count',
    };
    const actualValue = buildUrlString(auth, 'boards/123', options);
    const expectedValue =
      `boards/123?actions_format=count&key=${key}&token=${token}`;
    expect(actualValue).to.equal(expectedValue);
  });

  it('builds a URL string with a boolean option', () => {
    const { key, token } = auth;
    const options = {
      actionsEntities: true,
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
      actionsEntities: true,
      actionsFormat: 'count',
    };
    const actualValue = buildUrlString(auth, 'boards/123', options);
    const expectedValue =
      `boards/123?actions=copyBoard,copyCard&actions_entities=true&` +
      `actions_format=count&key=${key}&token=${token}`;
    expect(actualValue).to.equal(expectedValue);
  });

  it('fails to build a URL string without a separator specified for child options', () => {
    const options = {
      prefs: {
        selfJoin: true,
        voting: 'disabled',
      },
    };
    expect(function() {
      buildUrlString(auth, 'boards/123', options);
    }).to.throw(Error);
  });

  it('builds a URL string with valid child options', () => {
    const { key, token } = auth;
    const options = {
      prefs: {
        selfJoin: true,
        voting: 'disabled',
        separator: '/',
      },
    };
    const actualValue = buildUrlString(auth, 'boards/123', options);
    const expectedValue =
      `boards/123?prefs/selfJoin=true&prefs/voting=disabled&` +
      `key=${key}&token=${token}`;
    expect(actualValue).to.equal(expectedValue);
  });

  it('builds a URL string with multiple option types and child options', () => {
    const { key, token } = auth;
    const options = {
      actions: ['copyBoard', 'copyCard'],
      actionsEntities: true,
      actionsFormat: 'count',
      prefs: {
        selfJoin: true,
        voting: 'disabled',
        separator: '/',
      },
    };
    const actualValue = buildUrlString(auth, 'boards/123', options);
    const expectedValue =
      `boards/123?actions=copyBoard,copyCard&actions_entities=true&` +
      `actions_format=count&prefs/selfJoin=true&prefs/voting=disabled&` +
      `key=${key}&token=${token}`;
    expect(actualValue).to.equal(expectedValue);
  });
});
