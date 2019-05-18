import {omit} from '../esm/'

test('Doesn\'t include omitted items.', () => {
    const x = {
        a: 'AAA',
        b: 'BBB',
        c: 'CCC',
    }

    expect(omit(['b'], x)).toEqual({a: 'AAA', c: 'CCC'})
    expect(omit(['a', 'c'], x)).toEqual({b: 'BBB'})
})

test('Removes nothing when no matching omitted items.', () => {
    const x = {
        a: 'AAA',
        b: 'BBB',
        c: 'CCC',
    }

    expect(omit(['d'], x)).toEqual(x)
})

test('Returns empty object when all items omitted.', () => {
    const x = {
        a: 'AAA',
        b: 'BBB',
        c: 'CCC',
    }

    expect(omit(Object.keys(x), x)).toEqual({})
})
