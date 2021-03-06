import {getParams, toInt, toStr, always} from '../esm/'

test('Fill in parameter that doesn\'t exist in input.', () => {
    const getData = getParams({
        id: [10, toInt(10)],
        name: ['', toStr],
    })

    const data = {
        name: 'Aspiration',
    }

    expect(getData(data)).toEqual({
        id: 10,
        name: data.name,
    })
})

test('Filters parameter that does exist in input.', () => {
    const getData = getParams({
        id: [10, toInt(10)],
        name: ['', toStr],
    })

    const data = {
        name: 333,
    }

    const params = getData(data)

    expect(params.name).toBe('333')
    expect(params.name).not.toBe(333)
})

test('The default value is filtered.', () => {
    const getData = getParams({
        id: [10, toInt(10)],
        name: [444, toStr],
    })

    const data = {
        id: 30,
    }

    const params = getData(data)

    expect(params.name).toBe('444')
    expect(params.name).not.toBe(444)
})

test('Throws away input parameters that aren\'t in the getParams definition.', () => {
    const getData = getParams({
        id: [10, toInt(10)],
        name: [444, toStr],
    })

    const data = {
        id: 30,
        hi: 'there',
    }

    const params = getData(data)

    expect(params.hasOwnProperty('hi')).toBe(false)
})

test('Can use a function as a keyDef.', () => {
    const getData = getParams({
        id: toInt(10),
        name: always('A Surprise'),
    })

    const data = {
        name: 'Aspiration',
    }

    expect(getData(data)).toEqual({
        id: 10,
        name: 'A Surprise',
    })
})
