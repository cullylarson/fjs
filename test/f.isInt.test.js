import {isInt} from '../esm/'

test('Integer is int.', () => {
    expect(isInt(3)).toBe(true)
    expect(isInt(34034034034)).toBe(true)
    expect(isInt(-1)).toBe(true)
    expect(isInt(-20)).toBe(true)
    expect(isInt(-49489410)).toBe(true)
})

test('String integer is int.', () => {
    expect(isInt('3')).toBe(true)
    expect(isInt('34034034034')).toBe(true)
    expect(isInt('-1')).toBe(true)
    expect(isInt('-20')).toBe(true)
    expect(isInt('-49489410')).toBe(true)
})

test('Float is not int.', () => {
    expect(isInt(3.5)).toBe(false)
    expect(isInt(34034034034.239)).toBe(false)
    expect(isInt(-1.1)).toBe(false)
    expect(isInt(-20.37)).toBe(false)
    expect(isInt(-49489410.34)).toBe(false)
})

test('Float string is not int.', () => {
    expect(isInt('3.5')).toBe(false)
    expect(isInt('34034034034.239')).toBe(false)
    expect(isInt('-1.1')).toBe(false)
    expect(isInt('-20.37')).toBe(false)
    expect(isInt('-49489410.34')).toBe(false)
})

test('String with numbers are not int.', () => {
    expect(isInt('3 three')).toBe(false)
    expect(isInt('two 2')).toBe(false)
    expect(isInt('5five')).toBe(false)
    expect(isInt('five5')).toBe(false)
})

test('Non-numeric string is not int.', () => {
    expect(isInt('three')).toBe(false)
    expect(isInt('two')).toBe(false)
    expect(isInt('five')).toBe(false)
    expect(isInt('five')).toBe(false)
})
