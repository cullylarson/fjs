import {always} from '../esm/'

test('Returns expected result', () => {
    expect(always(true)()).toBe(true)
    expect(always(false)()).toBe(false)
    expect(always('AAA')()).toBe('AAA')
})

test('Multiple calls Return same result', () => {
    const x = always('YYY')

    expect(x()).toBe('YYY')
    expect(x()).toBe('YYY')
    expect(x()).toBe('YYY')
})
