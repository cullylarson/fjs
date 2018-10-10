import {has} from '../esm/'

test('Returns false if provided list is not an array or object', () => {
    expect(has(1, undefined)).toBe(false)
    expect(has('asdf', null)).toBe(false)
})

test('Returns false if provided list is an array but does not contain the provided value', () => {
    expect(has(1, ['asdf'])).toBe(false)
    expect(has(3, ['blue', 'green'])).toBe(false)
})

test('Returns false if provided list is an object but does not contain the provided value', () => {
    expect(has('foo', {a: 'b'})).toBe(false)
})

test('Returns true if provided list is an array and contains the provided value', () => {
    expect(has(0, ['asdf'])).toBe(true)
    expect(has(1, ['blue', 'green'])).toBe(true)
})

test('Returns true if provided list is an object and contains the provided value', () => {
    expect(has('foo', {foo: 'b'})).toBe(true)
})
