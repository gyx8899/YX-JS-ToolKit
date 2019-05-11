import sumFn from '../src/sum-fn'
import {sumOjbect} from '../src/sum-object'
import SumClass from '../src/sum-class'

test('adds 1 + 2 to equal 3', () => {
  expect(sumFn(1, 2)).toBe(3);
});
test('adds 1 + 2 to equal 3', () => {
  expect(sumOjbect(1, 2)).toBe(3);
});
test('adds 1 + 2 to equal 3', () => {
  expect(new SumClass().sum(1, 2)).toBe(3);
});