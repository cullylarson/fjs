import {isFloat} from '../esm/'

test('Integer is float.', () => {
    expect(isFloat(3)).toBe(true)
    expect(isFloat(34034034034)).toBe(true)
    expect(isFloat(-1)).toBe(true)
    expect(isFloat(-20)).toBe(true)
    expect(isFloat(-49489410)).toBe(true)
})

test('String integer is float.', () => {
    expect(isFloat('3')).toBe(true)
    expect(isFloat('34034034034')).toBe(true)
    expect(isFloat('-1')).toBe(true)
    expect(isFloat('-20')).toBe(true)
    expect(isFloat('-49489410')).toBe(true)
})

test('Float is float.', () => {
    expect(isFloat(3.5)).toBe(true)
    expect(isFloat(34034034034.239)).toBe(true)
    expect(isFloat(-1.1)).toBe(true)
    expect(isFloat(-20.37)).toBe(true)
    expect(isFloat(-49489410.34)).toBe(true)
})

test('Float string is float.', () => {
    expect(isFloat('3.5')).toBe(true)
    expect(isFloat('34034034034.239')).toBe(true)
    expect(isFloat('-1.1')).toBe(true)
    expect(isFloat('-20.37')).toBe(true)
    expect(isFloat('-49489410.34')).toBe(true)
})

test('Infinity is not float.', () => {
    expect(isFloat(Infinity)).toBe(false)
})

test('String with numbers are not float.', () => {
    expect(isFloat('3 three')).toBe(false)
    expect(isFloat('two 2')).toBe(false)
    expect(isFloat('5five')).toBe(false)
    expect(isFloat('five5')).toBe(false)
})

test('Non-numeric string is not float.', () => {
    expect(isFloat('three')).toBe(false)
    expect(isFloat('two')).toBe(false)
    expect(isFloat('five')).toBe(false)
    expect(isFloat('five')).toBe(false)
})
