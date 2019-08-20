import {isNumeric} from '../esm/'

test('Integer is numeric.', () => {
    expect(isNumeric(3)).toBe(true)
    expect(isNumeric(34034034034)).toBe(true)
    expect(isNumeric(-1)).toBe(true)
    expect(isNumeric(-20)).toBe(true)
    expect(isNumeric(-49489410)).toBe(true)
})

test('String integer is numeric.', () => {
    expect(isNumeric('3')).toBe(true)
    expect(isNumeric('34034034034')).toBe(true)
    expect(isNumeric('-1')).toBe(true)
    expect(isNumeric('-20')).toBe(true)
    expect(isNumeric('-49489410')).toBe(true)
})

test('Float is numeric.', () => {
    expect(isNumeric(3.5)).toBe(true)
    expect(isNumeric(34034034034.239)).toBe(true)
    expect(isNumeric(-1.1)).toBe(true)
    expect(isNumeric(-20.37)).toBe(true)
    expect(isNumeric(-49489410.34)).toBe(true)
})

test('Float string is numeric.', () => {
    expect(isNumeric('3.5')).toBe(true)
    expect(isNumeric('34034034034.239')).toBe(true)
    expect(isNumeric('-1.1')).toBe(true)
    expect(isNumeric('-20.37')).toBe(true)
    expect(isNumeric('-49489410.34')).toBe(true)
})

test('String with numbers are not numeric.', () => {
    expect(isNumeric('3 three')).toBe(false)
    expect(isNumeric('two 2')).toBe(false)
    expect(isNumeric('5five')).toBe(false)
    expect(isNumeric('five5')).toBe(false)
})

test('Non-numeric string is not numeric.', () => {
    expect(isNumeric('three')).toBe(false)
    expect(isNumeric('two')).toBe(false)
    expect(isNumeric('five')).toBe(false)
    expect(isNumeric('five')).toBe(false)
})

test('Infinity is not numeric.', () => {
    expect(isNumeric(Infinity)).toBe(false)
})
