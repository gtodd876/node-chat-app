const expect = require('expect');
const { isRealString } = require('./validation');

describe('isRealString', () => {
  it('should reject non string values', () => {
    var number = 4;
    var firstTest = isRealString(number);
    expect(firstTest).toBeFalsy();
  });

  it('should reject string with only spaces', () => {
    var secondTest = isRealString('      ');
    expect(secondTest).toBeFalsy();
  });

  it('should allow string with non-space characters', () => {
    var res = isRealString('   Todd    ');
    expect(res).toBeTruthy();
  });
});
