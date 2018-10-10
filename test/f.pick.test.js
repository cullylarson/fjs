import {pick} from '../esm/'

test('Only get the requested values', () => {
    const result = pick({
        id: 0,
        name: 'Something',
    })({
        asdf: 10,
        id: 3,
        name: 'Cully',
        foo: 'bar',
    })

    expect(result).toEqual({
        id: 3,
        name: 'Cully',
    })
})

test('Uses default values', () => {
    const result = pick({
        id: 1,
        name: 'Something',
    })({
        asdf: 10,
        foo: 'bar',
    })

    expect(result).toEqual({
        id: 1,
        name: 'Something',
    })
})

test('Works with array of keys', () => {
    const result = pick(['asdf', 'something'])({
        asdf: 10,
        foo: 'bar',
    })

    expect(result).toEqual({
        asdf: 10,
    })
})
