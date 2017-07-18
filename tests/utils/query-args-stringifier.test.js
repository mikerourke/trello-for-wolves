/* Internal dependencies */
import stringifyQueryArgs from '../../src/utils/query-args-stringifier';

describe('QAS | Query Args Stringifier', function() {
  it('QAS-T01 | stringifies query args with a single string arg', function() {
    const queryArgs = {
      actionsFormat: 'count',
    };
    const actualValue = stringifyQueryArgs(queryArgs);
    const expectedValue = 'actions_format=count&';
    expect(actualValue).to.equal(expectedValue);
  });

  it('QAS-T02 | stringifies query args with multiple string args', function() {
    const queryArgs = {
      actionsFormat: 'count',
      field: 'data',
    };
    const actualValue = stringifyQueryArgs(queryArgs);
    const expectedValue = 'actions_format=count&field=data&';
    expect(actualValue).to.equal(expectedValue);
  });

  it('QAS-T03 | stringifies query args with a single boolean arg', function() {
    const queryArgs = {
      actionsEntities: true,
    };
    const actualValue = stringifyQueryArgs(queryArgs);
    const expectedValue = 'actions_entities=true&';
    expect(actualValue).to.equal(expectedValue);
  });

  it('QAS-T04 | stringifies query args with multiple boolean args', function() {
    const queryArgs = {
      actionsEntities: true,
      display: false,
    };
    const actualValue = stringifyQueryArgs(queryArgs);
    const expectedValue = 'actions_entities=true&display=false&';
    expect(actualValue).to.equal(expectedValue);
  });

  it('QAS-T05 | stringifies query args with a single comma separated arg', function() {
    const queryArgs = {
      actions: ['copyBoard', 'copyCard'],
    };
    const actualValue = stringifyQueryArgs(queryArgs);
    const expectedValue = 'actions=copyBoard,copyCard&';
    expect(actualValue).to.equal(expectedValue);
  });

  it('QAS-T06 | stringifies query args with multiple comma separated args', function() {
    const queryArgs = {
      actions: ['copyBoard', 'copyCard'],
      memberFields: 'bio,fullName',
    };
    const actualValue = stringifyQueryArgs(queryArgs);
    const expectedValue = 'actions=copyBoard,copyCard&member_fields=bio,fullName&';
    expect(actualValue).to.equal(expectedValue);
  });

  it('QAS-T07 | stringifies query args with multiple args of one type each', function() {
    const queryArgs = {
      actionsFormat: 'count',
      actionsEntities: true,
      actions: ['copyBoard', 'copyCard'],
    };
    const actualValue = stringifyQueryArgs(queryArgs);
    const expectedValue =
      'actions_format=count&actions_entities=true&actions=copyBoard,copyCard&';
    expect(actualValue).to.equal(expectedValue);
  });

  it('QAS-T08 | stringifies query args with multiple args with multiple types', function() {
    const queryArgs = {
      actionsFormat: 'count',
      field: 'data',
      actionsEntities: true,
      display: false,
      actions: ['copyBoard', 'copyCard'],
      memberFields: 'bio,fullName',
    };
    const actualValue = stringifyQueryArgs(queryArgs);
    const expectedValue =
      'actions_format=count&field=data&actions_entities=true&display=false' +
      '&actions=copyBoard,copyCard&member_fields=bio,fullName&';
    expect(actualValue).to.equal(expectedValue);
  });

  it('QAS-T09 | stringifies query args for a single special case', function() {
    const queryArgs = {
      memberCreatorFields: ['bio', 'fullName'],
    };
    const actualValue = stringifyQueryArgs(queryArgs);
    const expectedValue = 'memberCreator_fields=bio,fullName&';
    expect(actualValue).to.equal(expectedValue);
  });

  it('QAS-T10 | stringifies query args for nested args with a slash separator', function() {
    const queryArgs = {
      prefs: {
        selfJoin: true,
      },
      separator: '/',
    };
    const actualValue = stringifyQueryArgs(queryArgs);
    const expectedValue = 'prefs/selfJoin=true&';
    expect(actualValue).to.equal(expectedValue);
  });

  it('QAS-T11 | stringifies query args for nested args with an underscore separator', function() {
    const queryArgs = {
      prefs: {
        selfJoin: true,
      },
      separator: '_',
    };
    const actualValue = stringifyQueryArgs(queryArgs);
    const expectedValue = 'prefs_selfJoin=true&';
    expect(actualValue).to.equal(expectedValue);
  });
});
