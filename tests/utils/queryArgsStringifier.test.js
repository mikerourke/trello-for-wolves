import stringifyQueryArgs from '../../src/utils/queryArgsStringifier';

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
    const expectedValue =
      'actions=copyBoard,copyCard&member_fields=bio,fullName&';
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

  it('QAS-T12 | stringifies any args in excludedKeys', function() {
    const queryArgs = {
      avatarSource: 0,
      boardBackgrounds: 0,
      boardStars: 0,
      callbackURL: 0,
      confirmationAccepted: 0,
      customBoardBackgrounds: 0,
      customEmoji: 0,
      customStickers: 0,
      defaultLabels: 0,
      defaultLists: 0,
      displayName: 0,
      dueComplete: 0,
      fullName: 0,
      ixLastUpdate: 0,
      keepFromSource: 0,
      mimeType: 0,
      modelTypes: 0,
      myPrefs: 0,
      onlyOrgMembers: 0,
      powerUp: 0,
      powerUps: 0,
      returnUrl: 0,
      savedSearches: 0,
      webhook: 0,
      webhooks: 0,
      website: 0,
      zIndex: 0,
    };
    const actualValue = stringifyQueryArgs(queryArgs);
    const expectedValue =
      'avatarSource=0&boardBackgrounds=0&boardStars=0&callbackURL=0&confirmationAccepted=0' +
      '&customBoardBackgrounds=0&customEmoji=0&customStickers=0&defaultLabels=0&defaultLists=0' +
      '&displayName=0&dueComplete=0&fullName=0&ixLastUpdate=0&keepFromSource=0&mimeType=0&' +
      'modelTypes=0&myPrefs=0&onlyOrgMembers=0&powerUp=0&powerUps=0&returnUrl=0&savedSearches=0&' +
      'webhook=0&webhooks=0&website=0&zIndex=0&';
    expect(actualValue).to.equal(expectedValue);
  });

  it('QAS-T13 | stringifies query args that needs to be recased', function() {
    const queryArgs = {
      memberCreator: 0,
      membersVoted: 0,
      boardPluginData: 0,
      membersInvited: 0,
      checkItems: 0,
      checkItemStates: 0,
    };
    const actualValue = stringifyQueryArgs(queryArgs);
    const expectedValue =
      'memberCreator=0&membersVoted=0&board_pluginData=0&membersInvited=0&' +
      'checkItems=0&checkItemStates=0&';
    expect(actualValue).to.equal(expectedValue);
  });

  it('QAS-T14 | stringifies query args for Enterprise routes', function() {
    const queryArgs = {
      sortBy: 0,
      sortOrder: 0,
      startIndex: 0,
    };
    const actualValue = stringifyQueryArgs(queryArgs);
    const expectedValue = 'sortBy=0&sortOrder=0&startIndex=0&';
    expect(actualValue).to.equal(expectedValue);
  });
});
