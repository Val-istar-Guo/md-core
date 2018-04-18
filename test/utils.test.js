import test from 'ava'
import { inspect } from 'util'
import { combineString } from '../src/utils'


test('# combineString should combine string in arr', t => {
  t.deepEqual(combineString([1, '222', {}, '22', '12']), ['1222', {}, '2212'])
})
