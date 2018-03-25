import { expect } from 'chai';
import { inspect } from 'util'
import { combineString } from '../src/utils';


describe('# combineString', function () {
  it('should combine string in arr', function () {
    // console.log(combineString([1, '222', {}, '22', '12']))
    expect(combineString([1, '222', {}, '22', '12']))
      .to.deep.equal(['1222', {}, '2212'])
  })
})
