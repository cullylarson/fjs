import {toFloat} from '../esm/'

const def = Symbol('default-value')

test('Integers parse as float.', () => {
    expect(toFloat(def, 3)).toBe(3)
    expect(toFloat(def, 34034034034)).toBe(34034034034)
    expect(toFloat(def, -1)).toBe(-1)
    expect(toFloat(def, -20)).toBe(-20)
    expect(toFloat(def, -49489410)).toBe(-49489410)
})

test('String integer parse as float.', () => {
    expect(toFloat(def, '3')).toBe(3)
    expect(toFloat(def, '34034034034')).toBe(34034034034)
    expect(toFloat(def, '-1')).toBe(-1)
    expect(toFloat(def, '-20')).toBe(-20)
    expect(toFloat(def, '-49489410')).toBe(-49489410)
})

test('Infinity does not parse as float.', () => {
    expect(toFloat(def, Infinity)).toBe(def)
})

test('Float parse as float.', () => {
    expect(toFloat(def, 3.5)).toBe(3.5)
    expect(toFloat(def, 34034034034.239)).toBe(34034034034.239)
    expect(toFloat(def, -1.1)).toBe(-1.1)
    expect(toFloat(def, -20.37)).toBe(-20.37)
    expect(toFloat(def, -49489410.34)).toBe(-49489410.34)
})

test('Float string parse as float.', () => {
    expect(toFloat(def, '3.5')).toBe(3.5)
    expect(toFloat(def, '34034034034.239')).toBe(34034034034.239)
    expect(toFloat(def, '-1.1')).toBe(-1.1)
    expect(toFloat(def, '-20.37')).toBe(-20.37)
    expect(toFloat(def, '-49489410.34')).toBe(-49489410.34)
})

test('String with numbers do not parse as float.', () => {
    expect(toFloat(def, '3 three')).toBe(def)
    expect(toFloat(def, 'two 2')).toBe(def)
    expect(toFloat(def, '5five')).toBe(def)
    expect(toFloat(def, 'five5')).toBe(def)
})

test('Non-numeric string is not int.', () => {
    expect(toFloat(def, 'three')).toBe(def)
    expect(toFloat(def, 'two')).toBe(def)
    expect(toFloat(def, 'five')).toBe(def)
    expect(toFloat(def, 'five')).toBe(def)
})
