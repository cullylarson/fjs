import {clampSet} from '../esm/'

test('Returns value if in set.', () => {
    expect(clampSet(['a', 'b', 'c'], 'd', 'a')).toBe('a')
})

test('Returns default value if not in set.', () => {
    expect(clampSet(['a', 'b', 'c'], 'd', 'e')).toBe('d')
})

test('Returns array if all values in set.', () => {
    expect(clampSet(['a', 'b', 'c'], undefined, ['a', 'a', 'b'])).toEqual(['a', 'a', 'b'])
})

test('Returns array with only values from the set.', () => {
    expect(clampSet(['a', 'b', 'c'], undefined, ['a', 'b', 'd'])).toEqual(['a', 'b'])
})

test('Returns empty array if no values from the set.', () => {
    expect(clampSet(['a', 'b', 'c'], undefined, ['d', 'e', 'f'])).toEqual([])
})
