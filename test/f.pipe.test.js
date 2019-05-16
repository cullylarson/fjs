import {pipe, compose} from '../esm/'

test('Executes functions in the correct order', () => {
    const result = pipe(
        x => x += 'a',
        x => x += 'b',
        x => x += 'c',
    )('')

    expect(result).toBe('abc')
})

test('No functions throw exception.', () => {
    expect(() => {
        pipe()('')
    }).toThrow()
})

test('Providing a value other than a function throws an exception.', () => {
    expect(() => {
        pipe(1)('')
    }).toThrow()
})
