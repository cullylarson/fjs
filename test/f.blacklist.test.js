import {blacklist} from '../esm/'

test('Doesn\'t include blacklisted items.', () => {
    const x = {
        a: 'AAA',
        b: 'BBB',
        c: 'CCC',
    }

    expect(blacklist(['b'], x)).toEqual({a: 'AAA', c: 'CCC'})
    expect(blacklist(['a', 'c'], x)).toEqual({b: 'BBB'})
})

test('Removes nothing when no matching blacklist items.', () => {
    const x = {
        a: 'AAA',
        b: 'BBB',
        c: 'CCC',
    }

    expect(blacklist(['d'], x)).toEqual(x)
})

test('Returns empty object when all items blacklisted.', () => {
    const x = {
        a: 'AAA',
        b: 'BBB',
        c: 'CCC',
    }

    expect(blacklist(Object.keys(x), x)).toEqual({})
})
