/* External dependencies */
const test = require('tape');

/* Internal dependencies */
const Trello = require('../src/index');

test('Trello class', (testCase) => {
  testCase.test('It does stuff', (assert) => {
    const trelloApi = new Trello();
    trelloApi.action.getById(5, { display: true });
    assert.equal(4, 4);
  })
});
