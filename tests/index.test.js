/* External dependencies */
const test = require('tape');

/* Internal dependencies */
const Trello = require('../src/index').default;
const { auth } = require('./helpers');

test('Trello class', (testCase) => {
  testCase.test('It does stuff', (assert) => {
    const trelloApi = new Trello(auth);
    trelloApi.board.getById('DfZNMM5L')
      .then((result) => {
        console.log(result);
        assert.equal(4, 4);
      })
      .catch(error => console.error(error));
  });
});
