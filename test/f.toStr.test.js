import {toStr} from '../esm/'

test('Returns a string when passed a string.', () => {
    expect(toStr('asdf')).toBe('asdf')
})

test('Returns a string of a number when passed a number.', () => {
    expect(toStr(123)).toBe('123')
    expect(toStr(3.14159265359)).toBe('3.14159265359')
})

test('Returns a string of a boolean when passed a boolean.', () => {
    expect(toStr(true)).toBe('true')
    expect(toStr(false)).toBe('false')
})

test('Returns an empty string when passed undefined, null, or NaN.', () => {
    expect(toStr(undefined)).toBe('')
    expect(toStr(null)).toBe('')
    expect(toStr(NaN)).toBe('')
})
