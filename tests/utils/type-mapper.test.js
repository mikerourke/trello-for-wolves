import { generateTypeMap } from '../../src/utils/type-mapper';

describe('GTM | Generate Type Map', function() {
  it('GTM-T01 | generates a type map given a single argument', function() {
    const result = generateTypeMap('oneValue');
    const expected = { oneValue: 'oneValue' };
    expect(result).to.deep.equal(expected)
  });

  it('GTM-T02 | generates a type map given multiple arguments', function() {
    const result = generateTypeMap('oneValue', 'twoValue', 'threeValue');
    const expected = {
      oneValue: 'oneValue',
      twoValue: 'twoValue',
      threeValue: 'threeValue',
    };
    expect(result).to.deep.equal(expected)
  });
});
