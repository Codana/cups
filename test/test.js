let expect = require('chai').expect;

const testFunc = x => x * x;

describe('First test', () => {
  it('should work', () => {
      expect(testFunc(5)).to.be.equal(25);
    });
});

