import {map} from '../esm/'
import {Right, Left} from 'sanctuary-either'

test('Maps over arrays.', () => {
    expect(map(x => x + 1, [1, 2, 3])).toEqual([2, 3, 4])
    expect(map(x => x + 'a', ['a', 'b', 'c'])).toEqual(['aa', 'ba', 'ca'])
})

test('Maps over objects.', () => {
    expect(map(x => x + 1, {a: 1, b: 2, c: 3})).toEqual({a: 2, b: 3, c: 4})
    expect(map(x => x + 'a', {a: 'a', b: 'b', c: 'c'})).toEqual({a: 'aa', b: 'ba', c: 'ca'})
})

test('Provides object key when over objects.', () => {
    expect(map((v, k) => v + k, {a: 'AA', b: 'BB', c: 'CC'})).toEqual({a: 'AAa', b: 'BBb', c: 'CCc'})
})

test('Uses the object\'s own map function if available.', () => {
    const mappable = (value => ({
        map: f => f(value),
    }))('my value')

    expect(map(x => 'Sundays are for ' + x, mappable)).toBe('Sundays are for my value')
})

test('Maps on fantasyland functor.', () => {
    expect(map(x => `I like ${x} with my waffles.`, Right('syrup'))).toEqual(Right('I like syrup with my waffles.'))
    expect(map(x => `I like ${x} with my waffles.`, Left('syrup'))).toEqual(Left('syrup'))
})
