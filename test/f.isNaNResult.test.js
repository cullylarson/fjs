import {isNaNResult} from '../esm/'

test('A string is not NaN.', () => {
    expect(isNaNResult('asdf')).toBe(false)
})

test('A number is not NaN.', () => {
    expect(isNaNResult(124)).toBe(false)
})

test('A float is not NaN.', () => {
    expect(isNaNResult(3.14)).toBe(false)
})

test('A object is not NaN.', () => {
    expect(isNaNResult({a: 'b'})).toBe(false)
    expect(isNaNResult({})).toBe(false)
})

test('A function is not NaN.', () => {
    expect(isNaNResult(() => NaN)).toBe(false)
})

test('Undefined is not NaN.', () => {
    expect(isNaNResult(undefined)).toBe(false)
})

test('Null is not NaN.', () => {
    expect(isNaNResult(null)).toBe(false)
})

test('NaN is NaN.', () => {
    expect(isNaNResult(NaN)).toBe(true)
})

test('NaN result from parseInt is NaN.', () => {
    expect(isNaNResult(parseInt('Something'))).toBe(true)
})
