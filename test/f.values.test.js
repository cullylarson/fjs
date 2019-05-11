import {values} from '../esm/'

test("Gets values.", () => {
    const data = {
        name: 'Aspiration',
        hoops: 'Dreams',
        id: 1337,
    }

    expect(values(data)).toEqual(['Aspiration', 'Dreams', 1337])
})

test("Empty object returns empty array.", () => {
    const data = {}

    expect(values(data)).toEqual([])
})

test("Works with arrays.", () => {
    const data = ['foods', 'the life']

    expect(values(data)).toEqual(data)
})

test("Numbers return empty array.", () => {
    expect(values(100)).toEqual([])
    expect(values(100.50)).toEqual([])
})

test("String returns individual characters.", () => {
    expect(values('foo')).toEqual(['f', 'o', 'o'])
})

test("Null throws exception.", () => {
    expect(() => {
        values(null)
    }).toThrow()
})

test("Undefined throws exception.", () => {
    expect(() => {
        values(null)
    }).toThrow()
})

test("Boolean returns empty array.", () => {
    expect(values(true)).toEqual([])
    expect(values(false)).toEqual([])
})
