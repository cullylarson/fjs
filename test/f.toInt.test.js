import {toInt} from '../esm/'

const def = Symbol('default-value')

test('Integer parses as int.', () => {
    expect(toInt(def, 3)).toBe(3)
    expect(toInt(def, 34034034034)).toBe(34034034034)
    expect(toInt(def, -1)).toBe(-1)
    expect(toInt(def, -20)).toBe(-20)
    expect(toInt(def, -49489410)).toBe(-49489410)
})

test('String integer parses as int.', () => {
    expect(toInt(def, '3')).toBe(3)
    expect(toInt(def, '34034034034')).toBe(34034034034)
    expect(toInt(def, '-1')).toBe(-1)
    expect(toInt(def, '-20')).toBe(-20)
    expect(toInt(def, '-49489410')).toBe(-49489410)
})

test('Infinity does not parse as int.', () => {
    expect(toInt(def, Infinity)).toBe(def)
})

test('Float does not parse as int.', () => {
    expect(toInt(def, 3.5)).toBe(def)
    expect(toInt(def, 34034034034.239)).toBe(def)
    expect(toInt(def, -1.1)).toBe(def)
    expect(toInt(def, -20.37)).toBe(def)
    expect(toInt(def, -49489410.34)).toBe(def)
})

test('Float string does not parse as int.', () => {
    expect(toInt(def, '3.5')).toBe(def)
    expect(toInt(def, '34034034034.239')).toBe(def)
    expect(toInt(def, '-1.1')).toBe(def)
    expect(toInt(def, '-20.37')).toBe(def)
    expect(toInt(def, '-49489410.34')).toBe(def)
})

test('String with numbers does not parse as int.', () => {
    expect(toInt(def, '3 three')).toBe(def)
    expect(toInt(def, 'two 2')).toBe(def)
    expect(toInt(def, '5five')).toBe(def)
    expect(toInt(def, 'five5')).toBe(def)
})

test('Non-numeric string does not parse as int.', () => {
    expect(toInt(def, 'three')).toBe(def)
    expect(toInt(def, 'two')).toBe(def)
    expect(toInt(def, 'five')).toBe(def)
    expect(toInt(def, 'five')).toBe(def)
})
